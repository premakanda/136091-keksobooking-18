'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var createEscHandler = function (action) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        action.apply(arguments);
      }
    };
  };

  var debounce = function (cb) {
    var lastTimeout = null;

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

  window.util = {
    createEscHandler: createEscHandler,
    debounce: debounce
  };

})();
