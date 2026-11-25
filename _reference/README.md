# Client quiz (reference, not uploaded to Shopify)

Source: client's AVURE "Bilan de peau" artifact. These 3 files are copied **unchanged** (French).

- `avure-catalog.js` → `window.AVURE_CATALOG` (13 products, prices, actives, usage, compatibility rules)
- `avure-questions.js` → `window.AvureQuestions` (use `EXPRESS` = 14 screens, + `EXPRESS_FIELDS`)
- `avure-engine.js` → `window.AvureEngine.analyze(answers, catalog)`

## How the client's app calls the engine
```js
// express mode input:
const input = { ...answers, _asked: [...AvureQuestions.EXPRESS_FIELDS, 'detail.severity'] };
const result = AvureEngine.analyze(input, window.AVURE_CATALOG);
```

## Answer handling (from the client's UI code)
- `single`: `answers[q.id] = value`; if the option has a 3rd element `set` (object), `Object.assign(answers, set)`.
- `multi`: array in `answers[q.id]`; `q.exclusive` value ('none') clears the others / is cleared by others.
- `concerns`: array `answers.concerns`, max `q.max` (3); `answers.priority = concerns[0]`; remove `acne_type` if 'acne' unselected; drop `concernDetails` of unselected concerns.
- `intensity_all` (`x_intensity`): per selected concern `answers.concernDetails[cid].severity = 1|2|3` (Mild / Moderate / Marked); if 'acne' selected, also `answers.acne_type` = 'comedonal' | 'papular' | 'nodular'. Next is allowed only when every concern has a severity.
- Questions with `showIf(answers)` false are skipped.
- `routine_pref` is not asked in express mode (engine defaults to 'balanced').

## Result fields used by our Figma results screen
- `result.profile.label`, `result.profile.type`, `result.explanation`
- `result.priorities[]` (`label`)
- `result.products[]` (`id, name, when, frequency, howTo, why, price, size, precautions`) and `result.totalPrice`
- `result.routine.AM[]`, `result.routine.PM[]` (`id, role, nightsOnly, optional, addon`), `result.routine.schedule[]` (`day, items, rest`), `result.routine.progression[]` (`weeks, focus, add`)
- `result.medicalNotes[]`, `result.notes[]`, `result.excluded[]`, `result.disclaimer`

## Privacy
Never send pregnancy, medical or any quiz answers with the email form. Only email, phone and tags (`diagnostic, skin-<type>`).
