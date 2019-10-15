'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var priceIndex = [1, 2];
var roomsIndex = [1, 2];
var guestsIndex = [1, 2];

var userMapPins = document.querySelector('.map__pins');
var userPinsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var userMap = document.querySelector('.map');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomItem = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var generatePins = function (count) {
  var data = [];
  for (var i = 0; i < count; i++) {
    data.push({
      author: {
        avatars: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: getRandomItem(priceIndex),
        type: getRandomItem(TYPES),
        rooms: getRandomItem(roomsIndex),
        guests: getRandomItem(guestsIndex),
        checkin: getRandomItem(CHECKINS),
        checkout: getRandomItem(CHECKOUTS),
        features: FEATURES.slice(getRandomInt(0, FEATURES.length)),
        description: 'Описание',
        photos: PHOTOS.slice(getRandomInt(0, PHOTOS.length)),
      },
      location: {
        x: getRandomInt(0, userMap.offsetWidth),
        y: getRandomInt(130, 630)
      }
    });
  }
  return data;
};

var renderPin = function (obj) {
  var pinElement = userPinsTemplate.cloneNode(true);
  pinElement.style.left = obj.location.x + 'px';
  pinElement.style.top = obj.location.y + 'px';
  pinElement.querySelector('img').src = obj.author.avatars;

  pinElement.addEventListener('click', function () {
    openCard(obj);
  });

  return pinElement;
};

var renderMapPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var t = 0; t < arr.length; t++) {
    fragment.appendChild(renderPin(arr[t]));
  }
  userMapPins.appendChild(fragment);
};

var pins = generatePins(8);
renderMapPins(pins);

// Задание: больше деталей
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = cardTemplate.querySelector('.popup__photo');
var mapFilters = document.querySelector('.map__filters-container');

var closePopup = function () {
  var cardElement = userMap.querySelector('.map__card');
  if (cardElement) {
    cardElement.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

var renderCard = function (dataObj) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = dataObj.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = dataObj.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = dataObj.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = dataObj.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = dataObj.offer.rooms + ' комнаты для ' + dataObj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ' , выезд до ' + dataObj.offer.checkout;

  var stringFeatures = '';
  for (var i = 0; i < dataObj.offer.features.length; i++) {
    stringFeatures += '<li class="popup__feature popup__feature--' + dataObj.offer.features[i] + '"></li>';
  }
  cardElement.querySelector('.popup__features').innerHTML = stringFeatures;

  var photosContainer = cardElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  for (var j = 0; j < dataObj.offer.photos.length; j++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = dataObj.offer.photos[j];
    photosContainer.appendChild(photoElement);
  }

  cardElement.querySelector('.popup__description').textContent = dataObj.offer.description;

  cardElement.querySelector('.popup__avatar').src = dataObj.author.avatars;

  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    closePopup();
  });

  return cardElement;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === window.ESC_KEYCODE) {
    closePopup();
  }
};

var openCard = function (obj) {
  var oldCardElement = userMap.querySelector('.map__card');
  var cardElement = renderCard(obj);
  if (oldCardElement) { // если уже есть открытая карточка, просто заменяем ее на новую
    userMap.replaceChild(cardElement, oldCardElement);
  } else {
    userMap.insertBefore(cardElement, mapFilters);
    document.addEventListener('keydown', onPopupEscPress);
  }
};

// Задание подробности
var ENTER_KEYCODE = 13;

var pinMain = userMap.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var setdisabled = function (list, value) {
  for (var i = 0; i < list.length; i++) {
    list[i].disabled = value;
  }
};

var list = mapFilters.querySelectorAll('select, fieldset');

var activatePage = function () {
  userMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setdisabled(list, true);
};

var inActivatePage = function () {
  userMap.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  setdisabled(list, false);
};

pinMain.addEventListener('mousedown', function () {
  activatePage();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

inActivatePage();
// расчет положения
var getMainPinsCoords = function () {
  var x = pinMain.offsetLeft + pinMain.offsetWidth / 2;
  var y = pinMain.offsetTop + pinMain.Top + 15;
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
