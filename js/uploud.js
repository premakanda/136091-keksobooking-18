
'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarElement = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var offerPhotoElement = document.querySelector('.ad-form__upload input[type=file]');
  var offerPreviewElement = document.querySelector('.ad-form__photo');

  // var createPhotoElement = function () {
  //   var elementPicture = document.createElement('img');
  //   elementPicture.alt = 'Фотография';
  //   return elementPicture;
  // };

  var loadFile = function (chooser, photo) {
    var file = chooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          photo.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };
  var onAvatarLoad = function () {
    loadFile(avatarElement, avatarPreviewElement);
  };

  var onHouseLoad = function () {
    loadFile(offerPhotoElement, offerPreviewElement);
  };

  avatarElement.addEventListener('change', onAvatarLoad);
  offerPhotoElement.addEventListener('change', onHouseLoad);
})();
