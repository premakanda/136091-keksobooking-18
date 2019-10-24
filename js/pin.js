'use strict';

(function () {

  var userMapPins = document.querySelector('.map__pins');
  var userPinsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
          price: getRandomItem(window.data.priceIndex),
          type: getRandomItem(window.data.TYPES),
          rooms: getRandomItem(window.data.roomsIndex),
          guests: getRandomItem(window.data.guestsIndex),
          checkin: getRandomItem(window.data.CHECKINS),
          checkout: getRandomItem(window.data.CHECKOUTS),
          features: window.data.FEATURES.slice(getRandomInt(0, window.data.FEATURES.length)),
          description: 'Описание',
          photos: window.data.PHOTOS.slice(getRandomInt(0, window.data.PHOTOS.length)),
        },
        location: {
          x: getRandomInt(0, window.data.userMap.offsetWidth),
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
      window.card.openCard(obj);
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
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var buttonError = errorElement.querySelector('.error__button');

    fragment.appendChild(errorElement);
    main.appendChild(fragment);
    errorElement.querySelector('.error__message').textContent = message;

    buttonError.addEventListener('click', function () {
      errorElement.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        errorElement.remove();
      }
    });
  };

  var onSuccess = function (data) {
    var errorElement = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    fragment.appendChild(errorElement);
    main.appendChild(fragment);
    errorElement.querySelector('.error__message').textContent = data;

    document.addEventListener('click', function () {
      errorElement .remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        errorElement .remove();
      }
    });
  };

  window.load(onSuccess, onError);

  // window.load(function (pin) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < 8; i++) {
  //     fragment.appendChild(renderMapPins(pin[i]));
  //   }
  //   userMapPins.appendChild(fragment);
  // });

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

})();
