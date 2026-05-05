// MODEL — all Cloudinary API calls live here; no DOM access allowed in this file

var CloudinaryModel = (function () {
  // Base URL for the Cloudinary account used by this project
  var BASE = 'https://res.cloudinary.com/nuci';

  // Builds the full CDN URL for a single image resource returned by the list API
  function buildImageUrl(image) {
    return BASE + '/image/upload/v' + image.version + '/' + encodeURIComponent(image.public_id) + '.' + image.format;
  }

  // Fetches the homepage image list (tagged "inicio" in Cloudinary)
  function getHomepageImages(callback) {
    $.ajax({
      url: BASE + '/image/list/inicio.json',
      method: 'GET',
      timeout: 0,
      crossDomain: true
    }).done(callback);
  }

  // Fetches images for a specific project category by its Cloudinary tag name
  function getCategoryImages(categoryId, callback) {
    $.ajax({
      url: BASE + '/image/list/' + categoryId + '.json',
      method: 'GET',
      timeout: 0,
      crossDomain: true
    }).done(callback);
  }

  return {
    buildImageUrl: buildImageUrl,
    getHomepageImages: getHomepageImages,
    getCategoryImages: getCategoryImages
  };
})();
