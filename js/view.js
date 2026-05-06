// VIEW — all DOM creation and rendering logic; no API calls allowed in this file

var ProjectView = {
  // Appends a radio filter button for a project category to the shuffle toolbar
  renderFilterButton: function (category, shuffleSelector) {
    var label = document.createElement('label');
    label.setAttribute('for', shuffleSelector);
    // Passes the clicked input element to selectProject so it can read its value
    label.innerHTML =
      '<input onclick="selectProject(this)" type="radio" name="shuffle-filter" id="' +
      shuffleSelector + '" value="' + shuffleSelector + '">' + category;
    document.getElementById('shuffler-section').appendChild(label);
  },

  // Appends a portfolio card (image + overlay + category link) to the homepage grid
  renderHomepageItem: function (imgUrl, title, category, shuffleSelector) {
    var item = document.createElement('div');
    item.className = 'col-lg-4 col-md-6 shuffle-item';
    // data-groups ties this card to its filter button via the shared shuffleSelector
    item.setAttribute('data-groups', shuffleSelector);
    item.innerHTML =
      '<div class="project-img-container">' +
        '<a class="gallery-popup" href="' + imgUrl + '" aria-label="' + title + '">' +
          '<img class="img-fluid" src="' + imgUrl + '" alt="' + title + '" loading="lazy">' +
          '<span class="gallery-icon"><i class="fa fa-plus"></i></span>' +
        '</a>' +
        '<div class="project-item-info">' +
          '<div class="project-item-info-content">' +
            '<h3 class="project-item-title">' +
              '<a href="projeto.html#' + encodeURIComponent(category) + '" aria-label="' + title + '">' + category + '</a>' +
            '</h3>' +
            '<a href="projeto.html#' + encodeURIComponent(category) + '" aria-label="' + title + '">' +
              '<p class="project-cat">Ver mais fotos</p>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.getElementById('project-section').appendChild(item);
  },

  // Appends a full-width image block to the category gallery page
  renderCategoryImage: function (imgUrl, title) {
    var block = document.createElement('div');
    block.className = 'col-lg-12 shuffle-item';
    block.setAttribute('id', 'img-frame');
    block.setAttribute('data-groups', '[&quot;contrucao&quot;,&quot;reforma&quot;]');
    block.innerHTML =
      '<div class="single-project-img-container">' +
        '<a class="gallery-popup" href="' + imgUrl + '">' +
          '<img class="img-fluid" src="' + imgUrl + '" alt="' + title + '" loading="lazy">' +
          '<span class="gallery-icon"><i class="fa fa-plus"></i></span>' +
        '</a>' +
      '</div><br>';
    document.getElementById('image-container').appendChild(block);
  },

  // Writes the uppercased category name into the page heading;
  // the controller is responsible for decoding the value before passing it here
  updateCategoryTitle: function (categoryId) {
    document.getElementById('title-category').innerHTML = categoryId.toUpperCase();
  },

  // Injects a spinner into the container while an async load is in progress
  showLoading: function (containerId) {
    var spinner = document.createElement('div');
    spinner.id = containerId + '-loading';
    spinner.className = 'text-center';
    spinner.style.cssText = 'padding: 40px 0; color: #999;';
    spinner.innerHTML =
      '<i class="fa fa-spinner fa-spin fa-3x"></i>' +
      '<p style="margin-top: 12px;">Carregando projetos...</p>';
    document.getElementById(containerId).appendChild(spinner);
  },

  // Removes the spinner injected by showLoading
  hideLoading: function (containerId) {
    var spinner = document.getElementById(containerId + '-loading');
    if (spinner) spinner.parentNode.removeChild(spinner);
  },

  // Replaces the container content with a user-facing error message and a WhatsApp fallback link
  showError: function (containerId) {
    var error = document.createElement('div');
    error.className = 'text-center';
    error.style.cssText = 'padding: 40px 0; color: #888;';
    error.innerHTML =
      '<i class="fa fa-exclamation-circle fa-3x"></i>' +
      '<p style="margin-top: 12px;">Não foi possível carregar os projetos.<br>' +
      'Entre em contato pelo <a href="https://wa.me/5571991202969">WhatsApp</a>.</p>';
    document.getElementById(containerId).appendChild(error);
  },

  // Binds the colorbox lightbox to all gallery links rendered so far;
  // must be called after dynamic images are injected since they aren't in the DOM on ready
  initGalleryPopup: function () {
    $('.gallery-popup').colorbox({
      rel: 'gallery-popup',
      transition: 'slideshow',
      innerHeight: '500'
    });
  }
};

// Global UI utility functions — called from inline HTML event attributes

// Filters the portfolio grid to show only the selected category,
// or reveals all cards when called with the string "showAl"
function selectProject(argument) {
  // Remove the active highlight from whichever filter button is currently selected
  var activeElements = document.getElementsByClassName('active');
  for (var i = 0; i < activeElements.length; i++) {
    if (activeElements[i].parentElement.className == 'shuffle-btn-group') {
      activeElements[i].classList.remove('active');
    }
  }
  var projects = document.querySelectorAll('.shuffle-item');

  if (typeof argument == 'string' && argument == 'showAl') {
    // "All" button: make every card visible and highlight the all-button
    document.getElementById('all').parentElement.classList.add('active');
    for (var i = 0; i < projects.length; i++) {
      projects[i].style.display = 'block';
    }
  } else {
    // Category button: show only cards whose data-groups matches the selected value
    var selectedProject = argument.getAttribute('value');
    document.getElementById(selectedProject).parentElement.classList.add('active');
    for (var i = 0; i < projects.length; i++) {
      projects[i].style.display = projects[i].getAttribute('data-groups') == selectedProject ? 'block' : 'none';
    }
  }
}

// Copies the inner text of the given element to the clipboard and alerts the user
function copyText(text) {
  var textValue = document.getElementById(text);
  navigator.clipboard.writeText(textValue.innerText);
  var message = text == 'comp-whatsapp' ? 'WhatsApp' : 'Email';
  alert(message + ' copiado: ' + textValue.innerText);
}

function displayModal(event) {
  document.getElementById('myModal-' + event).style.display = 'block';
}

function closeModal(event) {
  document.getElementById('myModal-' + event).style.display = 'none';
}

// Highlights the clicked nav link and collapses the mobile menu
function collapseNavbar(elementId) {
  var navBar = document.getElementById(elementId);
  var childs = navBar.parentElement.childNodes;
  for (var i in childs) {
    if (childs[i].className != undefined && childs[i].className.includes('active')) {
      childs[i].classList.remove('active');
    }
  }
  navBar.classList.add('active');
  navBar.parentElement.parentElement.classList.remove('show');
}

// Composes the contact form values into a WhatsApp deep-link and opens it in a new tab
function sendMessage() {
  var name = document.getElementById('name');
  var message = document.getElementById('message');
  var readyMessage = 'Aqui é ' + name.value + ', \n' + message.value;
  window.open('https://wa.me/5571991202969?text=' + encodeURIComponent(readyMessage), '_blank');
}
