// CONTROLLER — wires the model and view together; contains no API calls and no raw DOM manipulation

var HomepageController = {
  init: function () {
    var counter = 0; // incremented per rendered item to generate unique filter IDs

    ProjectView.showLoading('project-section');

    CloudinaryModel.getHomepageImages(
      function (response) {
        ProjectView.hideLoading('project-section');

        // Guard: API response must contain a resources array
        if (!('resources' in response)) {
          ProjectView.showError('project-section');
          return;
        }

        var images = response.resources;
        for (var i in images) {
          var image = images[i];

          // Skip images that have no custom metadata attached in Cloudinary
          if (!('context' in image)) continue;
          // Skip images where the "local" field hasn't been set (used to assign pages)
          if (!('local' in image.context.custom)) continue;

          // "local" is a comma-separated list of page slugs; only show on homepage if "projeto" is listed
          var sections = image.context.custom.local.replace(/ /g, '').split(',');
          if (!sections.includes('projeto')) continue;

          counter += 1;
          var imgUrl = CloudinaryModel.buildImageUrl(image);
          var title = image.context.custom.caption;
          var category = image.context.custom.Categoria;
          // shuffleSelector is a unique ID that links each card to its filter button
          var shuffleSelector = category.replace(/\s+/g, '') + counter;

          ProjectView.renderFilterButton(category, shuffleSelector);
          ProjectView.renderHomepageItem(imgUrl, title, category, shuffleSelector);
        }

        // Bind the lightbox only after all images are in the DOM
        ProjectView.initGalleryPopup();
      },
      function () {
        ProjectView.hideLoading('project-section');
        ProjectView.showError('project-section');
      }
    );
  }
};

var CategoryController = {
  init: function () {
    // window.location.hash is the reliable way to read the hash — e.g. "#Cozinhas" or ""
    // The old href.split() approach returned "projeto.html" when no hash was present
    var hash = window.location.hash;

    if (!hash) {
      // No category was selected; send the user back to the projects section on the homepage
      ProjectView.showError('image-container');
      return;
    }

    // Decode once here so the view and the API both receive the plain category name
    var categoryId = decodeURIComponent(hash.slice(1));

    // Show the category name immediately while the images load
    ProjectView.updateCategoryTitle(categoryId);
    ProjectView.showLoading('image-container');

    CloudinaryModel.getCategoryImages(
      categoryId,
      function (response) {
        ProjectView.hideLoading('image-container');

        var images = response.resources;
        for (var i in images) {
          var image = images[i];
          var imgUrl = CloudinaryModel.buildImageUrl(image);
          var title = image.context.custom.caption;
          ProjectView.renderCategoryImage(imgUrl, title);
        }

        // Bind the lightbox only after all images are in the DOM
        ProjectView.initGalleryPopup();
      },
      function () {
        ProjectView.hideLoading('image-container');
        ProjectView.showError('image-container');
      }
    );
  }
};

$(document).ready(function () {
  // Detect the current page by a landmark element and run the appropriate controller
  if (document.getElementById('project-section')) {
    HomepageController.init();
  }
  if (document.getElementById('image-container')) {
    CategoryController.init();
  }
});
