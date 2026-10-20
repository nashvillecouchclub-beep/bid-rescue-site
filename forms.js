// Bid Rescue: small shared form helper.
// FormSubmit needs an absolute URL in _next. The HTML holds a relative path
// (thanks.html?from=...) so the site works on any domain; this turns it into
// a full URL based on where the page is hosted. If JavaScript is off, FormSubmit
// shows its own thank you page instead, which is fine.
(function () {
  var fields = document.querySelectorAll('input.js-next');
  for (var i = 0; i < fields.length; i++) {
    try {
      fields[i].value = new URL(fields[i].value, window.location.href).href;
    } catch (e) { /* leave as is */ }
  }

  // Checkup form: require either a file or a shared link.
  var form = document.getElementById('checkup-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      var files = form.querySelector('input[type=file]');
      var link = form.querySelector('input[name=share_link]');
      var msg = document.getElementById('checkup-error');
      var hasFile = files && files.files && files.files.length > 0;
      var hasLink = link && link.value.trim() !== '';
      if (!hasFile && !hasLink) {
        ev.preventDefault();
        if (msg) { msg.hidden = false; msg.focus(); }
        return;
      }
      // FormSubmit attachments: about 10 MB total per submission (see checkup.html).
      if (hasFile) {
        var total = 0;
        for (var j = 0; j < files.files.length; j++) total += files.files[j].size;
        if (total > 10 * 1024 * 1024 && !hasLink) {
          ev.preventDefault();
          if (msg) {
            msg.textContent = 'Those files are too big to send here (over 10 MB). Please share a Google Drive or Dropbox link instead, or send fewer photos.';
            msg.hidden = false; msg.focus();
          }
        }
      }
    });
  }
})();

// State rules (Hub settings/stateLawMap, checked Oct 20 2026; copy in state-rules.json).
// Contractor lanes: red states are not served; yellow states get flat monthly plans only.
// Wedding venues are served in every state.
(function () {
  var RED = ['CA', 'CT', 'DC', 'HI', 'MD', 'MI', 'NJ'];
  var YELLOW = ['MA', 'NC', 'NV', 'NY', 'OR', 'VA', 'WI'];
  var forms = document.querySelectorAll('form');
  for (var i = 0; i < forms.length; i++) (function (form) {
    var st = form.querySelector('.js-state');
    if (!st) return;
    var tr = form.querySelector('.js-trade');
    var pl = form.querySelector('.js-plan');
    var msg = form.querySelector('.js-state-msg');
    var pmsg = form.querySelector('.js-plan-msg');
    function venue() { return tr && tr.value === 'wedding-venues'; }
    function check() {
      var s = st.value, text = '', block = false;
      if (s && !venue()) {
        if (RED.indexOf(s) >= 0) { text = 'Sorry, we are not taking clients in your trade in this state yet. Wedding venues are welcome in every state.'; block = true; }
        else if (YELLOW.indexOf(s) >= 0) { text = 'In this state we offer the flat monthly plans only, with no per job fee.'; if (pl && pl.value === 'per-job') block = true; }
        if (s === 'NV' && tr && tr.value === 'pools') { text = 'Sorry, we are not taking pool or spa builders in Nevada yet.'; block = true; }
        if (s === 'NY') text += ' We do not take clients in Nassau, Suffolk, Westchester, Rockland or Putnam counties.';
      }
      if (msg) { msg.textContent = text; msg.hidden = !text; }
      if (pmsg) { pmsg.textContent = (pl && pl.value === 'per-job' && YELLOW.indexOf(s) >= 0 && !venue()) ? 'Pay per signed job is not offered in your state. Please pick a monthly plan.' : ''; pmsg.hidden = !pmsg.textContent; }
      st.setCustomValidity(block ? (text || 'Not offered in this state') : '');
      return !block;
    }
    st.addEventListener('change', check);
    if (tr) tr.addEventListener('change', check);
    if (pl) pl.addEventListener('change', check);
    form.addEventListener('submit', function (ev) { if (!check()) { ev.preventDefault(); if (msg) msg.focus && msg.focus(); } });
    // Prefill the trade from ?trade= on links from trade pages.
    var q = new URLSearchParams(window.location.search).get('trade');
    if (q && tr) { for (var j = 0; j < tr.options.length; j++) if (tr.options[j].value === q) tr.selectedIndex = j; }
    // Show only the plans for this business (each trade and size sees its own plans).
    if (pl) {
      var qp = new URLSearchParams(window.location.search).get('plan');
      var allow = ['exclusive', 'per-job', 'win-back'];
      if (qp === 'small-shop') allow = ['small-shop', 'win-back'];
      else if (q === 'wedding-venues') allow = ['exclusive', 'wedding-per-booking'];
      else if (q === 'fire-inspection') allow = ['deficiency'];
      for (var k = pl.options.length - 1; k >= 1; k--) if (allow.indexOf(pl.options[k].value) < 0) pl.remove(k);
      if (pl.options.length === 2) pl.selectedIndex = 1;
    }
  })(forms[i]);
})();
