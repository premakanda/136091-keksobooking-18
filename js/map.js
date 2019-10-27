'use strict';

(function () {

  var setdisabled = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };

  var list = window.data.mapFilters.querySelectorAll('select, fieldset');

  var activatePage = function () {
    window.data.userMap.classList.remove('map--faded');
    window.form.deactivate();
    setdisabled(list, true);
  };

  var inActivatePage = function () {
    window.data.userMap.classList.add('map--faded');
    window.form.activate();
    setdisabled(list, false);
  };

  window.data.pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  window.data.pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
    }
  });

  inActivatePage();

  window.map = {
    activatePage: activatePage,
    inActivatePage: inActivatePage
  };
})();
