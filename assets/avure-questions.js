/* AVURE Skin Analyzer: question bank (English). Translated from the client's quiz in _reference/;
   every id and answer code is unchanged, because the engine's scoring references these codes. */
(function (root) {
  const CONCERNS = [
    { id: 'acne', label: 'Spots and blemishes', icon: '◉' },
    { id: 'blackheads', label: 'Blackheads, clogged pores', icon: '∴' },
    { id: 'sebum', label: 'Excess oil, shine', icon: '◌' },
    { id: 'post_acne_marks', label: 'Post-blemish marks', icon: '◐' },
    { id: 'hyperpigmentation', label: 'Dark spots', icon: '●' },
    { id: 'uneven_tone', label: 'Uneven skin tone', icon: '◑' },
    { id: 'dullness', label: 'Dull skin, lack of radiance', icon: '◇' },
    { id: 'fine_lines', label: 'Fine lines and wrinkles', icon: '≈' },
    { id: 'firmness', label: 'Loss of firmness', icon: '⌒' },
    { id: 'dehydration', label: 'Dehydration, tightness', icon: '◊' },
    { id: 'dryness', label: 'Dryness, flaking', icon: '⁂' },
    { id: 'redness', label: 'Redness', icon: '◍' },
    { id: 'pores', label: 'Visible pores', icon: '⋯' },
    { id: 'texture', label: 'Uneven skin texture', icon: '▦' },
    { id: 'under_eye', label: 'Dark circles, puffiness, fine lines around the eyes', icon: '◠' }
  ];

  const Q = [
    // ── SECTION A — PROFILE
    { id: 'age', section: 'A', label: 'How old are you?', type: 'single', required: true, options: [
      ['u18', 'Under 18'], ['18_24', '18 – 24'], ['25_34', '25 – 34'], ['35_44', '35 – 44'], ['45_54', '45 – 54'], ['55p', '55 and over'] ] },
    { id: 'gender', section: 'A', label: 'You are… (optional)', type: 'single', optional: true, options: [
      ['f', 'A woman'], ['m', 'A man'], ['na', 'I prefer not to say'] ] },
    { id: 'climate', section: 'A', label: 'What climate do you live in for most of the year?', type: 'single', options: [
      ['hot_dry', 'Hot and dry (South, High Plateaus in summer)'], ['hot_humid', 'Hot and humid (coast)'], ['cold_dry', 'Cold and dry in winter (High Plateaus, mountains)'], ['mixed', 'Varies / outside Algeria'] ] },
    { id: 'routine_level', section: 'A', label: 'Your current routine looks like…', type: 'single', options: [
      ['none', 'Nothing or almost nothing (water, soap)'], ['basic', 'Cleanser + cream'], ['moderate', '3 to 4 products'], ['full', 'Full routine (5 products or more)'] ] },
    { id: 'active_experience', section: 'A', label: 'Have you used actives before (exfoliating acids, retinol, vitamin C…)?', type: 'single', options: [
      ['never', 'Never'], ['occasional', 'A few times'], ['regular_ok', 'Regularly, my skin tolerates them well'], ['regular_bad', 'Yes, but my skin reacted badly'] ] },
    { id: 'pregnancy', section: 'A', label: 'Are you pregnant, breastfeeding or planning a pregnancy?', hint: 'A safety question only: some actives are not recommended in these situations. Nothing is saved.', type: 'single', showIf: a => a.gender !== 'm', options: [
      ['no', 'No'], ['yes', 'Yes'], ['na', 'I prefer not to say'] ] },
    { id: 'medical', section: 'A', label: 'Are you currently being treated for, or have you been diagnosed with, a skin condition on your face?', hint: 'If so, your dermatologist has the final say: we will suggest a gentle routine that fits with their care.', type: 'multi', options: [
      ['none', 'No, none'], ['isotretinoin', 'Oral acne treatment (isotretinoin, antibiotics)'], ['rx_topical', 'Prescription cream (tretinoin, adapalene, benzoyl peroxide, corticosteroid…)'], ['eczema', 'Diagnosed eczema or dermatitis'], ['rosacea', 'Diagnosed rosacea'], ['other', 'Other dermatology follow-up'] ], exclusive: 'none' },

    // ── SECTION B — SKIN TYPE
    { id: 'after_cleanse', section: 'B', label: 'One hour after washing your face, with nothing applied, your skin feels…', type: 'single', options: [
      ['tight_all', 'Tight all over'], ['tight_cheeks', 'Tight on the cheeks only'], ['comfortable', 'Comfortable, neither oily nor dry'], ['shiny_t', 'Slightly shiny on the T-zone (forehead, nose, chin)'], ['shiny_all', 'Shiny all over the face'] ] },
    { id: 'midday_shine', section: 'B', label: 'By midday, your face is shiny…', type: 'single', options: [
      ['none', 'Not at all'], ['t_zone', 'On the T-zone only'], ['all', 'All over the face'] ] },
    { id: 'pores_visibility', section: 'B', label: 'Your pores are…', type: 'single', options: [
      ['invisible', 'Almost invisible'], ['nose', 'Visible on the nose'], ['t_zone', 'Visible on the T-zone'], ['everywhere', 'Visible and enlarged all over the face'] ] },
    { id: 'flaking', section: 'B', label: 'Do you get flaky bits, dry patches or peeling?', type: 'single', options: [
      ['never', 'Never'], ['winter', 'Sometimes, mostly in winter'], ['often', 'Often'], ['always', 'All the time'] ] },
    { id: 'cheeks', section: 'B', label: 'Your cheeks are mostly…', type: 'single', options: [
      ['dry', 'Dry or rough'], ['normal', 'Normal'], ['oily', 'Oily, like the rest of the face'] ] },
    { id: 'tight_day', section: 'B', label: 'During the day or after a shower, does your skin feel tight?', type: 'single', options: [
      ['never', 'Never'], ['sometimes', 'Sometimes'], ['often', 'Often'], ['always', 'Always'] ] },
    { id: 'thirsty', section: 'B', label: 'Does your skin soak up cream straight away and want more?', type: 'single', options: [
      ['no', 'No'], ['sometimes', 'Sometimes'], ['yes', 'Yes, often'] ] },
    { id: 'dehyd_lines', section: 'B', label: 'Do you see fine surface lines that fade when your skin is well hydrated?', type: 'single', options: [
      ['no', 'No'], ['little', 'A little'], ['yes', 'Yes, clearly'] ] },

    // ── SECTION C — SENSITIVITY & BARRIER
    { id: 'redness_freq', section: 'C', label: 'Your face goes red…', type: 'single', options: [
      ['never', 'Rarely or never'], ['triggers', 'With heat, exercise or emotions'], ['frequent', 'Often, for no clear reason'], ['permanent', 'The redness is almost constant'] ] },
    { id: 'stinging', section: 'C', label: 'When you apply a new product, do you feel stinging or burning?', type: 'single', options: [
      ['never', 'Never'], ['sometimes', 'Sometimes'], ['often', 'Often'], ['almost_always', 'Almost every time'] ] },
    { id: 'itching', section: 'C', label: 'Does your face get itchy?', type: 'single', options: [
      ['never', 'Never'], ['sometimes', 'Sometimes'], ['often', 'Often'] ] },
    { id: 'reactions', section: 'C', label: 'Has a skincare or makeup product ever caused a reaction (patches, sudden spots, swelling)?', type: 'single', options: [
      ['never', 'Never'], ['once', 'Once'], ['several', 'Several times'] ] },
    { id: 'env_reactivity', section: 'C', label: 'Does your skin react to cold, wind, sun or hard water?', type: 'single', options: [
      ['rarely', 'Rarely'], ['sometimes', 'Sometimes'], ['often', 'Often'] ] },
    { id: 'active_tolerance', section: 'C', label: 'With exfoliating acids or retinol, your skin…', type: 'single', options: [
      ['untried', 'I have never used them'], ['fine', 'Tolerates them well'], ['mild', 'Tingles a little at first, then adjusts'], ['strong', 'Reacts strongly (redness, burning, peeling)'] ] },
    { id: 'current_irritation', section: 'C', label: 'Right now, is your skin irritated or damaged (sunburn, over-exfoliation, raw patches)?', type: 'single', options: [
      ['no', 'No'], ['slightly', 'Slightly'], ['yes', 'Yes'] ] },

    // ── SECTION D — CONCERNS
    { id: 'concerns', section: 'D', label: 'What would you like to improve?', hint: 'You can choose more than one.', type: 'concerns', options: CONCERNS.map(c => [c.id, c.label]) },
    { id: 'acne_type', section: 'D', label: 'Your blemishes are mostly…', type: 'single', showIf: a => (a.concerns || []).includes('acne'), options: [
      ['comedonal', 'Blackheads and small whiteheads'], ['papular', 'Red spots, sometimes with a white head'], ['nodular', 'Deep, painful spots under the skin'] ] },
    { id: 'acne_area', section: 'D', label: 'Where do they mostly appear?', type: 'single', showIf: a => (a.concerns || []).includes('acne'), options: [
      ['t_zone', 'T-zone'], ['jaw', 'Lower face, jawline'], ['whole', 'Whole face'] ] },
    { id: 'priority', section: 'D', label: 'If you could only pick one, which is your priority?', type: 'priority', showIf: a => (a.concerns || []).length > 1 },

    // ── SECTION E — LIFESTYLE
    { id: 'sun_exposure', section: 'E', label: 'How much time do you spend in the sun each day?', type: 'single', options: [
      ['low', 'Less than 30 minutes'], ['mid', '30 minutes to 2 hours'], ['high', 'More than 2 hours (outdoor work, commuting…)'] ] },
    { id: 'spf_habit', section: 'E', label: 'Do you use sunscreen on your face?', type: 'single', options: [
      ['never', 'Never'], ['sometimes', 'Sometimes, in summer'], ['daily', 'Every day'], ['daily_reapply', 'Every day, and I reapply'] ] },
    { id: 'makeup', section: 'E', label: 'Do you wear makeup?', type: 'single', options: [
      ['never', 'Never'], ['sometimes', 'Occasionally'], ['daily', 'Every day'] ] },
    { id: 'sleep', section: 'E', label: 'Your sleep is…', type: 'single', options: [
      ['good', 'Good'], ['average', 'Average'], ['poor', 'Too short or poor quality'] ] },
    { id: 'water', section: 'E', label: 'How much water do you drink a day?', type: 'single', options: [
      ['low', 'Less than 1 litre'], ['mid', '1 to 2 litres'], ['high', 'More than 2 litres'] ] },
    { id: 'stress', section: 'E', label: 'Your stress level over the last few weeks?', type: 'single', options: [
      ['low', 'Low'], ['mid', 'Moderate'], ['high', 'High'] ] },
    { id: 'smoking', section: 'E', label: 'Do you smoke? (optional)', type: 'single', optional: true, options: [
      ['no', 'No'], ['yes', 'Yes'], ['na', 'I prefer not to say'] ] },
    { id: 'environment', section: 'E', label: 'Where do you spend most of your time?', type: 'single', options: [
      ['ac', 'Indoors with air conditioning or heating'], ['urban', 'City, pollution, commuting'], ['outdoor', 'Outdoors'], ['mixed', 'A mix'] ] },

    // ── SECTION F — CURRENT PRODUCTS
    { id: 'current_products', section: 'F', label: 'Which products do you use at the moment?', hint: 'So we can avoid doubling up and over-exfoliating.', type: 'multi', exclusive: 'none', options: [
      ['cleanser', 'Cleanser'], ['moisturizer', 'Moisturizer'], ['spf', 'Sunscreen'], ['aha', 'Glycolic / lactic acid (AHA)'], ['bha', 'Salicylic acid (BHA)'], ['scrub', 'Grainy scrub'], ['retinol', 'Retinol (cosmetic)'], ['vitc', 'Vitamin C'], ['niacinamide', 'Niacinamide'], ['azelaic', 'Azelaic acid'], ['bpo', 'Benzoyl peroxide'], ['none', 'None'] ] },
    { id: 'routine_pref', section: 'F', label: 'How many steps are you happy to follow?', type: 'single', options: [
      ['minimal', 'The bare essentials (3 steps)'], ['balanced', 'A balanced routine (4 steps)'], ['complete', 'A full routine, I am motivated'] ] }
  ];

  function concernDetailQuestions(answers) {
    return (answers.concerns || []).map(cid => {
      const c = CONCERNS.find(x => x.id === cid);
      return { id: 'detail_' + cid, section: 'D', concern: cid, type: 'concern_detail', label: c ? c.label : cid,
        fields: [
          { key: 'severity', label: 'Intensity', options: [[1, 'Mild'], [2, 'Moderate'], [3, 'Marked']] },
          { key: 'duration', label: 'For how long', options: [[1, '< 3 months'], [2, '3 to 12 months'], [3, '> 1 year']] },
          ...(cid === 'acne' ? [{ key: 'frequency', label: 'How often', options: [[1, 'Occasional'], [2, 'Every month'], [3, 'Constant']] }] : [])
        ] };
    });
  }

  /* EXPRESS DIAGNOSTIC (about 2 min, 14 screens): USE THIS ONE ON THE SITE.
     Merged options carry a 3rd element `set`: the engine fields they fill in. */
  const byId = id => Q.find(q => q.id === id);
  const EXPRESS = [
    byId('age'),
    { id: 'x_profile', section: 'A', label: 'You are…', hint: 'A safety question: some actives are not recommended during pregnancy. Nothing is saved.', type: 'single', options: [
      ['f', 'A woman', { gender: 'f', pregnancy: 'no' }],
      ['f_preg', 'A woman who is pregnant, breastfeeding or planning a pregnancy', { gender: 'f', pregnancy: 'yes' }],
      ['m', 'A man', { gender: 'm', pregnancy: undefined }],
      ['na', 'I prefer not to say', { gender: 'na', pregnancy: 'na' }] ] },
    byId('medical'),
    byId('after_cleanse'),
    byId('midday_shine'),
    byId('tight_day'),
    { id: 'x_reactivity', section: 'C', label: 'When you try a new product, your skin…', type: 'single', options: [
      ['never', 'Does not react', { stinging: 'never', reactions: 'never' }],
      ['sometimes', 'Sometimes tingles, then adjusts', { stinging: 'sometimes', reactions: 'never' }],
      ['often', 'Often tingles, burns or goes red', { stinging: 'often', reactions: 'once' }],
      ['reaction', 'Has broken out in patches or spots, or swollen', { stinging: 'often', reactions: 'several' }] ] },
    byId('redness_freq'),
    byId('current_irritation'),
    { id: 'x_actives', section: 'C', label: 'Have you used actives before (exfoliating acids, retinol, vitamin C)?', type: 'single', options: [
      ['never', 'Never', { active_experience: 'never', active_tolerance: 'untried' }],
      ['occasional_ok', 'Now and then, no problem', { active_experience: 'occasional', active_tolerance: 'fine' }],
      ['regular_ok', 'Regularly, no problem', { active_experience: 'regular_ok', active_tolerance: 'fine' }],
      ['mild', 'It tingles a little at first, then settles', { active_experience: 'occasional', active_tolerance: 'mild' }],
      ['bad', 'My skin reacted badly', { active_experience: 'regular_bad', active_tolerance: 'strong' }] ] },
    { ...byId('concerns'), max: 3, hint: 'Up to 3. The first one you pick is your priority.' },
    { id: 'x_intensity', section: 'D', label: 'How much?', type: 'intensity_all', showIf: a => (a.concerns || []).length > 0 },
    byId('sun_exposure'),
    { ...byId('current_products'), label: 'What are you using at the moment?', options: [...byId('current_products').options.filter(o => o[0] !== 'none'), ['makeup_daily', 'I wear makeup every day'], ['none', 'No products']] }
  ];
  const EXPRESS_FIELDS = ['age', 'gender', 'pregnancy', 'medical', 'after_cleanse', 'midday_shine', 'tight_day', 'stinging', 'reactions', 'redness_freq',
    'current_irritation', 'active_experience', 'active_tolerance', 'concerns', 'acne_type', 'sun_exposure', 'current_products', 'makeup'];

  const api = { CONCERNS, QUESTIONS: Q, EXPRESS, EXPRESS_FIELDS, concernDetailQuestions };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AvureQuestions = api;
})(typeof window !== 'undefined' ? window : globalThis);
