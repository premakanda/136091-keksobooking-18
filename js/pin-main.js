'use strict';

(function () {

  var MAIN_PIN_TOP = 130;
  var MAIN_PIN_BOTTOM = 630;
  var MAIN_PIN_HEIGHT = 15;

  var mainPinHandler = window.data.pinMain;
  var getMainPinCoord = function () {
    var x = mainPinHandler.offsetLeft + mainPinHandler.offsetWidth / 2;
    var y = mainPinHandler.offsetTop + mainPinHandler.Top + 15;
    return [x, y];
  };

  var setAddress = function (coords) {
    window.data.pinMain.value = coords[0] + ', ' + coords[1];
  };

  var coords = getMainPinCoord();
  setAddress(coords);

  mainPinHandler.addEventListener('mousedown', function (evt) {
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

      var x = mainPinHandler.offsetLeft - shift.x;
      var y = mainPinHandler.offsetTop - shift.y;

      y = Math.max(MAIN_PIN_TOP - (mainPinHandler.offsetHeight + MAIN_PIN_HEIGHT), y);
      y = Math.min(MAIN_PIN_BOTTOM - (mainPinHandler.offsetHeight + MAIN_PIN_HEIGHT), y);

      x = Math.max(0, x);
      x = Math.min(1200 - mainPinHandler.offsetWidth, x);

      mainPinHandler.style.top = y + 'px';
      mainPinHandler.style.left = x + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
