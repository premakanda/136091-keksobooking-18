'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = [ 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var priceIndex;
var roomsIndex;
var guestsIndex;

var userMap = document.querySelector('.map');
userMap.classList.remove('map--faded');

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
        price: priceIndex,
        type: getRandomItem(TYPES),
        rooms: roomsIndex,
        guests: guestsIndex,
        checkin: getRandomItem(CHECKINS),
        checkout: getRandomItem(CHECKOUTS),
        features: getRandomItem(FEATURES),
        description: 'Описание',
        photos: getRandomItem(PHOTOS),
      },
      location: {
         x: getRandomItem(userMap.scrollWidth),
         y: getRandomItem(userMap.scrollHeight)
      }
    });
  }
  return data;
};


var userMapPins = document.querySelector('.map__pins');
var userPinsTemplate = document.querySelector('#pin')
var renderPin = function () {
  var pinElement = userPinsTemplate.cloneNode(true);

  pinElement.textContent = src="{{author.avatar}}";
  pinElement.style="left: {{location.x}}px; top: {{location.y}}px;"
  pinElement.textContent = alt="{{заголовок объявления}}";

  return pinElement;
};

var renderMapPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var t = 0; t < arr.length; t++) {
    fragment.appendChild(generatePoints(arr[t]));
  }
  userMapPins.appendChild(fragment);
};

var pins = generatePins(8);
renderMapPins(pins);
