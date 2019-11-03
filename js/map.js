'use strict';

(function () {

  var setdisabled = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };
  var userMap = document.querySelector('.map');
  var list = userMap.querySelectorAll('select, fieldset');

  var activatePage = function () {
    userMap.classList.remove('map--faded');
    window.form.activate();
    setdisabled(list, false);
    window.backend.load(onSuccess, onError);
  };

  var inactivatePage = function () {
    userMap.classList.add('map--faded');
    window.pin.clear();
    window.form.deactivate();
    window.form.setAddress(window.pinMain.getCoords());
    setdisabled(list, true);
  };

  window.data.pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  window.data.pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
    }
  });

  var onSuccess = function (data) {
    window.pin.render(data);
    // renderMapPins(data);
    // window.map.inActivatePage();
  };

  var onError = function (error) {
    window.notification.showError(error);
  };

  inactivatePage();

  window.map = {
    activatePage: activatePage,
    inactivatePage: inactivatePage
  };
})();
