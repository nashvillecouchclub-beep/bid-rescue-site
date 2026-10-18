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
