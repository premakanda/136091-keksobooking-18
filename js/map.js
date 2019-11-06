'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  // var housingFeatures = document.querySelector('#housing-features');
  // var filterElement = document.querySelector('.map__filters');
  var featureCheckbox = document.querySelectorAll('#housing-features input');


  var pinMain = document.querySelector('.map__pin--main');
  var data = [];
  var MAX_PIN = 5;

  var price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

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

  var filterByRooms = function (item) {
    return housingRooms.value === 'any' ? true : item.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterByGuests = function (item) {
    return housingGuests.value === 'any' ? true : item.offer.guests === parseInt(housingGuests.value, 10);
  };

  var filterByPrice = function (add) {
    switch (housingPrice.value) {
      case price.LOW:
        return add.offer.price < price.MIN;
      case price.MIDDLE:
        return add.offer.price >= price.MIN && add.offer.price <= price.MAX;
      case price.HIGH:
        return add.offer.price > price.MAX;
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

  // var filterData = function (datam) {
  //   return datam.filter(filterByType)
  //     .slice(0, 5);
  // };

  var filterData = function (datam) {
    return datam.filter(function (item) {
      return (
        filterByType(item) &&
        filterByRooms(item) &&
        filterByGuests(item) &&
        filterByPrice(item) &&
        filterByFeature(item)
      );
    }).slice(0, MAX_PIN);
  };

  // filterElement.addEventListener('change', window.debounce(filterData));

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
