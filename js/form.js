'use strict';

(function () {
  var getMainPinsCoords = function () {
    var x = window.data.pinMain.offsetLeft + window.data.pinMain.offsetWidth / 2;
    var y = window.data.pinMain.offsetTop + window.data.pinMain.Top + 15;
    return [x, y];
  };

  var userSetAdress = document.querySelector('#address');

  var setAddress = function (coords) {
    userSetAdress.value = coords[0] + ', ' + coords[1];
  };

  var coords = getMainPinsCoords();
  setAddress(coords);

  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

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

  titleElement.addEventListener('invalid', function () {
    if (titleElement.validity.tooShort) {
      titleElement.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleElement.validity.tooLong) {
      titleElement.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleElement.validity.valueMissing) {
      titleElement.setCustomValidity('Обязательное поле');
    } else {
      titleElement.setCustomValidity('');
    }
  });

  roomTypeElement.addEventListener('change', changeMinPriceHandler);
  timeInElement.addEventListener('change', changeTimeOutHandler);
  timeOutElement.addEventListener('change', changeTimeInHandler);

  checkRoomsAndGuests();

})();
