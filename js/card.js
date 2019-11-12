'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters-container');

  var closePopup = function () {
    var cardElement = mapElement.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

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
    cardElement.querySelector('.popup__avatar').src = dataObj.author.avatar;
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closePopup();
    });

    return cardElement;
  };

  var onPopupEscPress = function (evt) {
    window.util.onEscEvt(evt, closePopup);
    window.util.onEscEvt(evt, window.pin.delActivePin);
  };

  window.card = {
    close: closePopup,
    openCard: function (obj) {
      var oldCardElement = mapElement.querySelector('.map__card');
      var cardElement = renderCard(obj);
      if (oldCardElement) {
        mapElement.replaceChild(cardElement, oldCardElement);
      } else {
        mapElement.insertBefore(cardElement, mapFiltersElement);
        document.addEventListener('keydown', onPopupEscPress);
      }
    }
  };

})();
