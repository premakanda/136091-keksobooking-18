'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    escKeyCode: function (evt, func) {
      if (evt.keyCode === ESC_KEYCODE) {
        func();
      }
    },

    enterKeyCode: function (evt, func) {
      if (evt.keyCode === ENTER_KEYCODE) {
        func();
      }
    }
  };
})();
