'use strict';

(function () {

  var MAIN_PIN_TOP = 130;
  var MAIN_PIN_BOTTOM = 630;
  var MAIN_PIN_HEIGHT = 15;
  var HEIGHT_TIP = 15;

  var pinMain = document.querySelector('.map__pin--main');

  var mapPinMainDefaultCoords = {
    top: 375,
    left: 570
  };
  var setMapPinMainDefaultCoords = function () {
    pinMain.style.top = mapPinMainDefaultCoords.top + 'px';
    pinMain.style.left = mapPinMainDefaultCoords.left + 'px';
  };

  var getMainPinCoord = function () {
    var x = pinMain.offsetLeft + pinMain.offsetWidth / 2;
    var y = pinMain.offsetTop + pinMain.Top + HEIGHT_TIP;
    return [x, y];
  };

  var setAddress = function (coords) {
    pinMain.value = coords[0] + ', ' + coords[1];
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

      window.form.setAddress(getMainPinCoords());

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var getMainPinCoords = function () {
    var x = Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2);
    var y = Math.floor(pinMain.offsetTop + pinMain.offsetHeight + HEIGHT_TIP);
    return [x, y];
  };

  window.pinMain = {
    getCoords: getMainPinCoords,
    setMapPinMainDefaultCoords: setMapPinMainDefaultCoords
  };

})();
