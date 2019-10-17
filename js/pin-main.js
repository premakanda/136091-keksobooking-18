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

      mainPinHandler.style.top = (mainPinHandler.offsetTop - shift.y) + 'px';
      mainPinHandler.style.left = (mainPinHandler.offsetLeft - shift.x) + 'px';

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
