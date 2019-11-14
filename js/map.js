'use strict';

(function () {

  var MAX_PIN = 5;

  var Price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var filterElement = document.querySelector('.map__filters');
  var featureCheckbox = document.querySelectorAll('#housing-features input');
  var mapFilters = document.querySelectorAll('.map__filter');

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

  var inActivatePage = function () {
    userMap.classList.add('map--faded');
    window.pin.clear();
    setdisabled(mapFilters, true);
    window.form.deactivate();
    window.form.setAddress(window.pinMain.getCoords());
    setdisabled(list, true);
    filterElement.reset();
    window.pinMain.resetCoords();
  };

  pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  pinMain.addEventListener('keydown', function (evt) {
    window.util.onEnterEvt(evt, activatePage);
  });

  var filterByType = function (item) {
    return housingType.value === 'any' ? true : item.offer.type === housingType.value;
  };

  var filterByRooms = function (item) {
    return housingRooms.value === 'any' ? true : item.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterByGuests = function (item) {
    return housingGuests.value === 'any' ? true : item.offer.guests >= parseInt(housingGuests.value, 10);
  };

  var filterByPrice = function (add) {
    switch (housingPrice.value) {
      case Price.LOW:
        return add.offer.price < Price.MIN;
      case Price.MIDDLE:
        return add.offer.price >= Price.MIN && add.offer.price <= Price.MAX;
      case Price.HIGH:
        return add.offer.price > Price.MAX;
      default:
        return true;
    }
  };

  var filterByFeature = function (add) {

    var features = [];

    featureCheckbox.forEach(function (element) {
      if (element.checked) {
        features.push(element.value);
      }
    });

    return features.every(function (el) {
      return add.offer.features.includes(el);
    });
  };

  var filterData = function (datam) {
    return datam.filter(filterByType)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByPrice)
      .filter(filterByFeature)
      .slice(0, MAX_PIN);
  };

  var onFiltersChangeDebounce = window.util.debounce(function () {
    window.card.close();
    window.pin.clear();
    window.pin.render(filterData(data));
  });

  filterElement.addEventListener('change', onFiltersChangeDebounce);

  var onSuccess = function (res) {
    data = res;
    window.pin.render(filterData(data));
  };

  var onError = function (error) {
    window.notification.showError(error);
  };

  inActivatePage();

  window.map = {
    activatePage: activatePage,
    inActivatePage: inActivatePage
  };

})();
