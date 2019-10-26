'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  // var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var buttonError = errorElement.querySelector('.error__button');

    fragment.appendChild(errorElement);
    main.appendChild(fragment);
    errorElement.querySelector('.error__message').textContent = message;

    buttonError.addEventListener('click', function () {
      errorElement.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        errorElement.remove();
      }
    });
  };

  window.notification = {
    showError: onError,
  };
})();
