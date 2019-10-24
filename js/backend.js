// 'use strict';
// (function () {
//   var URL = 'https://js.dump.academy/keksobooking/data';
//   var errorTemplate = document.querySelector('#error')
//   .content
//   .querySelector('.error');

//   var renderError = function () {
//     var errorElement = errorTemplate.cloneNode(true);
//     return errorElement;
//   };

//   window.load = function (onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.open('GET', URL);

//     xhr.addEventListener('load', function () {
//       if (xhr.status === 200) {
//         onSuccess(xhr.response);
//       } else {
//         onError(renderError());
//       }
//     });

//     xhr.send();
//   };
// })();
