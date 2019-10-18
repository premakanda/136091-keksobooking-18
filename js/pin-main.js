'use strict';

(function () {
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

      y = Math.min(350 + mainPinHandler.Top, y);
      y = Math.max(600 - (mainPinHandler.Top + 15), y);

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
