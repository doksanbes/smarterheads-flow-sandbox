# smarterheads-flow-sandbox

Tiny test repository to validate the SmarterHeads end-to-end flow:

**load project → open in editor → comment & patch → staging fork branch → consolidate → upstream PR → merge**

Three small modules, each with one known bug and a failing test (CI is red on purpose until the issues are fixed):

| File | Issue | Bug |
|---|---|---|
| `src/cart.js` | #1 | Tax applied before discount, no rounding to cents |
| `src/slugify.js` | #2 | Umlauts/ß dropped, dashes not trimmed (several valid fixes → consolidation test) |
| `src/dateRange.js` | #3 | Day count not inclusive, DST-sensitive |

```bash
npm test   # Node >= 20, no dependencies
```

License: MIT
