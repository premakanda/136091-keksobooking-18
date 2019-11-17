'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var buttonError = errorElement.querySelector('.error__button');

    errorElement.querySelector('.error__message').textContent = message;
    main.appendChild(errorElement);

    buttonError.addEventListener('click', function () {
      closeMessage();
    });
    document.addEventListener('keydown', onEscPress);
  };

  var showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);

    main.appendChild(successElement);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
  };

  var onEscPress = window.util.createEscHandler(function () {
    closeMessage();
  });

  var onDocumentClick = function () {
    closeMessage();
  };

  var closeMessage = function () {
    var messageElement = main.querySelector('.error, .success');
    if (messageElement) {
      messageElement.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.notification = {
    showError: onError,
    showSuccess: showSuccess
  };

})();
