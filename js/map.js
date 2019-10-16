'use strict';

(function () {

  var pinMain = window.data.userMap.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var setdisabled = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = value;
    }
  };

  var list = window.data.mapFilters.querySelectorAll('select, fieldset');

  var activatePage = function () {
    window.data.userMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setdisabled(list, true);
  };

  var inActivatePage = function () {
    window.data.userMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setdisabled(list, false);
  };

  pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
    }
  });

  inActivatePage();
})();
