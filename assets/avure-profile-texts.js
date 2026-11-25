/* DRAFT — client to validate.
   Texts for the "Your skin profile" blocks of the skin diagnostic results (sections/diagnostics-questions.liquid).
   Keyed by the AvureEngine codes:
     types       result.profile.type        normal | dry | oily | combination
     conditions  result.profile.conditions  dehydrated | sensitive | very_sensitive | barrier_compromised | blemish_prone | redness_prone
     concerns    result.priorities[].id     the 15 concern ids + barrier
   Each entry: label (short name for the summary table), what (what it is), helps (what helps), easy (go easy on).
   These are cosmetic explanations, not medical advice. Keep them short. */
window.AVURE_PROFILE_TEXTS = {
  types: {
    normal: {
      label: 'Normal skin',
      what: 'Your skin is mostly balanced: not too oily, not too dry, and rarely uncomfortable.',
      helps: 'A simple, steady routine: gentle cleansing, light hydration and daily sunscreen.',
      easy: 'Stacking too many new products at once. Balanced skin stays that way with consistency.'
    },
    dry: {
      label: 'Dry skin',
      what: 'Your skin makes less oil than it needs, so it can feel tight, look dull or flake.',
      helps: 'Cleansers that do not strip, hydrating serums, and a cream that seals water in.',
      easy: 'Foaming soaps, hot water and frequent exfoliation, which all take oil away.'
    },
    oily: {
      label: 'Oily skin',
      what: 'Your skin makes extra oil across the whole face, which brings shine and clogged pores.',
      helps: 'A gentle gel cleanser, light non-greasy hydration, and ingredients that regulate oil.',
      easy: 'Harsh, drying products: they make skin tight and can push it to produce more oil.'
    },
    combination: {
      label: 'Combination skin',
      what: 'Your T-zone (forehead, nose, chin) gets oily while your cheeks stay normal or dry.',
      helps: 'Balance: hydrate the whole face, and focus oil-control steps on the T-zone.',
      easy: 'Treating the whole face as oily, which leaves the cheeks tight and dry.'
    }
  },

  conditions: {
    dehydrated: {
      label: 'Dehydrated',
      what: 'Your skin is short of water (not oil). It can feel tight and show fine lines that come and go.',
      helps: 'Hyaluronic acid on slightly damp skin, sealed with a moisturizer, morning and evening.',
      easy: 'Hot showers, long cleanses and alcohol-heavy products.'
    },
    sensitive: {
      label: 'Easily irritated',
      what: 'Your skin reacts quickly: tingling, redness or discomfort with new products or the weather.',
      helps: 'Few products, introduced one at a time, with soothing, barrier-friendly ingredients.',
      easy: 'Strong acids, scrubs and fragrance, and changing several products at once.'
    },
    very_sensitive: {
      label: 'Very reactive',
      what: 'Your skin reacts often and strongly, so its comfort comes before any treatment.',
      helps: 'A minimal routine: gentle cleanser, moisturizer and sunscreen until skin calms down.',
      easy: 'Any exfoliant or retinol for now. Patch test every new product for 48 hours.'
    },
    barrier_compromised: {
      label: 'Weakened barrier',
      what: 'Your skin\'s protective layer is under strain, so water escapes and irritants get in more easily.',
      helps: 'Rebuilding first: ceramides, panthenol and a rich enough moisturizer, every day.',
      easy: 'Exfoliating and strong actives until your skin feels comfortable again.'
    },
    blemish_prone: {
      label: 'Blemish-prone',
      what: 'Your pores clog easily, which leads to blackheads and spots.',
      helps: 'Ingredients that keep pores clear and calm (niacinamide, azelaic or salicylic acid), introduced slowly.',
      easy: 'Picking, heavy occlusive textures and over-cleansing.'
    },
    redness_prone: {
      label: 'Prone to redness',
      what: 'Your face flushes easily with heat, effort, emotions or some products.',
      helps: 'Calming ingredients such as azelaic acid and niacinamide, plus daily sunscreen.',
      easy: 'Very hot water, scrubs and strong exfoliating acids.'
    }
  },

  concerns: {
    acne: { label: 'Blemishes', text: 'Spots form when pores clog and get inflamed. A steady routine with pore-clearing and calming ingredients works better than strong treatments used now and then.' },
    blackheads: { label: 'Blackheads and clogged pores', text: 'Oil and dead cells collect in the pore and darken at the surface. An oil-soluble exfoliant such as salicylic acid clears them from inside.' },
    sebum: { label: 'Excess oil', text: 'Your skin produces more oil than it needs. Niacinamide helps regulate it, and light hydration stops skin from overcompensating.' },
    post_acne_marks: { label: 'Post-blemish marks', text: 'Marks left after spots fade slowly. Azelaic acid, vitamin C and daily sunscreen help them fade faster.' },
    hyperpigmentation: { label: 'Dark spots', text: 'Dark spots come from extra pigment, often triggered by the sun. Brightening actives help, but daily sunscreen is what keeps them from coming back.' },
    uneven_tone: { label: 'Uneven skin tone', text: 'Patches of different colour make the complexion look uneven. Gentle exfoliation, brightening ingredients and sunscreen even it out over time.' },
    dullness: { label: 'Lack of radiance', text: 'Dull skin reflects less light, often from dead cells and dehydration. Vitamin C and gentle exfoliation bring back glow.' },
    fine_lines: { label: 'Fine lines and wrinkles', text: 'Lines appear as skin loses water, collagen and elasticity. Hydration softens them; retinol, introduced slowly, works on texture over time.' },
    firmness: { label: 'Loss of firmness', text: 'Skin feels less firm as collagen slows down with age and sun exposure. Retinol and daily sunscreen are the steps that help most.' },
    dehydration: { label: 'Dehydration', text: 'Skin short of water feels tight and looks tired. Hyaluronic acid draws water in, and a moisturizer keeps it there.' },
    dryness: { label: 'Dryness', text: 'Dry skin lacks oil, so it can flake and feel rough. Nourishing textures and a gentle cleanser restore comfort.' },
    redness: { label: 'Redness', text: 'Redness shows skin that is easily irritated or flushes. Calming ingredients and a gentle routine come first.' },
    pores: { label: 'Visible pores', text: 'Pores look bigger when they fill with oil. Keeping them clear with niacinamide or salicylic acid makes them less visible.' },
    texture: { label: 'Uneven skin texture', text: 'Bumps and roughness come from dead cells building up. Regular, gentle exfoliation smooths the surface.' },
    under_eye: { label: 'Eye area', text: 'The skin around the eyes is thin and shows tiredness and fine lines first. Use a dedicated eye product and pat it on gently.' },
    barrier: { label: 'Weakened skin barrier', text: 'Your skin barrier needs repair before anything else. Your routine starts gentle and adds actives only when skin is comfortable.' }
  }
};
