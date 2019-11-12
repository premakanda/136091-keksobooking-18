'use strict';

(function () {

  var userMapPins = document.querySelector('.map__pins');
  var userPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Отрисовка объявления по шаблону
  var renderPin = function (obj) {
    var pinElement = userPinsTemplate.cloneNode(true);

    pinElement.style.left = obj.location.x + 'px';
    pinElement.style.top = obj.location.y + 'px';
    pinElement.querySelector('img').src = obj.author.avatar;
    pinElement.querySelector('img').alt = obj.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.openCard(obj);
    });
    pinElement.addEventListener('click', function () {
      makePinsUnactive();
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var makePinsUnactive = function () {
    document.querySelectorAll('.map__pin').forEach(function (pinItem) {
      pinItem.classList.remove('map__pin--active');
    });
  };

  var renderMapPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var t = 0; t < arr.length; t++) {
      fragment.appendChild(renderPin(arr[t]));
    }
    userMapPins.appendChild(fragment);
  };

  var clearPin = function () {
    var pins = userMapPins.querySelectorAll('.map__pin:not(.map__pin--main');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var delActivePin = function () {
    var activePinElement = document.querySelector('.map__pin--active');
    activePinElement.classList.remove('map__pin--active');
  };

  window.pin = {
    render: renderMapPins,
    clear: clearPin,
    delActivePin: delActivePin
  };

})();
