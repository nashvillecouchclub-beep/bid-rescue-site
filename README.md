# Bid Rescue site

The live site for getbidrescue.com (GitHub Pages, branch main). Built Oct 20 2026 (Code order Part L).

- `index.html`: home, trade list, full price table, state notes, contact form.
- `trades/<slug>.html`: one page per trade (19 contractor trades, `fire-inspection` for Deficiency Rescue; `wedding-venues.html` only redirects to `/venues/`). Every outreach email links to the page for that prospect's trade; prospects with no trade page get the home page.
- `venues/`: the wedding venue site, fully separate from the contractor pages (own `venues.css`, Bodoni Moda and Jost). `index.html`, `checkup.html`, `signup.html`, `terms.html`, `thanks.html`. Venue pages never link to contractor pages and contractor pages never mention venues. Emails to venues link only here.
- `checkup.html`: free check (5 free follow ups). `signup.html`: sign up with trade, plan and state gate. `terms.html`: client terms. `everything.html`: services and add ons live at launch.
- Prices come only from Hub settings/agencyPrices. State rules come from Hub settings/stateLawMap (copy in `state-rules.json`, used by `forms.js`).
- Form mail goes to rickey@answeredreviewsco.com through FormSubmit. hello@getbidrescue.com forwards there too.
