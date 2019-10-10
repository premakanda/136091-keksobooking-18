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
var cardTemplate = document.querySelector('#card').content;
var photoTemplate = cardTemplate.querySelector('.popup__photo');
var mapFilters = document.querySelector('.map__filters-container');

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

  return cardElement;
};

var openCard = function (obj) {
  var card = renderCard(obj);
  userMap.insertBefore(card, mapFilters);
};

openCard(pins[0]);


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

// var userSetRoom = document.querySelector('#room_number');
// var userSetCepacity = document.querySelector('#capacity');
// // var onSubmitButton = document.querySelector('.ad-form__submit');

// var checkCapacity = function () {
//   if ((userSetRoom.value < userSetCepacity.value) || (userSetRoom.value !== 100 && userSetCepacity.value === 0) || (userSetRoom.value === 100 && userSetCepacity.value !== 0)) {
//     userSetCepacity.setCustomValidity('Выберите больше комнат или меньше гостей');
//   } else {
//     userSetCepacity.setCustomValidity('');
//   }
// };

var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var checkRoomsAndGuests = function () {
  var roomValue = parseInt(roomNumberSelect.value);
  var capacityValue = parseInt(capacitySelect.value);

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
