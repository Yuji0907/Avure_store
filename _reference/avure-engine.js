/* AVURE Skin Analyzer — moteur de scoring et de recommandation. Client-provided, unchanged (French strings). To be translated to English (logic and codes unchanged).
   Déterministe : mêmes réponses + même version de catalogue => même résultat.
   Les scores sont des évaluations cosmétiques déclaratives, PAS des mesures cliniques ni un diagnostic. */
(function (root) {
  const ENGINE_VERSION = '1.0.0';
  const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  /* 1. BARÈME (answer → points) */
  const MATRIX = {
    sebum: [
      { q: 'after_cleanse', w: 3, map: { tight_all: 5, tight_cheeks: 30, comfortable: 45, shiny_t: 70, shiny_all: 95 } },
      { q: 'midday_shine', w: 3, map: { none: 30, t_zone: 65, all: 95 } },
      { q: 'pores_visibility', w: 2, map: { invisible: 15, nose: 40, t_zone: 65, everywhere: 90 } },
      { q: 'cheeks', w: 1.5, map: { dry: 15, normal: 45, oily: 85 } },
      { q: 'flaking', w: 1, map: { never: 55, winter: 40, often: 20, always: 10 } }
    ],
    dehydration: [
      { q: 'tight_day', w: 3, map: { never: 0, sometimes: 35, often: 70, always: 95 } },
      { q: 'thirsty', w: 2, map: { no: 0, sometimes: 45, yes: 85 } },
      { q: 'dehyd_lines', w: 2, map: { no: 0, little: 45, yes: 85 } },
      { q: 'flaking', w: 1.5, map: { never: 0, winter: 30, often: 65, always: 90 } },
      { q: 'after_cleanse', w: 1, map: { tight_all: 80, tight_cheeks: 50, comfortable: 10, shiny_t: 20, shiny_all: 25 } },
      { concern: 'dehydration', w: 2, wAbsent: 1 },
      { q: 'environment', w: 0.5, map: { ac: 70, urban: 40, outdoor: 50, mixed: 35 } },
      { q: 'climate', w: 0.5, map: { hot_dry: 70, hot_humid: 20, cold_dry: 65, mixed: 40 } },
      { q: 'water', w: 0.5, map: { low: 70, mid: 35, high: 15 } }
    ],
    sensitivity: [
      { q: 'redness_freq', w: 2, map: { never: 0, triggers: 35, frequent: 70, permanent: 90 } },
      { q: 'stinging', w: 3, map: { never: 0, sometimes: 40, often: 75, almost_always: 100 } },
      { q: 'itching', w: 1.5, map: { never: 0, sometimes: 40, often: 80 } },
      { q: 'reactions', w: 2.5, map: { never: 0, once: 45, several: 90 } },
      { q: 'env_reactivity', w: 1.5, map: { rarely: 0, sometimes: 40, often: 80 } },
      { q: 'active_tolerance', w: 2, map: { fine: 5, mild: 40, strong: 95 } } // 'untried' = non compté
    ],
    barrierRisk: [
      { q: 'current_irritation', w: 3, map: { no: 0, slightly: 55, yes: 100 } },
      { q: 'stinging', w: 2, map: { never: 0, sometimes: 40, often: 75, almost_always: 100 } },
      { q: 'tight_day', w: 1.5, map: { never: 0, sometimes: 35, often: 70, always: 95 } },
      { q: 'flaking', w: 1.5, map: { never: 0, winter: 30, often: 65, always: 90 } },
      { q: 'active_tolerance', w: 1, map: { fine: 0, mild: 30, strong: 90 } },
      { derived: 'overExfoliation', w: 2 }
    ],
    redness: [
      { q: 'redness_freq', w: 2, map: { never: 0, triggers: 35, frequent: 70, permanent: 90 } },
      { concern: 'redness', w: 2, wAbsent: 0.5 }
    ],
    acne: [
      { concern: 'acne', w: 3, wAbsent: 0 },
      { q: 'acne_type', w: 3, map: { comedonal: 30, papular: 65, nodular: 100 } },
      { detail: ['acne', 'frequency'], w: 2, map: { 1: 30, 2: 60, 3: 90 } },
      { concern: 'blackheads', w: 1, wAbsent: 0 }
    ]
  };
  const AGE_FACTOR = { u18: 0, '18_24': 5, '25_34': 20, '35_44': 45, '45_54': 70, '55p': 85 };
  const SEV_PTS = { 1: 35, 2: 65, 3: 90 };
  const DUR_MULT = { 1: 0.85, 2: 1.0, 3: 1.1 };
  const SAFE_DEFAULT = { sebum: 50, dehydration: 45, sensitivity: 60, barrierRisk: 40, redness: 30, acne: 0 };
  const MIN_CONFIDENCE = 0.4;

  const clamp = (x, a = 0, b = 100) => Math.max(a, Math.min(b, x));
  const r0 = x => Math.round(x);
  const has = (arr, v) => Array.isArray(arr) && arr.includes(v);

  function concernIntensity(a, cid) {
    if (!has(a.concerns, cid)) return 0;
    const d = (a.concernDetails || {})[cid] || {};
    const sev = SEV_PTS[d.severity] ?? 60;
    const mult = DUR_MULT[d.duration] ?? 1.0;
    return clamp(sev * mult);
  }
  function dominant(values) {
    const v = values.filter(x => x > 0).sort((x, y) => y - x);
    if (!v.length) return 0;
    return clamp(v[0] + 0.15 * v.slice(1).reduce((s, x) => s + x, 0));
  }

  function overExfoliation(a) {
    const cp = a.current_products || [];
    const n = ['aha', 'bha', 'scrub', 'retinol', 'bpo'].filter(x => cp.includes(x)).length + (has(a.medical, 'rx_topical') ? 1 : 0);
    let v = n === 0 ? 0 : n === 1 ? 15 : n === 2 ? 55 : 90;
    if (cp.includes('scrub') && (cp.includes('aha') || cp.includes('bha'))) v += 20;
    return clamp(v);
  }

  function weighted(param, a) {
    let num = 0, den = 0, total = 0;
    const trace = [];
    for (const it of MATRIX[param]) {
      let val = null, w = it.w;
      if (it.q) {
        if (a._asked && !a._asked.includes(it.q)) continue;
        total += it.w;
        const ans = a[it.q];
        if (ans !== undefined && ans !== null && it.map[ans] !== undefined) val = it.map[ans];
      } else if (it.concern) {
        total += it.w;
        if (a.concerns === undefined) val = null;
        else if (has(a.concerns, it.concern)) val = concernIntensity(a, it.concern);
        else { val = 0; w = it.wAbsent; }
      } else if (it.detail) {
        const [cid, key] = it.detail;
        if (!has(a.concerns, cid)) continue;
        if (a._asked && !a._asked.includes('detail.' + key)) continue;
        total += it.w;
        const d = (a.concernDetails || {})[cid] || {};
        if (d[key] !== undefined) val = it.map[d[key]];
      } else if (it.derived === 'overExfoliation') {
        total += it.w;
        if (a.current_products !== undefined) val = overExfoliation(a);
      }
      if (val !== null && w > 0) { num += w * val; den += w; trace.push({ src: it.q || it.concern || it.derived || it.detail.join('.'), w, val }); }
    }
    const confidence = total ? den / total : 0;
    const value = den ? num / den : null;
    return { value, confidence, trace };
  }

  /* 2. NORMALISATION & CONTRADICTIONS */
  function normalize(raw) {
    const a = JSON.parse(JSON.stringify(raw || {}));
    a.concerns = Array.isArray(a.concerns) ? [...new Set(a.concerns)].sort() : a.concerns;
    a.medical = Array.isArray(a.medical) ? a.medical.filter(x => x !== 'none') : (a.medical ? [a.medical] : []);
    if (Array.isArray(a.current_products)) {
      if (a.current_products.includes('makeup_daily')) a.makeup = 'daily';
      a.current_products = a.current_products.filter(x => x !== 'none' && x !== 'makeup_daily');
    }
    a.concernDetails = a.concernDetails || {};
    const notes = [];

    const cp = a.current_products || [];
    if (a.active_experience === 'never' && ['aha', 'bha', 'retinol', 'vitc', 'azelaic', 'bpo'].some(x => cp.includes(x))) {
      notes.push({ code: 'C_EXP', msg: 'Vous indiquez ne jamais avoir utilisé d\'actifs, mais votre routine actuelle en contient : nous nous fions à la liste de produits.' });
      a.active_experience = 'occasional';
    }
    if (a.active_tolerance === 'untried' && (a.active_experience === 'regular_ok' || a.active_experience === 'regular_bad')) {
      a.active_tolerance = a.active_experience === 'regular_ok' ? 'fine' : 'strong';
      notes.push({ code: 'C_TOL', msg: 'Tolérance aux actifs déduite de votre expérience déclarée.' });
    }
    if (a.active_experience === 'regular_bad' && a.active_tolerance === 'fine') {
      a.active_tolerance = 'mild';
      notes.push({ code: 'C_TOL2', msg: 'Réponses divergentes sur la tolérance aux actifs : nous retenons la plus prudente.' });
    }
    let typeConflict = false;
    if (a.after_cleanse === 'shiny_all' && a.midday_shine === 'none') typeConflict = true;
    if (a.midday_shine === 'all' && a.cheeks === 'dry') typeConflict = true;
    if (a.after_cleanse === 'tight_all' && a.cheeks === 'oily') typeConflict = true;
    if (typeConflict) notes.push({ code: 'C_TYPE', msg: 'Certaines réponses sur le sébum se contredisent : votre type de peau est indiqué « à confirmer » et la routine reste volontairement douce.' });
    return { a, notes, typeConflict };
  }

  /* 3. SCORES */
  function computeScores(a) {
    const out = {}, conf = {}, traces = {};
    for (const p of ['sebum', 'dehydration', 'sensitivity', 'barrierRisk', 'redness', 'acne']) {
      const r = weighted(p, a);
      conf[p] = r.confidence; traces[p] = r.trace;
      out[p] = (r.value === null || r.confidence < MIN_CONFIDENCE) ? null : r.value;
    }
    if (out.acne === null) out.acne = has(a.concerns, 'blackheads') ? 0.35 * concernIntensity(a, 'blackheads') : 0;
    else if (!has(a.concerns, 'acne')) out.acne = 0.35 * concernIntensity(a, 'blackheads');

    if (has(a.medical, 'eczema') || has(a.medical, 'rosacea')) {
      out.sensitivity = Math.max(out.sensitivity ?? 0, 70);
      out.barrierRisk = Math.max(out.barrierRisk ?? 0, 55);
    }
    const ci = c => concernIntensity(a, c);
    const flakeV = { never: 0, winter: 30, often: 65, always: 90 }[a.flaking] ?? 0;
    out.pigmentation = dominant([ci('hyperpigmentation'), ci('post_acne_marks'), ci('uneven_tone')]);
    const agingConcern = dominant([ci('fine_lines'), ci('firmness'), 0.6 * ci('under_eye')]);
    const ageF = AGE_FACTOR[a.age] ?? 20;
    out.aging = clamp(0.75 * agingConcern + 0.25 * ageF + (a.smoking === 'yes' ? 5 : 0) + (a.sun_exposure === 'high' ? 5 : 0));
    out.texture = clamp(0.8 * dominant([ci('texture'), 0.8 * ci('pores'), 0.7 * ci('blackheads')]) + 0.2 * flakeV);
    const rf = { never: 0, triggers: 35, frequent: 70, permanent: 90 }[a.redness_freq];
    const rc = ci('redness');
    out.redness = rf === undefined && !rc ? 0 : clamp(Math.max(rf ?? 0, rc) + 0.15 * Math.min(rf ?? 0, rc));
    const dull = dominant([ci('dullness'), 0.6 * ci('uneven_tone')]);
    const lifeDrag = avg([{ good: 0, average: 40, poor: 80 }[a.sleep], { yes: 80, no: 0 }[a.smoking], { low: 0, mid: 35, high: 70 }[a.stress]]);
    const radiance = clamp(100 - (0.8 * dull + 0.2 * (lifeDrag ?? 0)));
    const sunV = { low: 20, mid: 55, high: 90 }[a.sun_exposure] ?? 55;
    const spfF = { never: 1, sometimes: 0.8, daily: 0.45, daily_reapply: 0.25 }[a.spf_habit] ?? 0.8;
    out.uvRisk = clamp(sunV * spfF + (a.climate === 'hot_dry' ? 10 : 0));

    const eff = {};
    for (const k of Object.keys(SAFE_DEFAULT)) eff[k] = out[k] ?? SAFE_DEFAULT[k];
    const hydration = 100 - eff.dehydration;
    const barrier = 100 - eff.barrierRisk;
    const sebumDev = Math.abs(eff.sebum - 50) * 2;
    const overall = clamp(100 - wavg([[sebumDev, 1], [100 - hydration, 1.5], [eff.sensitivity, 1.5], [100 - barrier, 2], [eff.acne, 1.5],
      [out.pigmentation, 1], [out.texture, 1], [out.redness, 1], [out.aging, 0.5], [100 - radiance, 0.5]]));

    const scores = {
      sebum: rs(out.sebum), hydration: out.dehydration === null ? null : r0(100 - out.dehydration),
      sensitivity: rs(out.sensitivity), barrier: out.barrierRisk === null ? null : r0(100 - out.barrierRisk), barrierRisk: rs(out.barrierRisk),
      acne: r0(eff.acne), pigmentation: r0(out.pigmentation), aging: r0(out.aging), texture: r0(out.texture),
      redness: r0(out.redness), radiance: r0(radiance), uvRisk: r0(out.uvRisk), overall: r0(overall)
    };
    const effective = { sebum: eff.sebum, hydration, sensitivity: eff.sensitivity, barrier, acne: eff.acne,
      pigmentation: out.pigmentation, aging: out.aging, texture: out.texture, redness: out.redness, radiance, uvRisk: out.uvRisk };
    return { scores, effective, confidence: conf, traces };
  }
  function rs(x) { return x === null || x === undefined ? null : r0(x); }
  function avg(xs) { const v = xs.filter(x => x !== undefined && x !== null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; }
  function wavg(pairs) { let n = 0, d = 0; for (const [v, w] of pairs) { if (v === null || v === undefined) continue; n += v * w; d += w; } return d ? n / d : 0; }

  function level(v) { return v === null ? 'inconnu' : v < 34 ? 'faible' : v < 67 ? 'modéré' : 'élevé'; }

  /* 4. PROFIL */
  const CHEEKS_FROM_CLEANSE = { tight_all: 'dry', tight_cheeks: 'dry', comfortable: 'normal', shiny_t: 'normal', shiny_all: 'oily' };
  function computeProfile(a, eff, typeConflict, scores) {
    const cheeks = a.cheeks ?? CHEEKS_FROM_CLEANSE[a.after_cleanse];
    const tSignal = a.midday_shine === 't_zone' || a.after_cleanse === 'shiny_t' || (a.after_cleanse === 'tight_cheeks' && a.midday_shine && a.midday_shine !== 'none') || (a.pores_visibility === 't_zone' && cheeks === 'dry');
    let type;
    if (scores.sebum === null) type = 'normal';
    else if (tSignal && cheeks && cheeks !== 'oily' && eff.sebum >= 38) type = 'combination';
    else if (eff.sebum >= 62) type = 'oily';
    else if (eff.sebum <= 32) type = 'dry';
    else type = 'normal';

    const conditions = [];
    if (scores.hydration !== null && eff.hydration < 50) conditions.push('dehydrated');
    if (scores.sensitivity !== null) { if (eff.sensitivity >= 70) conditions.push('very_sensitive'); else if (eff.sensitivity >= 45) conditions.push('sensitive'); }
    if (scores.barrier !== null && eff.barrier < 50) conditions.push('barrier_compromised');
    if (eff.acne >= 34) conditions.push('blemish_prone');
    if (eff.redness >= 50) conditions.push('redness_prone');

    const flags = [];
    const med = a.medical || [];
    if (med.length) flags.push('medical_followup');
    if (a.acne_type === 'nodular') flags.push('refer_dermatologist');
    if (a.pregnancy === 'yes') flags.push('pregnancy');
    if (a.pregnancy === 'na' && a.gender !== 'm') flags.push('pregnancy_unknown');
    if (a.age === 'u18') flags.push('minor');
    if (a.age === undefined) flags.push('age_unknown');
    if (has(a.current_products, 'scrub')) flags.push('uses_scrub');
    if (overExfoliation(a) >= 55) flags.push('over_exfoliation');

    let tier;
    const sens = eff.sensitivity, bar = eff.barrier;
    if (bar < 40 || a.current_irritation === 'yes' || ['isotretinoin', 'rx_topical', 'eczema', 'rosacea', 'other'].some(m => med.includes(m))) tier = 0;
    else if (sens >= 60 || bar < 55 || overExfoliation(a) >= 55 || a.active_tolerance === 'strong' || a.active_experience === 'regular_bad' || a.current_irritation === 'slightly' || a.acne_type === 'nodular' || typeConflict) tier = 1;
    else if (a.active_experience === 'regular_ok' && sens < 35 && bar >= 70 && a.active_tolerance === 'fine') tier = 3;
    else tier = 2;

    return { type, typeConfidence: typeConflict || scores.sebum === null ? 'low' : 'ok', conditions, flags, tier };
  }

  const TIERS = {
    0: { name: 'Apaiser d\'abord', maxActive: 0, exf: null, ret: null, minRest: 7 },
    1: { name: 'Douceur', maxActive: 1, exf: { start: 1, cap: 2 }, ret: { start: 1, cap: 3 }, minRest: 3 },
    2: { name: 'Progressive', maxActive: 2, exf: { start: 2, cap: 3 }, ret: { start: 2, cap: 4 }, minRest: 2 },
    3: { name: 'Confirmée', maxActive: 2, exf: { start: 2, cap: 3 }, ret: { start: 3, cap: 5 }, minRest: 1 }
  };

  /* 5. PRIORISATION DES PRÉOCCUPATIONS */
  const CONCERN_LABEL = { acne: 'Imperfections', blackheads: 'Points noirs et pores obstrués', sebum: 'Excès de sébum', post_acne_marks: 'Marques post-boutons',
    hyperpigmentation: 'Taches pigmentaires', uneven_tone: 'Teint irrégulier', dullness: 'Manque d\'éclat', fine_lines: 'Ridules et rides', firmness: 'Perte de fermeté',
    dehydration: 'Déshydratation', dryness: 'Sécheresse', redness: 'Rougeurs', pores: 'Pores visibles', texture: 'Grain de peau irrégulier', under_eye: 'Contour des yeux', barrier: 'Barrière cutanée fragilisée' };

  function prioritize(a, eff, profile) {
    const list = [];
    const add = (id, intensity, source) => { const e = list.find(x => x.id === id); if (e) { e.intensity = Math.max(e.intensity, intensity); if (source === 'declared') e.source = 'declared'; } else list.push({ id, intensity, source }); };
    for (const c of a.concerns || []) add(c, concernIntensity(a, c), 'declared');
    const dry = list.find(x => x.id === 'dryness');
    if (dry && profile.type === 'oily') { list.splice(list.indexOf(dry), 1); add('dehydration', dry.intensity, 'declared'); }
    if (eff.hydration < 50) add('dehydration', 100 - eff.hydration, 'detected');
    if (eff.redness >= 50) add('redness', eff.redness, 'detected');
    if (profile.type === 'oily' && eff.sebum >= 75 && !list.find(x => x.id === 'sebum')) add('sebum', eff.sebum - 10, 'detected');
    for (const e of list) {
      let p = e.intensity * (e.source === 'declared' ? 1 : 0.85);
      if (a.priority === e.id) p += 25;
      e.priority = r0(p);
    }
    if (eff.barrier < 55) list.push({ id: 'barrier', intensity: r0(100 - eff.barrier), source: 'detected', priority: 999 });
    list.sort((x, y) => y.priority - x.priority || x.id.localeCompare(y.id));
    list.forEach(e => e.label = CONCERN_LABEL[e.id] || e.id);
    return list;
  }

  /* 6. ÉLIGIBILITÉ & CLASSEMENT PRODUITS */
  function relevance(p, cid) {
    if (p.targets.primary.includes(cid)) return 1;
    if (p.targets.secondary.includes(cid)) return 0.5;
    return 0;
  }
  function productScore(p, prio, profile, eff) {
    let s = 0; const why = [];
    for (const c of prio) {
      if (c.id === 'barrier') continue;
      const r = relevance(p, c.id);
      if (r > 0) { s += Math.min(c.priority, 125) * r; if (r === 1 || c.priority >= 60) why.push(c.id); }
    }
    const fit = p.skinTypes.includes(profile.type) ? 1 : 0.6;
    s = s * fit - p.irritationPotential * (eff.sensitivity / 100) * 20;
    return { score: r0(s), why };
  }

  function eligibility(p, a, profile, eff) {
    const ex = (reason) => ({ ok: false, reason });
    const t = profile.tier, med = a.medical || [], cp = a.current_products || [];
    const ageKnown = a.age !== undefined, under25 = ['u18', '18_24'].includes(a.age);
    const pregBlock = a.pregnancy === 'yes' || (a.pregnancy === 'na' && a.gender !== 'm') || (a.pregnancy === undefined && a.gender === 'f');
    switch (p.activeClass) {
      case 'bha':
        if (t === 0) return ex('Peau à apaiser d\'abord : pas d\'exfoliant pour le moment.');
        if (a.pregnancy === 'yes') return ex('Grossesse / allaitement : acide salicylique sans rinçage déconseillé, demandez l\'avis de votre médecin.');
        if (t === 1 && eff.sensitivity >= 70) return ex('Peau très réactive : exfoliant reporté.');
        if (t === 1 && Math.max(concernIntensity(a, 'acne'), concernIntensity(a, 'blackheads')) < 50) return ex('Peau sensible et imperfections légères : bénéfice insuffisant face au risque d\'irritation.');
        if (profile.type === 'dry' && t < 2) return ex('Peau sèche et sensible : acide salicylique non prioritaire.');
        return { ok: true };
      case 'aha':
        if (t === 0) return ex('Peau à apaiser d\'abord : pas d\'exfoliant pour le moment.');
        if (a.age === 'u18') return ex('Moins de 18 ans : pas d\'acide glycolique.');
        if (eff.sensitivity >= 60 || t === 1) return ex('Sensibilité : l\'acide glycolique 7 % est le produit le plus irritant de la gamme.');
        if (profile.type === 'oily' && t < 3) return ex('Peau grasse : l\'acide salicylique est plus adapté.');
        return { ok: true };
      case 'retinoid':
      case 'retinoid_eye':
        if (t === 0) return ex('Peau à apaiser d\'abord : rétinol reporté.');
        if (pregBlock) return ex(a.pregnancy === 'yes' ? 'Grossesse / allaitement : rétinol contre-indiqué.' : 'Rétinol non proposé sans confirmation que vous n\'êtes ni enceinte ni allaitante.');
        if (!ageKnown) return ex('Âge non renseigné : rétinol non proposé.');
        if (under25) return ex('Avant 25 ans : le rétinol n\'est pas une priorité dans la gamme AVURE.');
        if (eff.sensitivity >= 70) return ex('Peau très réactive : rétinol déconseillé pour le moment.');
        if (eff.barrier < 55) return ex('Barrière fragilisée : rétinol reporté.');
        if (p.activeClass === 'retinoid') {
          const agingDeclared = has(a.concerns, 'fine_lines') || has(a.concerns, 'firmness');
          const matureTexture = eff.texture >= 50 && ['35_44', '45_54', '55p'].includes(a.age) && t >= 2;
          if (!(agingDeclared && eff.aging >= 34) && !matureTexture) return ex('Pas de préoccupation liée à l\'âge suffisante pour justifier le rétinol.');
        }
        if (p.activeClass === 'retinoid_eye' && !has(a.concerns, 'under_eye')) return ex('Contour des yeux non sélectionné.');
        return { ok: true };
      case 'vitc':
        if (t === 0) return ex('Peau à apaiser d\'abord.');
        if (eff.sensitivity >= 75) return ex('Peau très réactive : vitamine C reportée.');
        return { ok: true };
      case 'azelaic':
      case 'niacinamide':
        if (t === 0) return ex('Peau à apaiser d\'abord : actifs reportés.');
        return { ok: true };
      default: return { ok: true };
    }
  }

  /* 7. CONSTRUCTION DE LA ROUTINE */
  const BUDGET = { minimal: 3, balanced: 4, complete: 5 };
  const ACTIVE_CLASSES = ['bha', 'aha', 'retinoid', 'vitc', 'azelaic', 'niacinamide'];
  const MIN_ACTIVE_SCORE = 30;

  function buildRoutine(a, profile, eff, prio, catalog) {
    const P = Object.fromEntries(catalog.products.map(p => [p.id, p]));
    const tier = TIERS[profile.tier];
    const pref = a.routine_pref || 'balanced';
    const budget = BUDGET[pref];
    const cp = a.current_products || [];
    const reasons = {}, excluded = [], notes = [];
    const why = (id, txt) => { const r = (reasons[id] = reasons[id] || []); if (!r.includes(txt)) r.push(txt); };

    const ranked = [];
    for (const p of catalog.products) {
      if (!ACTIVE_CLASSES.includes(p.activeClass) && p.activeClass !== 'retinoid_eye') continue;
      const el = eligibility(p, a, profile, eff);
      const sc = productScore(p, prio, profile, eff);
      if (!el.ok) { if (sc.score > 0) excluded.push({ id: p.id, name: p.name, reason: el.reason }); continue; }
      if (sc.score < MIN_ACTIVE_SCORE) continue;
      ranked.push({ id: p.id, cls: p.activeClass, score: sc.score, why: sc.why });
    }
    ranked.sort((x, y) => y.score - x.score || x.id.localeCompare(y.id));
    const best = cls => ranked.find(r => cls.includes(r.cls));

    const MIN_GAIN = 25;
    const concernsForCover = prio.filter(c => c.id !== 'barrier');
    const coverage = {};
    const gain = r => {
      let g = 0;
      for (const c of concernsForCover) g += Math.min(c.priority, 125) * Math.max(0, relevance(P[r.id], c.id) - (coverage[c.id] || 0));
      return g * (P[r.id].skinTypes.includes(profile.type) ? 1 : 0.6) - P[r.id].irritationPotential * (eff.sensitivity / 100) * 20;
    };
    let strongSlots = pref === 'minimal' ? Math.min(1, tier.maxActive) : tier.maxActive + (profile.tier >= 2 && pref === 'complete' ? 1 : 0);
    let supportSlots = pref === 'minimal' || profile.tier === 0 ? 0 : 1;
    const chosen = [];
    const isExf = c => c === 'bha' || c === 'aha';
    let pool = ranked.filter(r => r.cls !== 'retinoid_eye');
    while (pool.length) {
      const scored = pool.map(r => ({ r, g: gain(r) })).sort((x, y) => y.g - x.g || P[x.r.id].irritationPotential - P[y.r.id].irritationPotential || x.r.id.localeCompare(y.r.id));
      const { r, g } = scored[0];
      pool = pool.filter(x => x.id !== r.id);
      if (g < MIN_GAIN) break;
      if (isExf(r.cls)) {
        const has1 = chosen.some(c => isExf(c.cls));
        if (has1 && !(profile.tier === 3 && pref === 'complete' && profile.type === 'combination')) continue;
        if (pref === 'minimal' && g < 90) continue;
      }
      if (r.cls === 'retinoid' && chosen.some(c => isExf(c.cls)) && profile.tier < 2) continue;
      if (r.cls === 'niacinamide' && supportSlots > 0) supportSlots--;
      else if (strongSlots > 0) strongSlots--;
      else continue;
      chosen.push({ ...r, gain: r0(g) });
      for (const c of concernsForCover) coverage[c.id] = Math.max(coverage[c.id] || 0, relevance(P[r.id], c.id));
    }
    const exfs = chosen.filter(c => isExf(c.cls));
    let exfoliant = exfs[0] || null, exfoliant2 = exfs[1] || null;
    let retinol = chosen.find(c => c.cls === 'retinoid') || null;
    let amActive = null, pmActive = null;
    for (const c of chosen) {
      if (c.cls === 'vitc') amActive = c;
    }
    for (const c of chosen) {
      if (c.cls === 'azelaic') { if (!pmActive) pmActive = c; else if (!amActive) amActive = c; }
    }
    for (const c of chosen) {
      if (c.cls !== 'niacinamide') continue;
      if (!amActive && eff.sensitivity < 50) amActive = c; else if (!pmActive) pmActive = c; else if (!amActive) amActive = c;
    }
    const used = new Set(chosen.map(c => c.id));
    if (amActive && !pmActive && !retinol && ['niacinamide', 'azelaic'].includes(amActive.cls) && profile.tier >= 2 && pref !== 'minimal') pmActive = amActive;
    if (pmActive && !amActive && pmActive.cls === 'niacinamide' && profile.tier >= 2 && pref !== 'minimal' && eff.sensitivity < 50) amActive = pmActive;
    if (amActive && amActive.cls === 'niacinamide' && eff.sensitivity >= 50 && !pmActive) { pmActive = amActive; amActive = null; notes.push('Niacinamide placé le soir : votre crème solaire en contient déjà, inutile de cumuler le matin sur peau sensible.'); }

    const eye = ranked.find(r => r.cls === 'retinoid_eye' && has(a.concerns, 'under_eye')) || null;

    const needCreamPM = profile.tier === 0 || profile.type === 'dry' || eff.hydration < 60 || eff.barrier < 70 || retinol || exfoliant || eff.sensitivity >= 50 || profile.type !== 'oily';
    const creamAM = !(profile.type === 'oily' && eff.hydration >= 55 && eff.sensitivity < 50 && pref === 'minimal');
    const haNeed = 100 - eff.hydration;
    let haAM = haNeed >= 55, haPM = haNeed >= 45;
    if (profile.tier === 0) { haPM = true; }
    if (pref === 'minimal') { haAM = false; haPM = haPM && haNeed >= 65 && !pmActive && !retinol && !exfoliant; }

    const doubleCleanse = a.makeup === 'daily' || (pref !== 'minimal' && (a.makeup === 'sometimes' || a.spf_habit === 'daily_reapply' || (profile.type === 'dry' && pref === 'complete')));
    const stick = a.sun_exposure === 'high' || (a.sun_exposure === 'mid' && (eff.pigmentation >= 50 || !!exfoliant || !!retinol || !!amActive && amActive.cls === 'vitc'));

    const AM = [], PM = [];
    const step = (list, id, extra = {}) => list.push({ id, name: P[id].name, step: P[id].step, ...extra });
    step(AM, 'gel_cleanser', { role: 'Nettoyer' });
    if (amActive) step(AM, amActive.id, { role: 'Traiter' });
    if (haAM) step(AM, 'ha_2', { role: 'Hydrater (sérum)' });
    if (creamAM) step(AM, 'day_cream', { role: 'Hydrater' });
    step(AM, 'spf_gelcream', { role: 'Protéger' });

    if (doubleCleanse) step(PM, 'oil_cleanser', { role: 'Démaquiller (1er nettoyage)', addon: true });
    step(PM, 'gel_cleanser', { role: doubleCleanse ? 'Nettoyer (2e nettoyage)' : 'Nettoyer' });
    if (exfoliant) step(PM, exfoliant.id, { role: 'Exfolier', nightsOnly: true });
    if (exfoliant2) step(PM, exfoliant2.id, { role: 'Exfolier (en alternance)', nightsOnly: true });
    if (retinol) step(PM, retinol.id, { role: 'Traiter', nightsOnly: true });
    if (pmActive) step(PM, pmActive.id, { role: 'Traiter', nightsOnly: !!(exfoliant || retinol) });
    if (eye) step(PM, eye.id, { role: 'Contour des yeux', addon: pref !== 'complete', nightsOnly: true });
    if (haPM) step(PM, 'ha_2', { role: 'Hydrater (sérum)' });
    const pmCreamOptional = !needCreamPM;
    step(PM, 'day_cream', { role: 'Hydrater', optional: pmCreamOptional });

    const trim = (list, label) => {
      const count = () => list.filter(s => !s.addon && !s.optional && !s.nightsOnly).length + (list.some(s => s.nightsOnly) ? 1 : 0);
      const dropOrder = ['ha_2', 'eye_contour'];
      while (count() > budget) {
        const creamDroppable = label === 'AM' && profile.type !== 'dry' && eff.hydration >= 50 && eff.barrier >= 60;
        const victim = dropOrder.map(id => list.find(s => s.id === id && !s.addon)).find(Boolean)
          || (creamDroppable ? list.find(s => s.id === 'day_cream') : null)
          || (label === 'AM' ? list.find(s => s.id === (amActive && amActive.id)) : null);
        if (victim && victim.id === 'day_cream') notes.push('Routine essentielle : le matin, le gel-crème SPF50+ (hydratant) remplace la crème de jour.');
        if (victim && label === 'AM' && victim.id === (amActive && amActive.id)) notes.push(`Routine essentielle : ${P[victim.id].name} retiré pour rester à ${budget} étapes. Passez à une routine équilibrée pour l'ajouter.`);
        if (!victim) break;
        list.splice(list.indexOf(victim), 1);
        if (victim.id === 'ha_2') { haAM = label === 'AM' ? false : haAM; haPM = label === 'PM' ? false : haPM; }
        if (victim.id === (amActive && amActive.id) && label === 'AM') amActive = null;
      }
    };
    trim(AM, 'AM'); trim(PM, 'PM');

    const alreadyBha = cp.includes('bha'), alreadyAha = cp.includes('aha'), alreadyRet = cp.includes('retinol');
    const freq = {};
    if (exfoliant) {
      const already = (exfoliant.cls === 'bha' && alreadyBha) || (exfoliant.cls === 'aha' && alreadyAha);
      let st = tier.exf.start;
      if (profile.typeConfidence === 'low' || (retinol && profile.tier <= 2)) st = Math.min(st, 1);
      freq[exfoliant.id] = { start: st, cap: retinol ? Math.min(tier.exf.cap, 2) : tier.exf.cap, already };
      if (exfoliant2) { freq[exfoliant.id].start = 1; freq[exfoliant2.id] = { start: 1, cap: 1, already: false }; }
    }
    if (retinol) {
      let st = tier.ret.start;
      if (alreadyRet && a.active_tolerance === 'fine') st = Math.max(st, 3);
      freq[retinol.id] = { start: st, cap: tier.ret.cap, already: alreadyRet };
    }
    if (eye) freq[eye.id] = { start: retinol ? freq[retinol.id].start : Math.min(tier.ret.start, 2), cap: 7, already: false };
    if (pmActive && pmActive.cls === 'azelaic' && eff.sensitivity >= 60) freq[pmActive.id] = { start: 3, cap: 7, already: cp.includes('azelaic'), everyOther: true };

    const schedule = buildSchedule({ exfoliant, exfoliant2, retinol, eye, pmActive, freq, tier, profile, eff, P });
    const progression = buildProgression({ profile, tier, amActive, pmActive, exfoliant, exfoliant2, retinol, eye, freq, cp, a, haAM, haPM, P });

    const topIds = prio.slice(0, 3).map(c => c.id);
    why('gel_cleanser', 'Nettoyage quotidien doux, sans dessécher : base de toute routine.');
    if (eff.sensitivity >= 70) why('gel_cleanser', 'Contient 2 % d\'huile d\'arbre à thé : faites un test sur une petite zone pendant 48 h avant la première utilisation.');
    if (doubleCleanse) why('oil_cleanser', a.makeup === 'daily' ? 'Vous vous maquillez tous les jours : l\'huile dissout maquillage et SPF sans frotter.' : 'Le soir, élimine la protection solaire en douceur avant le gel nettoyant.');
    for (const r of [...new Set([amActive, pmActive, exfoliant, exfoliant2, retinol, eye].filter(Boolean))]) {
      const targets = r.why.slice(0, 3).map(c => (CONCERN_LABEL[c] || c).toLowerCase());
      why(r.id, `Sélectionné pour : ${targets.join(', ')}.`);
    }
    if (exfoliant && exfoliant.cls === 'bha') why(exfoliant.id, 'Liposoluble, il agit dans le pore : adapté aux points noirs et à la peau à tendance grasse.');
    if (exfoliant && exfoliant.cls === 'aha') why(exfoliant.id, 'Exfolie la surface pour lisser le grain et raviver l\'éclat.');
    if (retinol) why(retinol.id, 'Introduit progressivement, jamais le même soir que l\'exfoliant.');
    if (pmActive && pmActive.cls === 'azelaic' && eff.sensitivity >= 45) why(pmActive.id, 'L\'actif « correcteur » le mieux toléré de la gamme sur peau sensible.');
    if (haAM || haPM) why('ha_2', `Hydratation estimée à ${r0(eff.hydration)}/100 : l'acide hyaluronique comble le manque d'eau, la crème le scelle.`);
    why('day_cream', profile.type === 'oily' ? 'Même une peau grasse a besoin d\'eau : texture légère qui limite la perte hydrique.' : 'Hydrate, apaise et renforce la barrière (acide hyaluronique, ectoïne, bêta-glucane).');
    if (pmCreamOptional) why('day_cream', 'Le soir : facultative si votre peau ne tire pas.');
    why('spf_gelcream', exfoliant || retinol || amActive ? 'Indispensable avec des actifs : ils rendent la peau plus sensible au soleil et les taches réapparaissent sans protection.' : 'La protection quotidienne est le geste le plus efficace contre le vieillissement visible et les taches.');
    if (stick) why('spf_stick', a.sun_exposure === 'high' ? 'Plus de 2 h au soleil par jour : réappliquer toutes les 2 heures sans retoucher le maquillage.' : 'Pour réappliquer en journée : votre routine contient des actifs photosensibilisants ou cible des taches.');
    if (cp.includes('scrub')) notes.push('Arrêtez le gommage à grains : il fait double emploi avec l\'exfoliant et fragilise la barrière.');
    if ((exfoliant && exfoliant.cls === 'bha' && alreadyBha) || (exfoliant && exfoliant.cls === 'aha' && alreadyAha)) notes.push('Votre exfoliant AVURE remplace celui que vous utilisez : ne les cumulez pas.');
    if (exfoliant && ((exfoliant.cls === 'bha' && alreadyAha) || (exfoliant.cls === 'aha' && alreadyBha))) notes.push('Arrêtez votre exfoliant actuel : un seul acide exfoliant à la fois dans cette routine.');
    if (retinol && alreadyRet) notes.push('Le rétinol AVURE remplace votre rétinol actuel. Gardez votre fréquence actuelle si elle est bien tolérée.');
    if (!retinol && alreadyRet && profile.tier <= 1) notes.push('Mettez votre rétinol actuel en pause le temps que votre peau se rééquilibre.');
    if (cp.includes('bpo')) notes.push('Peroxyde de benzoyle : ne l\'appliquez pas le même soir que l\'exfoliant ou le rétinol.');

    const conflicts = validateSchedule(schedule, catalog, eff);

    const products = [...new Set([...AM, ...PM].map(s => s.id).concat(stick ? ['spf_stick'] : []))];
    return { AM, PM, stick, schedule, progression, freq, reasons, excluded, notes, conflicts, products, ranked };
  }

  function buildSchedule({ exfoliant, exfoliant2, retinol, eye, pmActive, freq, tier, profile, eff, P }) {
    const nights = DAYS.map(d => ({ day: d, items: [], strong: false }));
    const EXF_PATTERN = { 1: [4], 2: [1, 4], 3: [0, 2, 4] };
    const RET_ORDER = [0, 3, 5, 2, 6, 1, 4];
    if (exfoliant) {
      const f = freq[exfoliant.id].start;
      let idx = EXF_PATTERN[Math.min(f, 3)];
      if (exfoliant2) idx = [1];
      idx.forEach(i => { nights[i].items.push(exfoliant.id); nights[i].strong = true; });
      if (exfoliant2) { nights[4].items.push(exfoliant2.id); nights[4].strong = true; }
    }
    if (retinol) {
      let n = freq[retinol.id].start;
      for (const i of RET_ORDER) {
        if (n <= 0) break;
        if (nights[i].strong) continue;
        if (profile.tier <= 1) { const prev = nights[(i + 6) % 7], next = nights[(i + 1) % 7]; if (prev.strong || next.strong) continue; }
        nights[i].items.push(retinol.id); nights[i].strong = true; n--;
      }
    }
    if (eye) {
      let n = freq[eye.id].start;
      const retNights = nights.filter(x => retinol && x.items.includes(retinol.id));
      const order = retNights.length ? retNights.map(x => nights.indexOf(x)) : RET_ORDER.filter(i => !nights[i].strong);
      for (const i of order) { if (n-- <= 0) break; nights[i].items.push(eye.id); }
    }
    if (pmActive) {
      const sensitiveAz = pmActive.cls === 'azelaic' && eff.sensitivity >= 60;
      let count = 0;
      const maxStrongNights = 7 - tier.minRest;
      for (let i = 0; i < 7; i++) {
        const n = nights[i];
        if (n.strong && pmActive.cls !== 'niacinamide') continue;
        if (n.items.includes(pmActive.id)) continue;
        if (pmActive.cls === 'azelaic') {
          const strongCount = nights.filter(x => x.strong).length;
          if (sensitiveAz && i % 2 === 1) continue;
          if (strongCount >= maxStrongNights) continue;
          n.items.push(pmActive.id); n.strong = true; count++;
        } else {
          if (n.items.some(id => P[id].activeClass === 'aha') && eff.sensitivity >= 45) continue;
          n.items.push(pmActive.id);
        }
      }
    }
    nights.forEach(n => { n.rest = !n.strong; });
    return nights;
  }

  function validateSchedule(schedule, catalog, eff) {
    const out = [];
    for (const n of schedule) {
      for (const r of catalog.compatibility.rules) {
        if (r.b === '*' || r.same_night === 'ok') continue;
        if (n.items.includes(r.a) && n.items.includes(r.b)) {
          if (r.same_night === 'never' || (r.same_night === 'separate_if_sensitive' && eff.sensitivity >= 50)) out.push(`${n.day} : ${r.a} + ${r.b}`);
        }
      }
    }
    return out;
  }

  function buildProgression({ profile, tier, amActive, pmActive, exfoliant, exfoliant2, retinol, eye, freq, cp, a, haAM, haPM, P }) {
    const intro = {};
    intro.base = 1;
    const T = profile.tier;
    const firstActive = [pmActive, amActive].filter(Boolean).sort((x, y) => P[x.id].irritationPotential - P[y.id].irritationPotential)[0];
    if (firstActive) intro[firstActive.id] = 1;
    if (amActive && intro[amActive.id] === undefined) intro[amActive.id] = (amActive.cls === 'vitc' && T >= 2) ? 1 : 3;
    if (pmActive && intro[pmActive.id] === undefined) intro[pmActive.id] = 3;
    if (exfoliant) intro[exfoliant.id] = freq[exfoliant.id].already && T >= 2 ? 1 : 3;
    if (exfoliant2) intro[exfoliant2.id] = 5;
    if (retinol) intro[retinol.id] = (freq[retinol.id].already && a.active_tolerance === 'fine') || T === 3 ? 1 : (T === 2 && !exfoliant ? 3 : 5);
    if (eye) intro[eye.id] = retinol && intro[retinol.id] >= 5 ? 5 : 3;
    const name = id => P[id].name;
    const phases = [
      { weeks: 'Semaines 1–2', add: [], focus: '' },
      { weeks: 'Semaines 3–4', add: [], focus: '' },
      { weeks: 'Semaines 5–8', add: [], focus: '' }
    ];
    const phaseOf = w => w <= 1 ? 0 : w <= 3 ? 1 : 2;
    for (const [id, w] of Object.entries(intro)) if (id !== 'base') phases[phaseOf(w)].add.push(id);
    phases.forEach(ph => ph.add.sort());
    if (T === 0) {
      phases[0].focus = 'Apaiser : nettoyage doux, hydratation et SPF uniquement. Arrêtez tout produit qui pique.';
      phases[1].focus = 'Consolider la barrière : même routine, sans nouvel actif. La peau doit être confortable toute la journée.';
      phases[2].focus = a.medical && a.medical.length ? 'Faites le point avec votre dermatologue avant d\'ajouter un actif. Refaites le bilan AVURE ensuite.' : 'Si la peau ne tire plus et ne pique plus, refaites le bilan : un premier actif doux pourra être introduit.';
    } else {
      phases[0].focus = 'Installer les bases : nettoyer, hydrater, protéger chaque matin.' + (phases[0].add.length ? ` Commencer ${phases[0].add.map(name).join(' et ')}${T === 1 ? ' un soir sur deux' : ''}.` : '');
      phases[1].focus = phases[1].add.length ? `Introduire ${phases[1].add.map(name).join(' et ')}` + (exfoliant && phases[1].add.includes(exfoliant.id) ? ` à ${freq[exfoliant.id].start} soir(s) par semaine.` : '.') : 'Garder la même routine : la régularité compte plus que le nombre de produits.';
      const ramp = [];
      if (exfoliant && freq[exfoliant.id].cap > freq[exfoliant.id].start) ramp.push(`exfoliant jusqu'à ${freq[exfoliant.id].cap} soirs/semaine`);
      if (retinol && freq[retinol.id].cap > freq[retinol.id].start) ramp.push(`rétinol jusqu'à ${freq[retinol.id].cap} soirs/semaine`);
      phases[2].focus = (phases[2].add.length ? `Introduire ${phases[2].add.map(name).join(' et ')} à ${retinol && phases[2].add.includes(retinol.id) ? freq[retinol.id].start : 1} soir(s) par semaine. ` : '')
        + (ramp.length ? `Si aucune irritation : augmenter progressivement (${ramp.join(', ')}).` : 'Maintenir et observer : les premiers changements visibles demandent souvent plusieurs semaines.');
    }
    return { intro, phases };
  }

  /* 8. TEXTES */
  const TYPE_FR = { normal: 'Normale', dry: 'Sèche', oily: 'Grasse', combination: 'Mixte' };
  const COND_FR = { dehydrated: 'déshydratée', sensitive: 'sensible', very_sensitive: 'très réactive', barrier_compromised: 'barrière fragilisée', blemish_prone: 'à imperfections', redness_prone: 'sujette aux rougeurs' };

  function profileLabel(profile) {
    const parts = [TYPE_FR[profile.type] + (profile.typeConfidence === 'low' ? ' (à confirmer)' : '')];
    const c = profile.conditions.filter(x => x !== 'sensitive' || !profile.conditions.includes('very_sensitive')).map(x => COND_FR[x]);
    if (!c.length) return 'Peau ' + parts[0].toLowerCase();
    const last = c.pop();
    return parts[0] + ', ' + (c.length ? c.join(', ') + ' & ' : '') + last;
  }

  function explanation(profile, eff, prio, routine) {
    const s = [];
    const typeTxt = { normal: 'plutôt équilibrée', dry: 'plutôt sèche (elle produit peu de sébum)', oily: 'à tendance grasse', combination: 'mixte (zone T grasse, joues plus sèches)' }[profile.type];
    let first = `D'après vos réponses, votre peau semble ${typeTxt}`;
    if (profile.conditions.includes('dehydrated')) first += profile.type === 'oily' || profile.type === 'combination' ? ', avec un manque d\'eau malgré le sébum' : ', avec un manque d\'eau';
    if (profile.conditions.includes('very_sensitive')) first += ', et très réactive'; else if (profile.conditions.includes('sensitive')) first += ', et sensible';
    s.push(first + '.');
    if (profile.tier === 0) s.push('Votre routine se concentre d\'abord sur l\'apaisement et la barrière cutanée : aucun actif fort tant que la peau n\'est pas confortable.');
    else {
      const top = prio.filter(c => c.id !== 'barrier').slice(0, 2).map(c => c.label.toLowerCase());
      const lead = eff.barrier < 70 || eff.hydration < 50 || eff.sensitivity >= 45 ? 'privilégie l\'hydratation et le soutien de la barrière, tout en ciblant ' : 'cible en priorité ';
      if (top.length) s.push(`Votre routine AVURE ${lead}${top.join(' et ')}, de façon progressive.`);
    }
    if (routine.retinol || routine.PM.some(x => x.id === 'retinol_02')) s.push('Le rétinol est introduit par étapes et jamais le même soir que l\'exfoliant.');
    s.push('Ce bilan est une évaluation cosmétique basée sur vos réponses, pas un diagnostic médical.');
    return s.join(' ');
  }

  function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
  function stable(o) { if (Array.isArray(o)) return '[' + o.map(stable).join(',') + ']'; if (o && typeof o === 'object') return '{' + Object.keys(o).filter(k => o[k] !== undefined).sort().map(k => JSON.stringify(k) + ':' + stable(o[k])).join(',') + '}'; return JSON.stringify(o); }

  /* 9. POINT D'ENTRÉE */
  function analyze(rawAnswers, catalog) {
    const { a, notes: contradictionNotes, typeConflict } = normalize(rawAnswers);
    const sc = computeScores(a);
    const lowConf = ['sebum', 'dehydration', 'sensitivity', 'barrierRisk'].filter(k => sc.scores[k === 'dehydration' ? 'hydration' : k === 'barrierRisk' ? 'barrier' : k] === null);
    if (lowConf.length) contradictionNotes.push({ code: 'INCOMPLETE', msg: 'Questionnaire incomplet : certains scores ne peuvent pas être calculés. Nous avons appliqué des valeurs prudentes (routine douce). Complétez le bilan pour un résultat plus précis.' });
    const profile = computeProfile(a, sc.effective, typeConflict, sc.scores);
    const prio = prioritize(a, sc.effective, profile);
    const routine = buildRoutine(a, profile, sc.effective, prio, catalog);
    const P = Object.fromEntries(catalog.products.map(p => [p.id, p]));

    const medicalNotes = [];
    if (profile.flags.includes('refer_dermatologist')) medicalNotes.push('Des boutons profonds et douloureux relèvent d\'un avis dermatologique. Les soins AVURE peuvent accompagner, pas remplacer, ce suivi.');
    if (profile.flags.includes('medical_followup')) medicalNotes.push('Vous êtes suivi(e) pour votre peau : montrez cette routine à votre médecin. Nous avons volontairement exclu les actifs exfoliants et le rétinol.');
    if ((a.medical || []).includes('rosacea')) medicalNotes.push('Rosacée diagnostiquée : demandez à votre dermatologue si l\'acide azélaïque peut compléter votre traitement.');
    if (profile.flags.includes('pregnancy')) medicalNotes.push('Grossesse / allaitement : rétinol et contour des yeux au rétinol exclus. Demandez l\'avis de votre médecin avant tout nouveau soin.');
    if (profile.flags.includes('pregnancy_unknown')) medicalNotes.push('Sans réponse sur la grossesse, le rétinol n\'est pas proposé par précaution.');
    if (profile.flags.includes('minor')) medicalNotes.push('Moins de 18 ans : routine simple, sans rétinol ni acide glycolique.');

    const dash = sc.scores;
    const dashboard = [
      { key: 'hydration', label: 'Hydratation', value: dash.hydration, higherIsBetter: true },
      { key: 'sebumBalance', label: 'Équilibre du sébum', value: dash.sebum === null ? null : r0(100 - Math.abs(dash.sebum - 50) * 2), higherIsBetter: true, detail: dash.sebum === null ? '' : dash.sebum > 55 ? 'Production de sébum élevée' : dash.sebum < 45 ? 'Production de sébum faible' : 'Production équilibrée' },
      { key: 'tolerance', label: 'Tolérance', value: dash.sensitivity === null ? null : 100 - dash.sensitivity, higherIsBetter: true, detail: dash.sensitivity === null ? '' : `Sensibilité ${level(dash.sensitivity)} (${dash.sensitivity}/100)` },
      { key: 'barrier', label: 'Barrière cutanée', value: dash.barrier, higherIsBetter: true },
      { key: 'texture', label: 'Texture', value: 100 - dash.texture, higherIsBetter: true },
      { key: 'radiance', label: 'Éclat', value: dash.radiance, higherIsBetter: true }
    ];
    const concernScores = [
      { key: 'acne', label: 'Imperfections', value: dash.acne }, { key: 'pigmentation', label: 'Pigmentation', value: dash.pigmentation },
      { key: 'aging', label: 'Signes de l\'âge', value: dash.aging }, { key: 'redness', label: 'Rougeurs', value: dash.redness }, { key: 'texture', label: 'Irrégularités de texture', value: dash.texture }
    ].map(x => ({ ...x, level: level(x.value) }));

    const card = id => {
      const p = P[id];
      const f = routine.freq[id];
      let when = p.time.length === 2 ? 'Matin et soir' : p.time[0] === 'AM' ? 'Matin' : 'Soir';
      const inAM = routine.AM.some(s => s.id === id), inPM = routine.PM.some(s => s.id === id);
      if (inAM && !inPM) when = 'Matin'; if (inPM && !inAM) when = 'Soir'; if (inAM && inPM) when = 'Matin et soir';
      if (id === 'spf_stick') when = 'En journée';
      let frequency = 'Tous les jours';
      if (f) frequency = f.everyOther ? 'Un soir sur deux au début, puis tous les soirs si bien toléré' : `${f.start} soir(s) par semaine au départ, jusqu'à ${f.cap} si bien toléré`;
      if (id === 'oil_cleanser') frequency = 'Les soirs où vous portez maquillage ou SPF';
      if (id === 'spf_stick') frequency = 'Toutes les 2 heures en exposition';
      const pmStep = routine.PM.find(s => s.id === id);
      if (pmStep && pmStep.optional) frequency = 'Le matin ; le soir si la peau tire';
      return { id, name: p.name, step: p.step, mainBenefit: p.claims[0], why: (routine.reasons[id] || []).join(' '), when, frequency, howTo: p.usage,
        price: p.variants[0].price, size: p.variants[0].size, variantId: p.variants[0].variantId, introWeek: routine.progression.intro[id] || 1, precautions: p.precautions };
    };

    return {
      engineVersion: ENGINE_VERSION, catalogVersion: catalog.catalogVersion, inputHash: fnv(stable(rawAnswers || {})),
      profile: { ...profile, tierName: TIERS[profile.tier].name, label: profileLabel(profile) },
      scores: dash, confidence: Object.fromEntries(Object.entries(sc.confidence).map(([k, v]) => [k, Math.round(v * 100) / 100])), scoreTrace: sc.traces,
      dashboard, concernScores,
      priorities: prio.slice(0, 3).map(({ id, label, priority, source, intensity }) => ({ id, label, priority: priority === 999 ? 'tolérance' : priority, source, intensity: r0(intensity) })),
      allPriorities: prio,
      routine: {
        AM: routine.AM.map(s => ({ ...s })), PM: routine.PM.map(s => ({ ...s })), stick: routine.stick,
        schedule: routine.schedule.map(n => ({ day: n.day, items: n.items, rest: n.rest })),
        progression: routine.progression.phases
      },
      products: routine.products.map(card),
      totalPrice: routine.products.reduce((s, id) => s + P[id].variants[0].price, 0),
      explanation: explanation(profile, sc.effective, prio, { PM: routine.PM }),
      notes: [...contradictionNotes.map(n => n.msg), ...routine.notes],
      medicalNotes, excluded: routine.excluded, conflicts: routine.conflicts,
      disclaimer: 'Évaluation cosmétique fondée sur vos réponses. Ce n\'est ni une mesure clinique ni un diagnostic médical. En cas de doute, de lésion persistante ou d\'irritation importante, consultez un dermatologue.'
    };
  }

  const api = { analyze, computeScores, normalize, MATRIX, TIERS, ENGINE_VERSION, concernIntensity, dominant };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AvureEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
