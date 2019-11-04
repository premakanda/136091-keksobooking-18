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

    return pinElement;
  };

  // Количество пинов на странице
  var PINS_ALL = 5;

  // Выводим 5 пинов

  var renderMapPins = function (arr) {
    var dataLength = arr.length > PINS_ALL ? PINS_ALL : arr.length;
    var fragment = document.createDocumentFragment();
    for (var t = 0; t < dataLength; t++) {
      fragment.appendChild(renderPin(arr[t]));
    }
    userMapPins.appendChild(fragment);
  };

  var clear = function () {
    var pins = userMapPins.querySelectorAll('.map__pin:not(.map__pin--main');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    render: renderMapPins,
    clear: clear
  };

})();
