'use strict';

(function () {

  window.debounce = function (cb) {
    var lastTimeout = null;
    var DEBOUNCE_INTERVAL = 500;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
