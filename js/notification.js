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
  };

  var onSuccess = function (message) {
    var successElement = successTemplate.cloneNode(true);

    successElement.querySelector('.success__message').textContent = message;
    main.appendChild(successElement);

    document.addEventListener('click', function () {
      closeMessage();
    });
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    var errorElement = main.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
      document.addEventListener('keydown', onEscPress);
    }
  };

  window.notification = {
    showError: onError,
    showSuccess: onSuccess
  };
})();
