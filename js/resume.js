(function () {
  "use strict";

  var analyticsTriggers = document.querySelectorAll("[data-analytics-event]");
  var triggers = document.querySelectorAll("[data-open-details]");

  function trackEvent(eventName) {
    if (eventName && typeof window.gtag === "function") {
      window.gtag("event", eventName);
    }
  }

  Array.prototype.forEach.call(analyticsTriggers, function (trigger) {
    trigger.addEventListener("click", function () {
      trackEvent(trigger.getAttribute("data-analytics-event"));
    });
  });

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
