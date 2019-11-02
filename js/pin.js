'use strict';

(function () {

  var userMapPins = document.querySelector('.map__pins');
  var userPinsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Отрисовка объявления по шаблону
  var renderPin = function (obj) {
    var pinElement = userPinsTemplate.cloneNode(true);

    pinElement.style.left = obj.location.x + 'px';
    pinElement.style.top = obj.location.y + 'px';
    pinElement.querySelector('img').src = obj.author.avatars;
    pinElement.querySelector('img').alt = obj.offer.title;

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

  // var pins = generatePins(8);
  // renderMapPins(pins);

  // var onSuccess = function (data) {
  //   renderMapPins(data);
  //   window.map.inActivatePage();
  // };

  // var onError = function (error) {
  //   window.notification.showError(error);
  // };


  // window.backend.load(onSuccess, onError);

  var getMainPinsCoords = function () {
    var x = pinMain.offsetLeft + pinMain.offsetWidth / 2;
    var y = pinMain.offsetTop + pinMain.Top + 15;
    return [x, y];
  };

  // Перемещение главного пина на карте
  var MAIN_PIN_TOP = 130;
  var MAIN_PIN_BOTTOM = 630;
  var MAIN_PIN_HEIGHT = 15;

  var pinMain = document.querySelector('.map__pin--main');

  var getMainPinCoord = function () {
    var x = pinMain.offsetLeft + pinMain.offsetWidth / 2;
    var y = pinMain.offsetTop + pinMain.Top + 15;
    return [x, y];
  };

  var setAddress = function (coords) {
    pinMain.value = coords[0] + ', ' + coords[1];
    userSetAdress.value = coords[0] + ', ' + coords[1];
  };

  var coords = getMainPinCoord();
  setAddress(coords);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var x = pinMain.offsetLeft - shift.x;
      var y = pinMain.offsetTop - shift.y;

      y = Math.max(MAIN_PIN_TOP - (pinMain.offsetHeight + MAIN_PIN_HEIGHT), y);
      y = Math.min(MAIN_PIN_BOTTOM - (pinMain.offsetHeight + MAIN_PIN_HEIGHT), y);

      x = Math.max(0, x);
      x = Math.min(1200 - pinMain.offsetWidth, x);

      pinMain.style.top = y + 'px';
      pinMain.style.left = x + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var userSetAdress = document.querySelector('#address');

  var setAddresspin = function (coordspin) {
    userSetAdress.value = coordspin[0] + ', ' + coordspin[1];
  };

  var coordspin = getMainPinsCoords();
  setAddresspin(coordspin);

  window.pin = {
    renderMapPins: renderMapPins
  };

})();
