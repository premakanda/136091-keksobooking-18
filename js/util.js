'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  // var makeReqOnKeyCode = function (evt, action, keyCode) {
  //   if (evt.keyCode === keyCode) {
  //     action();
  //   }
  // };

  // window.util = {
  //   onEscEvt: makeReqOnKeyCode(ESC_KEYCODE),
  //   onEnterEvt: makeReqOnKeyCode(ENTER_KEYCODE)
  // };

  window.util = {
    onEscEvt: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    onEnterEvt: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    debounce: function (cb) {
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
    },
  };

})();
