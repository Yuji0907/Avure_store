/* AVURE Skin Analyzer — base de questions (FR). Client-provided, unchanged. To be translated to English (keep all ids/codes).
   Chaque réponse a un code stable ; le barème (engine) référence ces codes. */
(function (root) {
  const CONCERNS = [
    { id: 'acne', label: 'Boutons et imperfections', icon: '◉' },
    { id: 'blackheads', label: 'Points noirs, pores obstrués', icon: '∴' },
    { id: 'sebum', label: 'Excès de sébum, brillance', icon: '◌' },
    { id: 'post_acne_marks', label: 'Marques post-boutons', icon: '◐' },
    { id: 'hyperpigmentation', label: 'Taches pigmentaires', icon: '●' },
    { id: 'uneven_tone', label: 'Teint irrégulier', icon: '◑' },
    { id: 'dullness', label: 'Teint terne, manque d\'éclat', icon: '◇' },
    { id: 'fine_lines', label: 'Ridules et rides', icon: '≈' },
    { id: 'firmness', label: 'Perte de fermeté', icon: '⌒' },
    { id: 'dehydration', label: 'Déshydratation, tiraillements', icon: '◊' },
    { id: 'dryness', label: 'Sécheresse, desquamation', icon: '⁂' },
    { id: 'redness', label: 'Rougeurs', icon: '◍' },
    { id: 'pores', label: 'Pores visibles', icon: '⋯' },
    { id: 'texture', label: 'Grain de peau irrégulier', icon: '▦' },
    { id: 'under_eye', label: 'Cernes, poches, ridules du contour des yeux', icon: '◠' }
  ];

  const Q = [
    // ── SECTION A — PROFIL
    { id: 'age', section: 'A', label: 'Quel âge avez-vous ?', type: 'single', required: true, options: [
      ['u18', 'Moins de 18 ans'], ['18_24', '18 – 24 ans'], ['25_34', '25 – 34 ans'], ['35_44', '35 – 44 ans'], ['45_54', '45 – 54 ans'], ['55p', '55 ans et plus'] ] },
    { id: 'gender', section: 'A', label: 'Vous êtes… (facultatif)', type: 'single', optional: true, options: [
      ['f', 'Une femme'], ['m', 'Un homme'], ['na', 'Je préfère ne pas répondre'] ] },
    { id: 'climate', section: 'A', label: 'Dans quel climat vivez-vous la plupart de l\'année ?', type: 'single', options: [
      ['hot_dry', 'Chaud et sec (Sud, Hauts-Plateaux en été)'], ['hot_humid', 'Chaud et humide (littoral)'], ['cold_dry', 'Froid et sec en hiver (Hauts-Plateaux, montagne)'], ['mixed', 'Variable / hors d\'Algérie'] ] },
    { id: 'routine_level', section: 'A', label: 'Votre routine actuelle ressemble à…', type: 'single', options: [
      ['none', 'Rien ou presque (eau, savon)'], ['basic', 'Nettoyant + crème'], ['moderate', '3 à 4 produits'], ['full', 'Routine complète (5 produits ou plus)'] ] },
    { id: 'active_experience', section: 'A', label: 'Avez-vous déjà utilisé des actifs (acides exfoliants, rétinol, vitamine C…) ?', type: 'single', options: [
      ['never', 'Jamais'], ['occasional', 'Quelques fois'], ['regular_ok', 'Régulièrement, ma peau les tolère bien'], ['regular_bad', 'Oui, mais ma peau a mal réagi'] ] },
    { id: 'pregnancy', section: 'A', label: 'Êtes-vous enceinte, allaitante ou en projet de grossesse ?', hint: 'Question de sécurité uniquement : certains actifs sont déconseillés dans ces situations. Rien n\'est enregistré.', type: 'single', showIf: a => a.gender !== 'm', options: [
      ['no', 'Non'], ['yes', 'Oui'], ['na', 'Je préfère ne pas répondre'] ] },
    { id: 'medical', section: 'A', label: 'Suivez-vous actuellement un traitement ou avez-vous un diagnostic médical pour la peau du visage ?', hint: 'Si oui, votre dermatologue reste votre référence : nous adapterons une routine douce, compatible avec son suivi.', type: 'multi', options: [
      ['none', 'Non, aucun'], ['isotretinoin', 'Traitement oral contre l\'acné (isotrétinoïne, antibiotiques)'], ['rx_topical', 'Crème prescrite (trétinoïne, adapalène, peroxyde de benzoyle, corticoïde…)'], ['eczema', 'Eczéma ou dermatite diagnostiqué(e)'], ['rosacea', 'Rosacée diagnostiquée'], ['other', 'Autre suivi dermatologique'] ], exclusive: 'none' },

    // ── SECTION B — TYPE DE PEAU
    { id: 'after_cleanse', section: 'B', label: 'Une heure après vous être lavé le visage, sans rien appliquer, votre peau est…', type: 'single', options: [
      ['tight_all', 'Tiraillée partout'], ['tight_cheeks', 'Tiraillée sur les joues seulement'], ['comfortable', 'Confortable, ni grasse ni sèche'], ['shiny_t', 'Légèrement brillante sur la zone T (front, nez, menton)'], ['shiny_all', 'Brillante sur tout le visage'] ] },
    { id: 'midday_shine', section: 'B', label: 'En milieu de journée, votre visage brille…', type: 'single', options: [
      ['none', 'Pas du tout'], ['t_zone', 'Sur la zone T uniquement'], ['all', 'Sur tout le visage'] ] },
    { id: 'pores_visibility', section: 'B', label: 'Vos pores sont…', type: 'single', options: [
      ['invisible', 'Presque invisibles'], ['nose', 'Visibles sur le nez'], ['t_zone', 'Visibles sur la zone T'], ['everywhere', 'Visibles et dilatés sur tout le visage'] ] },
    { id: 'flaking', section: 'B', label: 'Avez-vous des petites peaux, plaques sèches ou une desquamation ?', type: 'single', options: [
      ['never', 'Jamais'], ['winter', 'Parfois, surtout en hiver'], ['often', 'Souvent'], ['always', 'En permanence'] ] },
    { id: 'cheeks', section: 'B', label: 'Vos joues sont plutôt…', type: 'single', options: [
      ['dry', 'Sèches ou rugueuses'], ['normal', 'Normales'], ['oily', 'Grasses comme le reste du visage'] ] },
    { id: 'tight_day', section: 'B', label: 'Dans la journée ou après la douche, votre peau tire-t-elle ?', type: 'single', options: [
      ['never', 'Jamais'], ['sometimes', 'Parfois'], ['often', 'Souvent'], ['always', 'Toujours'] ] },
    { id: 'thirsty', section: 'B', label: 'Votre peau « boit » la crème immédiatement et en redemande ?', type: 'single', options: [
      ['no', 'Non'], ['sometimes', 'Parfois'], ['yes', 'Oui, souvent'] ] },
    { id: 'dehyd_lines', section: 'B', label: 'Voyez-vous de fines ridules superficielles qui s\'atténuent quand la peau est bien hydratée ?', type: 'single', options: [
      ['no', 'Non'], ['little', 'Un peu'], ['yes', 'Oui, nettement'] ] },

    // ── SECTION C — SENSIBILITÉ & BARRIÈRE
    { id: 'redness_freq', section: 'C', label: 'Votre visage rougit…', type: 'single', options: [
      ['never', 'Rarement ou jamais'], ['triggers', 'Avec la chaleur, l\'effort ou les émotions'], ['frequent', 'Fréquemment, sans raison claire'], ['permanent', 'Les rougeurs sont presque permanentes'] ] },
    { id: 'stinging', section: 'C', label: 'Quand vous appliquez un nouveau produit, ressentez-vous des picotements ou brûlures ?', type: 'single', options: [
      ['never', 'Jamais'], ['sometimes', 'Parfois'], ['often', 'Souvent'], ['almost_always', 'Presque à chaque fois'] ] },
    { id: 'itching', section: 'C', label: 'Avez-vous des démangeaisons sur le visage ?', type: 'single', options: [
      ['never', 'Jamais'], ['sometimes', 'Parfois'], ['often', 'Souvent'] ] },
    { id: 'reactions', section: 'C', label: 'Un cosmétique vous a-t-il déjà provoqué une réaction (plaques, boutons soudains, gonflement) ?', type: 'single', options: [
      ['never', 'Jamais'], ['once', 'Une fois'], ['several', 'Plusieurs fois'] ] },
    { id: 'env_reactivity', section: 'C', label: 'Votre peau réagit-elle au froid, au vent, au soleil ou à l\'eau calcaire ?', type: 'single', options: [
      ['rarely', 'Rarement'], ['sometimes', 'Parfois'], ['often', 'Souvent'] ] },
    { id: 'active_tolerance', section: 'C', label: 'Avec les acides exfoliants ou le rétinol, votre peau…', type: 'single', options: [
      ['untried', 'Je n\'en ai jamais utilisé'], ['fine', 'Les tolère bien'], ['mild', 'Picote un peu au début, puis s\'habitue'], ['strong', 'Réagit fortement (rougeurs, brûlures, desquamation)'] ] },
    { id: 'current_irritation', section: 'C', label: 'En ce moment, votre peau est-elle irritée ou abîmée (coup de soleil, sur-exfoliation, plaques à vif) ?', type: 'single', options: [
      ['no', 'Non'], ['slightly', 'Légèrement'], ['yes', 'Oui'] ] },

    // ── SECTION D — PRÉOCCUPATIONS
    { id: 'concerns', section: 'D', label: 'Qu\'aimeriez-vous améliorer ?', hint: 'Plusieurs choix possibles.', type: 'concerns', options: CONCERNS.map(c => [c.id, c.label]) },
    { id: 'acne_type', section: 'D', label: 'Vos imperfections sont surtout…', type: 'single', showIf: a => (a.concerns || []).includes('acne'), options: [
      ['comedonal', 'Points noirs et petits points blancs'], ['papular', 'Boutons rouges, parfois avec une tête blanche'], ['nodular', 'Boutons profonds, douloureux, sous la peau'] ] },
    { id: 'acne_area', section: 'D', label: 'Où apparaissent-elles surtout ?', type: 'single', showIf: a => (a.concerns || []).includes('acne'), options: [
      ['t_zone', 'Zone T'], ['jaw', 'Bas du visage, mâchoire'], ['whole', 'Tout le visage'] ] },
    { id: 'priority', section: 'D', label: 'Si vous ne deviez en choisir qu\'une, laquelle est votre priorité ?', type: 'priority', showIf: a => (a.concerns || []).length > 1 },

    // ── SECTION E — MODE DE VIE
    { id: 'sun_exposure', section: 'E', label: 'Combien de temps passez-vous au soleil par jour ?', type: 'single', options: [
      ['low', 'Moins de 30 minutes'], ['mid', '30 minutes à 2 heures'], ['high', 'Plus de 2 heures (travail en extérieur, trajets…)'] ] },
    { id: 'spf_habit', section: 'E', label: 'Utilisez-vous une protection solaire sur le visage ?', type: 'single', options: [
      ['never', 'Jamais'], ['sometimes', 'Parfois, l\'été'], ['daily', 'Tous les jours'], ['daily_reapply', 'Tous les jours, avec réapplication'] ] },
    { id: 'makeup', section: 'E', label: 'Portez-vous du maquillage ?', type: 'single', options: [
      ['never', 'Jamais'], ['sometimes', 'Occasionnellement'], ['daily', 'Tous les jours'] ] },
    { id: 'sleep', section: 'E', label: 'Votre sommeil est…', type: 'single', options: [
      ['good', 'Bon'], ['average', 'Moyen'], ['poor', 'Insuffisant ou de mauvaise qualité'] ] },
    { id: 'water', section: 'E', label: 'Combien d\'eau buvez-vous par jour ?', type: 'single', options: [
      ['low', 'Moins d\'1 litre'], ['mid', '1 à 2 litres'], ['high', 'Plus de 2 litres'] ] },
    { id: 'stress', section: 'E', label: 'Votre niveau de stress ces dernières semaines ?', type: 'single', options: [
      ['low', 'Faible'], ['mid', 'Modéré'], ['high', 'Élevé'] ] },
    { id: 'smoking', section: 'E', label: 'Fumez-vous ? (facultatif)', type: 'single', optional: true, options: [
      ['no', 'Non'], ['yes', 'Oui'], ['na', 'Je préfère ne pas répondre'] ] },
    { id: 'environment', section: 'E', label: 'Votre environnement principal ?', type: 'single', options: [
      ['ac', 'Intérieur climatisé ou chauffé'], ['urban', 'Ville, pollution, trajets'], ['outdoor', 'Extérieur'], ['mixed', 'Mixte'] ] },

    // ── SECTION F — PRODUITS ACTUELS
    { id: 'current_products', section: 'F', label: 'Quels produits utilisez-vous actuellement ?', hint: 'Pour éviter les doublons et la sur-exfoliation.', type: 'multi', exclusive: 'none', options: [
      ['cleanser', 'Nettoyant'], ['moisturizer', 'Crème hydratante'], ['spf', 'Protection solaire'], ['aha', 'Acide glycolique / lactique (AHA)'], ['bha', 'Acide salicylique (BHA)'], ['scrub', 'Gommage à grains'], ['retinol', 'Rétinol (cosmétique)'], ['vitc', 'Vitamine C'], ['niacinamide', 'Niacinamide'], ['azelaic', 'Acide azélaïque'], ['bpo', 'Peroxyde de benzoyle'], ['none', 'Aucun'] ] },
    { id: 'routine_pref', section: 'F', label: 'Combien d\'étapes êtes-vous prêt(e) à suivre ?', type: 'single', options: [
      ['minimal', 'Le strict essentiel (3 étapes)'], ['balanced', 'Une routine équilibrée (4 étapes)'], ['complete', 'Une routine complète, je suis motivé(e)'] ] }
  ];

  function concernDetailQuestions(answers) {
    return (answers.concerns || []).map(cid => {
      const c = CONCERNS.find(x => x.id === cid);
      return { id: 'detail_' + cid, section: 'D', concern: cid, type: 'concern_detail', label: c ? c.label : cid,
        fields: [
          { key: 'severity', label: 'Intensité', options: [[1, 'Légère'], [2, 'Modérée'], [3, 'Marquée']] },
          { key: 'duration', label: 'Depuis', options: [[1, '< 3 mois'], [2, '3 à 12 mois'], [3, '> 1 an']] },
          ...(cid === 'acne' ? [{ key: 'frequency', label: 'Fréquence', options: [[1, 'Occasionnelle'], [2, 'Chaque mois'], [3, 'Permanente']] }] : [])
        ] };
    });
  }

  /* BILAN EXPRESS (≈ 2 min, 14 écrans) — USE THIS ONE ON THE SITE.
     Les options fusionnées portent un 3e élément `set` : les champs moteur qu'elles remplissent. */
  const byId = id => Q.find(q => q.id === id);
  const EXPRESS = [
    byId('age'),
    { id: 'x_profile', section: 'A', label: 'Vous êtes…', hint: 'Question de sécurité : certains actifs sont déconseillés pendant la grossesse. Rien n\'est enregistré.', type: 'single', options: [
      ['f', 'Une femme', { gender: 'f', pregnancy: 'no' }],
      ['f_preg', 'Une femme enceinte, allaitante ou en projet de grossesse', { gender: 'f', pregnancy: 'yes' }],
      ['m', 'Un homme', { gender: 'm', pregnancy: undefined }],
      ['na', 'Je préfère ne pas répondre', { gender: 'na', pregnancy: 'na' }] ] },
    byId('medical'),
    byId('after_cleanse'),
    byId('midday_shine'),
    byId('tight_day'),
    { id: 'x_reactivity', section: 'C', label: 'Quand vous essayez un nouveau produit, votre peau…', type: 'single', options: [
      ['never', 'Ne réagit pas', { stinging: 'never', reactions: 'never' }],
      ['sometimes', 'Picote parfois, puis s\'habitue', { stinging: 'sometimes', reactions: 'never' }],
      ['often', 'Picote, brûle ou rougit souvent', { stinging: 'often', reactions: 'once' }],
      ['reaction', 'A déjà fait des plaques, des boutons ou gonflé', { stinging: 'often', reactions: 'several' }] ] },
    byId('redness_freq'),
    byId('current_irritation'),
    { id: 'x_actives', section: 'C', label: 'Avez-vous déjà utilisé des actifs (acides exfoliants, rétinol, vitamine C) ?', type: 'single', options: [
      ['never', 'Jamais', { active_experience: 'never', active_tolerance: 'untried' }],
      ['occasional_ok', 'De temps en temps, sans problème', { active_experience: 'occasional', active_tolerance: 'fine' }],
      ['regular_ok', 'Régulièrement, sans problème', { active_experience: 'regular_ok', active_tolerance: 'fine' }],
      ['mild', 'Ça picote un peu au début, puis ça passe', { active_experience: 'occasional', active_tolerance: 'mild' }],
      ['bad', 'Ma peau a mal réagi', { active_experience: 'regular_bad', active_tolerance: 'strong' }] ] },
    { ...byId('concerns'), max: 3, hint: 'Jusqu\'à 3. La première choisie sera votre priorité.' },
    { id: 'x_intensity', section: 'D', label: 'À quel point ?', type: 'intensity_all', showIf: a => (a.concerns || []).length > 0 },
    byId('sun_exposure'),
    { ...byId('current_products'), label: 'Qu\'utilisez-vous actuellement ?', options: [...byId('current_products').options.filter(o => o[0] !== 'none'), ['makeup_daily', 'Je me maquille tous les jours'], ['none', 'Aucun produit']] }
  ];
  const EXPRESS_FIELDS = ['age', 'gender', 'pregnancy', 'medical', 'after_cleanse', 'midday_shine', 'tight_day', 'stinging', 'reactions', 'redness_freq',
    'current_irritation', 'active_experience', 'active_tolerance', 'concerns', 'acne_type', 'sun_exposure', 'current_products', 'makeup'];

  const api = { CONCERNS, QUESTIONS: Q, EXPRESS, EXPRESS_FIELDS, concernDetailQuestions };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AvureQuestions = api;
})(typeof window !== 'undefined' ? window : globalThis);
