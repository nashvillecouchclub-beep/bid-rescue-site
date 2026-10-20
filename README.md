# Bid Rescue site

The live site for getbidrescue.com (GitHub Pages, branch main). Built Oct 20 2026 (Code order Part L).

- `index.html`: home, trade list, full price table, state notes, contact form.
- `trades/<slug>.html`: one page per trade (19 contractor trades, `wedding-venues`, `fire-inspection` for Deficiency Rescue). Every outreach email links to the page for that prospect's trade; prospects with no trade page get the home page.
- `checkup.html`: free check (5 free follow ups). `signup.html`: sign up with trade, plan and state gate. `terms.html`: client terms. `everything.html`: services and add ons live at launch.
- Prices come only from Hub settings/agencyPrices. State rules come from Hub settings/stateLawMap (copy in `state-rules.json`, used by `forms.js`).
- Form mail goes to rickey@answeredreviewsco.com through FormSubmit. hello@getbidrescue.com forwards there too.
