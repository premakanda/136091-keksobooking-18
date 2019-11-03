'use strict';
(function () {

  var POST_URL = 'https://js.dump.academy/keksobooking';
  var GET_URL = POST_URL + '/data';
  var STATUS_OK = 200;

  var xhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 2000;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания. Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrRequest(onLoad, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = xhrRequest(onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    send: send,
    load: load
  };

})();
