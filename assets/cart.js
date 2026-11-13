(() => {
  const root = window.Shopify.routes.root;
  const DRAWER_SECTION = "cart-drawer";

  const $panel = () => document.querySelector(".cart-drawer__panel");

  /* ---------- drawer ---------- */
  async function refreshCartDrawer() {
    const res = await fetch(`${root}?section_id=${DRAWER_SECTION}`, {
      cache: "no-store",
    });
    const html = await res.text();
    const fresh = new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(".cart-drawer__panel");
    const current = $panel();
    if (fresh && current) current.innerHTML = fresh.innerHTML; // panel keeps its open class
  }

  async function openCartDrawer({ refresh = true } = {}) {
    if (refresh) await refreshCartDrawer();
    $panel()?.classList.add("cart-drawer-open");
    document.documentElement.classList.add("no-scroll");
  }

  function closeCartDrawer() {
    $panel()?.classList.remove("cart-drawer-open");
    document.documentElement.classList.remove("no-scroll");
  }

  /* ---------- cart helpers ---------- */
  async function getCart() {
    return (await fetch(`${root}cart.js`, { cache: "no-store" })).json();
  }

  function syncCartState(cart) {
    const ids = new Set(cart.items.map((item) => item.variant_id));

    document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
      const inCart = ids.has(Number(btn.dataset.variantId));
      btn.classList.toggle("is-in-cart", inCart);
      btn.setAttribute(
        "aria-label",
        inCart ? "In cart, open cart" : `Add ${btn.dataset.title} to cart`,
      );
    });

    document
      .querySelectorAll(".cart-count")
      .forEach((el) => (el.textContent = cart.item_count));
  }

  async function changeCart(key, quantity) {
    const res = await fetch(`${root}cart/change.js`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity }),
    });
    return res.json(); // updated cart
  }

  /* ---------- events ---------- */
  document.addEventListener("click", async (e) => {
    // open / close drawer
    if (e.target.closest("[data-cart-open]")) {
      e.preventDefault();
      return openCartDrawer();
    }
    if (e.target.closest("[data-cart-close]")) return closeCartDrawer();

    // remove item
    const remove = e.target.closest("[data-cart-remove]");
    if (remove) {
      e.preventDefault();
      const cart = await changeCart(remove.dataset.key, 0);
      document.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
      return;
    }

    // quantity +/-
    const qty = e.target.closest("[data-cart-qty]");
    if (qty) {
      e.preventDefault();
      const cart = await changeCart(qty.dataset.key, Number(qty.dataset.qty));
      document.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
      return;
    }

    // add to cart (product card)
    const btn = e.target.closest("[data-add-to-cart]");
    if (!btn || btn.disabled) return;

    // already in the cart: just open the drawer
    // if (btn.classList.contains("is-in-cart")) return openCartDrawer();

    // btn.disabled = true;
    btn.classList.add("is-loading");

    try {
      const res = await fetch(`${root}cart/add.js`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: Number(btn.dataset.variantId), quantity: 1 }],
        }),
      });
      if (!res.ok) throw new Error((await res.json()).description);
      console.log("3", btn.dataset.variantId);

      const cart = await getCart();
      document.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));
      openCartDrawer({ refresh: false }); // cart:updated already refreshes it
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      btn.disabled = false;
      btn.classList.remove("is-loading");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartDrawer();
  });

  document.addEventListener("cart:updated", (e) => {
    syncCartState(e.detail);
    refreshCartDrawer();
  });

  // first load + back/forward cache restore
  getCart().then(syncCartState);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) getCart().then(syncCartState);
  });

  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
})();
document.addEventListener("click", async (e) => {
  // buy now (direct purchase)
  const buyBtn = e.target.closest("[data-buy]");
  console.log(buyBtn);
  if (buyBtn && !buyBtn.disabled) {
    console.log("buyyy");
    // use the product wrapper's variant id if there is one, otherwise the button's own
    const product = buyBtn.closest("[data-product]");
    const variantId = Number(
      product?.dataset.variantId || buyBtn.dataset.variantId,
    );

    buyBtn.disabled = true;
    buyBtn.classList.add("is-loading");

    try {
      // optional: buy ONLY this item, not what is already in the bag
      // await fetch(`${root}cart/clear.js`, { method: "POST" });

      const res = await fetch(`${root}cart/add.js`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] }),
      });
      if (!res.ok) throw new Error((await res.json()).description);

      // go straight to the purchase step (no drawer, no cart:updated)
      window.location.href = `${root}pages/checkout-info`; // or `${root}checkout`
    } catch (err) {
      console.error(err);
      alert(err.message);
      buyBtn.disabled = false;
      buyBtn.classList.remove("is-loading");
    }
    return;
  }
});
