# emchamp.github.io

Personal portfolio site for Rommel Sunga, served at https://emchamp.github.io/

Single static `index.html`, with JavaScript modules in `assets/js/` served as-is. There is still no build step for deployment: edit the site and push to `master`; GitHub Pages redeploys on its own.

Source of truth for edits lives at `C:\Users\emchamp-a14\Projects\portfolio\index.html`.

## Tests

Install the test dependencies with `npm install`, then run `npm test` for the unit tests or `npm run coverage` for the coverage report.

## History note

This repo previously hosted "Adventure Anonymous", a static blog generated in 2016.
It was replaced with the portfolio on 2026-08-26. The old site is still in git history at commit `e930968`:

    git show e930968:index.html

`files/whitepaper.pdf` (an 8x8 Communication APIs security overview) was removed on 2026-08-26. It is a
former employer's document and did not belong on a personal site. It remains in git history at `e930968`
if it is ever needed.
