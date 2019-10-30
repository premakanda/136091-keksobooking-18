'use strict';

(function () {

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');

  var deactivate = function () {
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  window.form = {
    deactivate: deactivate,
    activate: activate
  };

  var checkRoomsAndGuests = function () {
    var roomValue = parseInt(roomNumberSelect.value, 10);
    var capacityValue = parseInt(capacitySelect.value, 10);

    if ((roomValue < capacityValue) || (roomValue === 100 && capacityValue !== 0) || (roomValue !== 100 && capacityValue === 0)) {
      capacitySelect.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  roomNumberSelect.addEventListener('change', function () {
    checkRoomsAndGuests();
  });

  capacitySelect.addEventListener('change', function () {
    checkRoomsAndGuests();
  });

  // Задание доверяй но проверяй

  var types = {
    palace: {
      name: 'Дворец',
      minPrice: '10000'
    },
    flat: {
      name: 'Квартира',
      minPrice: '1000'
    },
    bungalo: {
      name: 'Бунгало',
      minPrice: '0'
    },
    house: {
      name: 'Дом',
      minPrice: '5000'
    }
  };

  var titleElement = document.querySelector('#title');
  var priceElement = document.querySelector('#price');
  var roomTypeElement = document.querySelector('#type');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var changeMinPriceHandler = function () {
    var currentValue = roomTypeElement.value;
    priceElement.min = types[currentValue].minPrice;
    priceElement.placeholder = types[currentValue].minPrice;
  };

  changeMinPriceHandler();

  var changeTimeOutHandler = function () {
    timeOutElement.value = timeInElement.value;
  };

  var changeTimeInHandler = function () {
    timeInElement.value = timeOutElement.value;
  };

  var checkCapacity = function (i) {
    titleElement.setCustomValidity(i);
  };

  titleElement.addEventListener('invalid', function () {
    if (titleElement.validity.tooShort) {
      checkCapacity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleElement.validity.tooLong) {
      checkCapacity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleElement.validity.valueMissing) {
      checkCapacity('Обязательное поле');
    } else {
      checkCapacity('');
    }
  });

  var onSuccess = function () {
    deactivate();
    window.map.deactivate();
  };

  var onError = function (errorMassage) {
    window.notification.showError(errorMassage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.backend.send(data, onSuccess, onError);

  });

  roomTypeElement.addEventListener('change', changeMinPriceHandler);
  timeInElement.addEventListener('change', changeTimeOutHandler);
  timeOutElement.addEventListener('change', changeTimeInHandler);

  checkRoomsAndGuests();

})();
