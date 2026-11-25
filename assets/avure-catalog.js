/* AVURE product catalog (English). Translated from the client's catalog in _reference/:
   ids, codes, prices, rules and "A_VALIDER" markers are unchanged; only user-facing text is translated.
   `name` is the English display name; the original French name is kept in `nameFr`.
   At runtime the skin diagnostic section overrides variantId / price with the products picked in the theme editor. */
window.AVURE_CATALOG = {
  "catalogVersion": "2026.11-v1",
  "source": "Avure - Landscape Catalog [Print-Ready V2], 30/10/2026",
  "currency": "DZD",
  "notes": [
    "All concentrations, prices and usage advice come from the catalogue. Nothing has been invented.",
    "Fields marked \"A_VALIDER\" are missing from the catalogue and must be completed by AVURE (full INCI, pH, e-commerce variant ID, photos).",
    "The 'irritationPotential', 'activeClass' and 'targets' fields are algorithm parameters (formulation judgement), not product claims."
  ],
  "products": [
    {
      "id": "gel_cleanser",
      "name": "Hydrating Glow Gel Cleanser",
      "nameEn": "Hydrating Glow Gel Cleanser",
      "step": 1,
      "category": "cleanser",
      "activeClass": "cleanser",
      "rinseOff": true,
      "variants": [
        {
          "size": "200 ml",
          "price": 2490,
          "variantId": "A_VALIDER"
        },
        {
          "size": "100 ml",
          "price": 1400,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Niacinamide",
          "pct": 4
        },
        {
          "name": "Hyaluronic acid",
          "pct": 1
        },
        {
          "name": "Tea tree oil",
          "pct": 2
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Cleanses without drying the skin",
        "Helps preserve the skin's natural water balance",
        "Supports the skin barrier",
        "Suitable for daily use"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "oily",
        "combination"
      ],
      "targets": {
        "primary": [],
        "secondary": [
          "sebum",
          "dehydration"
        ]
      },
      "time": [
        "AM",
        "PM"
      ],
      "irritationPotential": 1,
      "usage": "Lather 2 to 3 pumps with a little water, massage onto damp face for 30 to 60 seconds, rinse with lukewarm water and pat dry.",
      "usageNote": "A_VALIDER: the catalogue directions (dry face, dissolve makeup) look copied from the oil cleanser.",
      "precautions": [
        "Contains tea tree oil (2%), a known contact allergen: patch test first on very reactive skin."
      ],
      "pregnancy": "ok",
      "nameFr": "Gel Nettoyant Éclat Hydratant"
    },
    {
      "id": "oil_cleanser",
      "name": "Calming Antioxidant Oil Cleanser",
      "nameEn": "Calming Antioxidant Oil Cleanser",
      "step": 1,
      "category": "cleanser",
      "activeClass": "cleanser",
      "rinseOff": true,
      "variants": [
        {
          "size": "200 ml",
          "price": 2490,
          "variantId": "A_VALIDER"
        },
        {
          "size": "150 ml",
          "price": 1450,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Pomegranate oil",
          "pct": 8
        },
        {
          "name": "Raspberry seed oil",
          "pct": 3
        },
        {
          "name": "Ceramide NP",
          "pct": 1
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Cleanses without drying the skin",
        "Supports the skin barrier",
        "Leaves skin soft and comfortable"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "oily",
        "combination"
      ],
      "targets": {
        "primary": [],
        "secondary": [
          "dryness"
        ]
      },
      "time": [
        "PM"
      ],
      "irritationPotential": 0,
      "usage": "On DRY hands and face: 2 to 3 pumps, massage to dissolve makeup and SPF, emulsify with a little water, rinse well. Follow with the gel cleanser (double cleanse).",
      "precautions": [
        "Always apply to dry skin: water before massaging stops it from dissolving makeup."
      ],
      "pregnancy": "ok",
      "priceNote": "A_VALIDER: 150 ml at 1450 DA vs 200 ml at 2490 DA, an unusual price gap.",
      "nameFr": "Calming Antioxidant Oil Cleanser"
    },
    {
      "id": "salicylic_2",
      "name": "Salicylic Acid 2% Toner",
      "nameEn": "Salicylic Acid 2% Toner",
      "step": 2,
      "category": "exfoliant",
      "activeClass": "bha",
      "variants": [
        {
          "size": "100 ml",
          "price": 2600,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Salicylic acid",
          "pct": 2
        },
        {
          "name": "Tea tree extract",
          "pct": 10
        },
        {
          "name": "Panthenol",
          "pct": 1
        }
      ],
      "fullInci": "A_VALIDER",
      "ph": "A_VALIDER",
      "claims": [
        "Gets into the pore and dissolves the mix of sebum and dead cells",
        "Unclogged pores, less visible blackheads"
      ],
      "skinTypes": [
        "oily",
        "combination",
        "normal"
      ],
      "targets": {
        "primary": [
          "blackheads",
          "acne",
          "pores"
        ],
        "secondary": [
          "sebum",
          "texture"
        ]
      },
      "time": [
        "PM"
      ],
      "irritationPotential": 2,
      "usage": "In the evening, soak a cotton pad and focus on the T-zone. Do not rinse; leave on for 60 seconds. Follow with a light moisturizer. SPF50+ the next morning.",
      "precautions": [
        "Never use on the same evening as glycolic acid or retinol.",
        "Avoid the eye area and lips."
      ],
      "pregnancy": "avoid",
      "nameFr": "Liquide Exfoliant Acide Salicylique 2 %"
    },
    {
      "id": "glycolic_7",
      "name": "Glycolic Acid 7% Toner",
      "nameEn": "Glycolic Acid 7% Toner",
      "step": 2,
      "category": "exfoliant",
      "activeClass": "aha",
      "variants": [
        {
          "size": "100 ml",
          "price": 2750,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Glycolic acid",
          "pct": 7
        },
        {
          "name": "L-Arginine",
          "pct": 1
        },
        {
          "name": "Chamomile extract",
          "pct": 10
        }
      ],
      "fullInci": "A_VALIDER",
      "ph": "A_VALIDER",
      "claims": [
        "Smoother skin texture",
        "Brighter complexion"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination"
      ],
      "targets": {
        "primary": [
          "texture",
          "dullness"
        ],
        "secondary": [
          "uneven_tone",
          "post_acne_marks",
          "hyperpigmentation",
          "fine_lines"
        ]
      },
      "time": [
        "PM"
      ],
      "irritationPotential": 3,
      "usage": "In the evening, soak a cotton pad and sweep over clean, dry skin. Do not rinse; leave on for 60 seconds. Follow with serum and moisturizer. SPF50+ the next morning.",
      "precautions": [
        "Start 2 to 3 evenings a week, then increase as tolerated.",
        "Never on the same evening as retinol or salicylic acid."
      ],
      "pregnancy": "ok",
      "nameFr": "Liquide Exfoliant Acide Glycolique 7 %"
    },
    {
      "id": "niacinamide_10",
      "name": "Niacinamide 10% Serum",
      "nameEn": "Niacinamide 10% Serum",
      "step": 3,
      "category": "serum",
      "activeClass": "niacinamide",
      "variants": [
        {
          "size": "30 ml",
          "price": 2850,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Niacinamide",
          "pct": 10
        },
        {
          "name": "Panthenol",
          "pct": 5
        },
        {
          "name": "Hyaluronic acid",
          "pct": 2
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Helps regulate sebum",
        "Supports production of barrier lipids",
        "Helps reduce the look of redness",
        "Less shine, visibly refined pores"
      ],
      "skinTypes": [
        "oily",
        "combination",
        "normal",
        "dry"
      ],
      "targets": {
        "primary": [
          "sebum",
          "pores",
          "acne"
        ],
        "secondary": [
          "redness",
          "uneven_tone",
          "post_acne_marks",
          "blackheads"
        ]
      },
      "time": [
        "AM",
        "PM"
      ],
      "irritationPotential": 1,
      "usage": "A few drops on clean, dry skin, spread over face and neck. Follow with moisturizer, then SPF in the morning.",
      "precautions": [
        "Works with almost the whole routine, including the exfoliant and retinol."
      ],
      "pregnancy": "ok",
      "nameFr": "Sérum Niacinamide 10 % Anti-Imperfections"
    },
    {
      "id": "retinol_02",
      "name": "Retinol 0.2% Serum",
      "nameEn": "Retinol 0.2% Serum",
      "step": 3,
      "category": "serum",
      "activeClass": "retinoid",
      "variants": [
        {
          "size": "30 ml",
          "price": 2500,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Encapsulated retinol",
          "pct": 0.2
        },
        {
          "name": "Niacinamide",
          "pct": 5
        },
        {
          "name": "Panthenol",
          "pct": 5
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Boosts skin cell renewal",
        "Encapsulated and released gradually for better tolerance",
        "Wrinkles look softer, skin texture refined"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "fine_lines",
          "firmness",
          "texture"
        ],
        "secondary": [
          "uneven_tone",
          "pores",
          "post_acne_marks"
        ]
      },
      "time": [
        "PM"
      ],
      "irritationPotential": 3,
      "usage": "In the evening, 3 to 4 drops on clean, dry skin. Avoid the eye and lip area. After 5 minutes, apply moisturizer. SPF50+ the next day.",
      "precautions": [
        "Start 2 evenings a week. At first, your skin is adjusting.",
        "Do not use during pregnancy or breastfeeding.",
        "Never on the same evening as an exfoliating acid."
      ],
      "pregnancy": "contraindicated",
      "nameFr": "Sérum Anti-Rides Rétinol 0,2 %"
    },
    {
      "id": "vitc_15",
      "name": "Vitamin C 15% Serum",
      "nameEn": "Vitamin C 15% Serum",
      "step": 3,
      "category": "serum",
      "activeClass": "vitc",
      "variants": [
        {
          "size": "30 ml",
          "price": 2650,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Vitamin C (Ascorbyl Tetraisopalmitate + Sodium Ascorbyl Phosphate)",
          "pct": 15
        },
        {
          "name": "Hericium complex",
          "pct": 1
        },
        {
          "name": "Hyaluronic acid",
          "pct": 2
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Protects skin from oxidative stress",
        "Revives radiance and helps even out skin tone",
        "Glowing skin, even tone"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "dullness",
          "uneven_tone"
        ],
        "secondary": [
          "hyperpigmentation",
          "post_acne_marks",
          "fine_lines"
        ]
      },
      "time": [
        "AM"
      ],
      "irritationPotential": 1,
      "usage": "Preferably in the morning: 2 to 3 drops on clean, dry skin, spread over face and neck. Always follow with moisturizer and sunscreen.",
      "precautions": [
        "Always follow with sunscreen."
      ],
      "pregnancy": "ok",
      "nameFr": "Sérum Vitamine C 15 % Éclat et Brillance"
    },
    {
      "id": "azelaic_15",
      "name": "Azelaic Acid 15% Gel-Serum",
      "nameEn": "Azelaic Acid 15% Gel-Serum",
      "step": 3,
      "category": "serum",
      "activeClass": "azelaic",
      "variants": [
        {
          "size": "30 ml",
          "price": 2750,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Azelaic acid",
          "pct": 15
        },
        {
          "name": "Kefir postbiotic",
          "pct": 1
        },
        {
          "name": "Panthenol",
          "pct": 2
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Helps unclog pores",
        "Helps reduce the look of redness",
        "Clearer complexion, softer redness and marks"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "redness",
          "post_acne_marks",
          "acne"
        ],
        "secondary": [
          "hyperpigmentation",
          "uneven_tone",
          "blackheads"
        ]
      },
      "time": [
        "PM",
        "AM"
      ],
      "irritationPotential": 2,
      "usage": "In the evening, a thin layer on clean, dry skin. Let it absorb before moisturizer. Then also in the morning if tolerated, always followed by SPF50+.",
      "precautions": [
        "Slight tingling in the first days is common. Very reactive skin: every other evening at first."
      ],
      "pregnancy": "ok",
      "nameFr": "Gel-Sérum Acide Azélaïque 15 %"
    },
    {
      "id": "ha_2",
      "name": "Hyaluronic Acid 2% Serum",
      "nameEn": "Hyaluronic Acid 2% Serum",
      "step": 3,
      "category": "serum",
      "activeClass": "humectant",
      "variants": [
        {
          "size": "30 ml",
          "price": 2650,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Hyaluronic acid (13 forms)",
          "pct": 2
        },
        {
          "name": "Beta-glucan",
          "pct": 0.3
        },
        {
          "name": "Oyster mushroom postbiotic",
          "pct": 1
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Hydrates at several levels",
        "Plumper skin, smoothed dehydration lines"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "dehydration"
        ],
        "secondary": [
          "dryness",
          "fine_lines"
        ]
      },
      "time": [
        "AM",
        "PM"
      ],
      "irritationPotential": 0,
      "usage": "Morning and evening, 3 to 4 drops on slightly damp skin. Press onto face and neck. Seal with a moisturizer.",
      "precautions": [
        "Always seal with a cream: in dry weather, that is what stops it from drying the skin."
      ],
      "pregnancy": "ok",
      "nameFr": "Sérum Ultra-Hydratant Acide Hyaluronique"
    },
    {
      "id": "eye_contour",
      "name": "Eye Renew Complex",
      "nameEn": "Eye Renew Complex",
      "step": 3,
      "category": "eye",
      "activeClass": "retinoid_eye",
      "variants": [
        {
          "size": "50 ml",
          "price": 2850,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Retinol",
          "pct": 0.2
        },
        {
          "name": "Vitamin C",
          "pct": 3
        },
        {
          "name": "Caffeine",
          "pct": 1
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Eyes look more rested, fine lines smoothed"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "under_eye"
        ],
        "secondary": [
          "fine_lines"
        ]
      },
      "time": [
        "PM"
      ],
      "irritationPotential": 2,
      "usage": "Take a small amount on your fingertip. Pat along the bone around the eye, never on the moving eyelid. Let it absorb before the next products.",
      "usageNote": "A_VALIDER: the catalogue does not say morning or evening. Contains retinol, so the algorithm places it in the evening.",
      "precautions": [
        "Contains retinol: do not use during pregnancy or breastfeeding."
      ],
      "pregnancy": "contraindicated",
      "sizeNote": "A_VALIDER: 50 ml is unusual for an eye cream (often 15 ml).",
      "nameFr": "Crème Contour des Yeux Anti-Âge"
    },
    {
      "id": "day_cream",
      "name": "Lift & Repair Day Cream",
      "nameEn": "Lift & Repair Day Cream",
      "step": 4,
      "category": "moisturizer",
      "activeClass": "moisturizer",
      "variants": [
        {
          "size": "50 ml",
          "price": 2200,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "Hyaluronic acid (13 forms)",
          "pct": 2
        },
        {
          "name": "Ectoin",
          "pct": 2
        },
        {
          "name": "Beta-glucan",
          "pct": 0.3
        },
        {
          "name": "Allantoin",
          "pct": "A_VALIDER"
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Multi-level hydration",
        "Limits water loss",
        "Helps skin cope with dry climates",
        "Soothes and softens",
        "Supple, comfortable skin with a stronger barrier"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [
          "dehydration",
          "dryness"
        ],
        "secondary": [
          "redness",
          "firmness"
        ]
      },
      "time": [
        "AM",
        "PM"
      ],
      "irritationPotential": 0,
      "usage": "A coffee-bean-sized amount after serum. Upward strokes over face and neck. Let absorb for 1 to 2 minutes, then SPF50+ in the morning.",
      "precautions": [
        "Very dry skin: use it in the evening too (the range has no night cream)."
      ],
      "pregnancy": "ok",
      "nameFr": "Crème de Jour Lift & Repair"
    },
    {
      "id": "spf_gelcream",
      "name": "UV Daily Defence+ Gel-Cream SPF50+",
      "nameEn": "UV Daily Defence+ Gel-Cream SPF50+",
      "step": 5,
      "category": "spf",
      "activeClass": "spf",
      "hydrating": true,
      "variants": [
        {
          "size": "50 ml",
          "price": 2950,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "UVA/UVB filters",
          "pct": "A_VALIDER"
        },
        {
          "name": "Niacinamide",
          "pct": 5
        },
        {
          "name": "Beta-glucan",
          "pct": 0.3
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "Hydrating daily sun protection",
        "Helps even out skin tone",
        "Soothes and supports the barrier",
        "No white cast"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [],
        "secondary": [
          "uneven_tone",
          "hyperpigmentation",
          "post_acne_marks"
        ]
      },
      "time": [
        "AM"
      ],
      "irritationPotential": 0,
      "usage": "Last step of the morning, even in the city. Apply generously to face and neck. Reapply every 2 hours when exposed.",
      "precautions": [
        "A_VALIDER: niacinamide listed at 5% on the product sheet and 2% in the catalogue text."
      ],
      "pregnancy": "ok",
      "nameFr": "Gel Crème Solaire SPF 50+"
    },
    {
      "id": "spf_stick",
      "name": "UV Daily Defence+ Stick SPF50+",
      "nameEn": "UV Daily Defence+ Stick SPF50+",
      "step": 5,
      "category": "spf_reapply",
      "activeClass": "spf",
      "variants": [
        {
          "size": "15 g",
          "price": 2490,
          "variantId": "A_VALIDER"
        }
      ],
      "keyActives": [
        {
          "name": "UVA/UVB filters",
          "pct": "A_VALIDER"
        },
        {
          "name": "Vitamin E",
          "pct": 1
        },
        {
          "name": "Jojoba oil",
          "pct": 3
        }
      ],
      "fullInci": "A_VALIDER",
      "claims": [
        "On-the-go touch-ups without touching your skin",
        "Protection maintained throughout the day"
      ],
      "skinTypes": [
        "normal",
        "dry",
        "combination",
        "oily"
      ],
      "targets": {
        "primary": [],
        "secondary": []
      },
      "time": [
        "AM"
      ],
      "irritationPotential": 0,
      "usage": "Apply to face and exposed areas, blend if needed. Reapply every 2 hours when exposed.",
      "precautions": [
        "In addition to sunscreen, not instead of it."
      ],
      "pregnancy": "ok",
      "nameFr": "Stick Solaire SPF 50+ PA++++"
    }
  ],
  "kits": [
    {
      "id": "kit_smooth_clear",
      "name": "Smooth & Clear Kit",
      "products": "A_VALIDER",
      "price": "A_VALIDER"
    },
    {
      "id": "kit_anti_age",
      "name": "Anti-Age Kit",
      "products": "A_VALIDER",
      "price": "A_VALIDER"
    },
    {
      "id": "duo_anti_acne",
      "name": "Duo Anti-Acne",
      "products": "A_VALIDER",
      "price": "A_VALIDER"
    },
    {
      "id": "duo_anti_age",
      "name": "Duo Anti-Age",
      "products": "A_VALIDER",
      "price": "A_VALIDER"
    }
  ],
  "compatibility": {
    "_legend": "same_night: 'never' = not on the same evening; 'separate_if_sensitive' = different evenings if sensitivity >= 50; 'ok' = compatible. 'catalogue' rules are written in the AVURE catalogue; 'engine' rules are precautions added by the algorithm.",
    "rules": [
      {
        "a": "retinol_02",
        "b": "glycolic_7",
        "same_night": "never",
        "source": "catalogue"
      },
      {
        "a": "retinol_02",
        "b": "salicylic_2",
        "same_night": "never",
        "source": "catalogue"
      },
      {
        "a": "salicylic_2",
        "b": "glycolic_7",
        "same_night": "never",
        "source": "catalogue"
      },
      {
        "a": "retinol_02",
        "b": "azelaic_15",
        "same_night": "separate_if_sensitive",
        "source": "engine"
      },
      {
        "a": "azelaic_15",
        "b": "glycolic_7",
        "same_night": "never",
        "source": "engine"
      },
      {
        "a": "azelaic_15",
        "b": "salicylic_2",
        "same_night": "never",
        "source": "engine"
      },
      {
        "a": "eye_contour",
        "b": "glycolic_7",
        "same_night": "ok",
        "source": "engine",
        "note": "different areas; keep the exfoliant away from the eyes"
      },
      {
        "a": "niacinamide_10",
        "b": "*",
        "same_night": "ok",
        "source": "catalogue"
      },
      {
        "a": "vitc_15",
        "b": "niacinamide_10",
        "same_night": "ok",
        "source": "engine",
        "note": "SAP / ascorbyl tetraisopalmitate: no incompatibility"
      }
    ]
  }
};
