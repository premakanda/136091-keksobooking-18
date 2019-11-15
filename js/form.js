'use strict';

(function () {

  var TITLE_30 = 'Заголовок объявления должен состоять минимум из 30 символов';
  var TITLE_100 = 'Заголовок объявления не должен превышать 100 символов';
  var VALIDITY_FIELD = 'Обязательное поле';
  var IMG_AVATAR = 'img/muffin-grey.svg';

  var typeParamsMap = {
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

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Соответствие количества комнат количеству гостей
  var addressElement = document.querySelector('#address');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var adForm = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');

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

  checkRoomsAndGuests();

  var titleElement = document.querySelector('#title');
  var priceElement = document.querySelector('#price');
  var roomTypeElement = document.querySelector('#type');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');


  // Цена
  var onChangeMinPrice = function () {
    var currentValue = roomTypeElement.value;
    priceElement.min = typeParamsMap[currentValue].minPrice;
    priceElement.placeholder = typeParamsMap[currentValue].minPrice;
  };

  roomTypeElement.addEventListener('change', onChangeMinPrice);

  onChangeMinPrice();

  // Соответствие времени заезда и выезда
  var onChangeTimeOut = function () {
    timeOutElement.value = timeInElement.value;
  };

  var onChangeTimeIn = function () {
    timeInElement.value = timeOutElement.value;
  };

  timeInElement.addEventListener('change', onChangeTimeOut);
  timeOutElement.addEventListener('change', onChangeTimeIn);

  // Заголовок объявления
  var checkCapacity = function (i) {
    titleElement.setCustomValidity(i);
  };

  titleElement.addEventListener('invalid', function () {
    if (titleElement.validity.tooShort) {
      checkCapacity(TITLE_30);
    } else if (titleElement.validity.tooLong) {
      checkCapacity(TITLE_100);
    } else if (titleElement.validity.valueMissing) {
      checkCapacity(VALIDITY_FIELD);
    } else {
      checkCapacity('');
    }
  });

  var setDisabled = function (list, value) {
    list.forEach(function (item) {
      item.disabled = value;
    });
  };

  var mapFormAvatar = document.querySelector('.ad-form-header');
  var mapFormInputs = document.querySelectorAll('.ad-form__element');
  var roomsNumber = document.querySelector('select[name="rooms"]');
  var capacityNumber = document.querySelector('select[name="capacity"]');

  var deactivate = function () {
    adForm.classList.add('ad-form--disabled');
    mapFormAvatar.setAttribute('disabled', true);
    setDisabled(mapFormInputs, true);
    mapFormInputs.forEach(function (elem) {
      elem.style = '';
    });
    roomsNumber.style = '';
    capacityNumber.style = '';
    window.pinMain.resetCoords();
    reset();
  };

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    setDisabled(mapFormInputs, false);
    mapFormAvatar.removeAttribute('disabled');
  };

  var setAddress = function (coords) {
    addressElement.value = coords[0] + ', ' + coords[1];
  };

  var onSuccess = function () {
    window.notification.showSuccess();
    window.map.inActivatePage();
  };

  var onError = function (errorMassage) {
    window.notification.showError(errorMassage);
  };

  // Сброс данных
  var resetAllPageValues = function () {
    window.map.inActivatePage();
  };

  resetButton.addEventListener('click', function () {
    resetAllPageValues();
  });

  // Отправка формы на сервер
  var onLoad = function () {
    deactivate();
    window.notification.showSuccess();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.backend.send(data, onSuccess, onError, onLoad);
  });

  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var avatarChoserElement = document.querySelector('#avatar');
  var roomsChoserElement = document.querySelector('#images');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');

  var reset = function () {
    avatarPreviewElement.src = IMG_AVATAR;
    var photoElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    photoElements.forEach(function (item) {
      item.remove();
    });
    addFormPhoto();
    adForm.reset();
  };

  var addFormPhoto = function () {
    var divElement = document.createElement('div');
    divElement.className = 'ad-form__photo';
    return photoContainerElement.appendChild(divElement);
  };

  var createPhotoPrewiev = function () {
    var divElement = addFormPhoto();
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', IMG_AVATAR);
    imgElement.setAttribute('alt', 'Фото помещения');
    imgElement.style.width = '100%';
    divElement.append(imgElement);
    return imgElement;
  };

  var addLoadListener = function (reader, choser) {
    reader.addEventListener('load', function () {
      if (choser === roomsChoserElement) {
        var prewievRooms = createPhotoPrewiev();
        prewievRooms.src = reader.result;
      } else {
        avatarPreviewElement.src = reader.result;
      }
    });
  };

  var loadPhoto = function (choser) {
    Array.from(choser.files).forEach(function (item) {
      var file = item;

      if (file) {
        var fileName = file.name.toLowerCase();
      }

      var matches = FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });

      if (matches) {
        var reader = new FileReader();

        reader.readAsDataURL(file);

        addLoadListener(reader, choser);
      }
    });
  };

  avatarChoserElement.addEventListener('change', function () {
    loadPhoto(avatarChoserElement);
  });

  roomsChoserElement.addEventListener('change', function () {
    loadPhoto(roomsChoserElement);
  });

  window.form = {
    deactivate: deactivate,
    activate: activate,
    setAddress: setAddress
  };

})();
