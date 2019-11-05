'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var pinMain = document.querySelector('.map__pin--main');
  var data = [];

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

  pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
    }
  });

  var filterByType = function (item) {
    return housingType.value === 'any' ? true : item.offer.type === housingType.value;
  };

  var filterData = function (datam) {
    return datam.filter(filterByType)
      .slice(0, 5);
  };

  housingType.addEventListener('change', function () {
    window.pin.clear();
    window.pin.render(filterData(data));
  });

  var onSuccess = function (res) {
    data = res;
    window.pin.render(filterData(data));
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
