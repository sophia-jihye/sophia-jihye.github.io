(function () {
  "use strict";

  var triggers = document.querySelectorAll("[data-open-details]");

  Array.prototype.forEach.call(triggers, function (trigger) {
    var targetId = trigger.getAttribute("data-open-details");
    var details = document.getElementById(targetId);
    var closeTrigger = document.querySelector('[data-close-details="' + targetId + '"]');

    if (!details) {
      return;
    }

    function syncExpandedState() {
      trigger.setAttribute("aria-expanded", String(details.open));
    }

    trigger.addEventListener("click", function () {
      details.open = true;
      syncExpandedState();
    });

    details.addEventListener("toggle", syncExpandedState);

    if (closeTrigger) {
      closeTrigger.hidden = false;
      closeTrigger.addEventListener("click", function () {
        var summary = details.querySelector("summary");

        details.open = false;
        syncExpandedState();

        if (summary) {
          summary.focus();
        }
      });
    }

    if (window.location.hash === "#" + targetId) {
      details.open = true;
    }

    syncExpandedState();
  });
}());
