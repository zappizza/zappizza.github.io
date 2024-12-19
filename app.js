function selectProject(argument) {
    var active_element = document.getElementsByClassName("active")
    // remove highlight class from project not active)
    for (var i = 0; i < active_element.length; i++){
      if (active_element[i].parentElement.className == "shuffle-btn-group"){
        active_element[i].classList.remove("active")
      }
    }
    projects = document.querySelectorAll(".shuffle-item")

    // SHOW ALL PROJECTS
    if (typeof(argument) == "string" && argument == "showAl"){
      var show_all = document.getElementById("all").parentElement
      show_all.classList.add("active") // Highlight the selected element
      for (var i = 0; i < projects.length; i++) {
        projects[i].style.display = "block";
      }
    }
    else { // SHOW ONLY SELECTED PROJECT
      var selectedProject = argument.getAttribute("value")
      var prj_element = document.getElementById(selectedProject).parentElement
      prj_element.classList.add("active") // Highlight the selected element
      for (var i = 0; i < projects.length; i++) {
        projects[i].style.display = "none";
        if (projects[i].getAttribute("data-groups") == selectedProject) {
          projects[i].style.display = "block";
        }
      }

    }
  }

  function copyText(text) {
    // Get the text field
    var textValue = document.getElementById(text);
    // Copy the text inside the text field
    navigator.clipboard.writeText(textValue.innerText);
    // Alert the copied text
    var message = "Email"
    if (text == "comp-whatsapp"){
      message = "WhatsApp"
    }
    alert(message + " copiado: " + textValue.innerText);
  }

  function displayModal(event) {
    modal = document.getElementById("myModal-" + event)
    modal.style.display = "block";
  }

  function closeModal(event) {
    modal = document.getElementById("myModal-" + event)
    modal.style.display = "none";
  }

  $(document).ready(function(){
    var counter = 0;
    function add_img(image){

      counter += 1;
      // collect image properties:
      var domain = "https://res.cloudinary.com/nuci/image/upload/" + "v" + image.version
      var img_url = domain  + "/" + encodeURIComponent(image.public_id) + "." + image.format
      var description = image["context"]["custom"]["alt"]
      var title = image["context"]["custom"]["caption"]
      var project = image.public_id.split("/")[0]
      var category = image["context"]["custom"]["Categoria"]
      var descricao = image["context"]["custom"]["descricao"]

      var img_section = image["context"]["custom"]["local"].replace(" ","").replace(" ","").replace(" ","").split(",")

      if (img_section.includes("projeto")){
        prjectCategory = category.replace(/\s+/g, '')
        prjectCategoryTitle = category
        var shuffle_item = document.createElement('label')
        shuffle_item.setAttribute('for', prjectCategory+counter)

        shuffle_item.innerHTML = `<input onclick="selectProject(${prjectCategory+counter})" type="radio" name="shuffle-filter" id="${prjectCategory+counter}" value="${prjectCategory+counter}">${prjectCategoryTitle}`
        document.getElementById('shuffler-section').appendChild(shuffle_item)

        var project_item = document.createElement('div');
        project_item.className = "col-lg-4 col-md-6 shuffle-item";
        console.log(project)
        shuffle_selector = prjectCategory+counter
        project_item.setAttribute('data-groups', shuffle_selector)
        project_item.innerHTML = `
          <div class="project-img-container">
            <a class="gallery-popup" href="${img_url}" aria-label="${title}">
              <img class="img-fluid" src="${img_url}" alt="${title}">
              <span class="gallery-icon"><i class="fa fa-plus"></i></span>
            </a>
            <div class="project-item-info">
              <div class="project-item-info-content">
                <h3 class="project-item-title">
                  <a href="projeto.html#${encodeURIComponent(category)}" aria-label="${title}">${category}</a>
                </h3>
                <a href="projeto.html#${encodeURIComponent(category)}" aria-label="${title}">
                  <p class="project-cat">Ver mais fotos</p>
                </a>
              </div>
            </div>
          </div>`
          // ${encodeURIComponent(project)}
        document.getElementById('project-section').appendChild(project_item);
      }
    }

    function populate_homepage(argument) {
      if ("resources" in argument){

        // loop through each resource
        var images = argument["resources"]
        for (var i in images){
          // check if custom field "local" in context
          if ("context" in images[i]){
            if ("local" in images[i]["context"]["custom"]){
              // remove default page header to later add carousel
              add_img(images[i])
            }
          }
        }
      }
    }

    var settings = {
      "url": "https://res.cloudinary.com/nuci/image/list/inicio.json",
      "method": "GET",
      "timeout": 0,
      crossDomain: true,
    };

    $.ajax(settings).done(function (response) {
      // console.log(response)
      populate_homepage(response)
    });
  });

  // colapse nav-bar after clicking on option and highlight
  function collapseNavbar(elementId){
    var navBar = document.getElementById(elementId)
    ulParent = navBar.parentElement  // Get parent node
    var childs = ulParent.childNodes  // Get all child in from the parent node
    // Loop over each child to find and remove the active class
    for (i in childs) {
      if (childs[i].className != undefined && childs[i].className.includes("active")){
        childs[i].classList.remove("active")
      }
    }
    navBar.classList.add("active")
    var divParent = navBar.parentElement.parentElement
    divParent.classList.remove("show")
  }

  function sendMessage(){        
    var name = document.getElementById("name")
    var message = document.getElementById("message")
    var readyMessage = "Aqui é " + name.value + ", \n" + message.value
    var url = "https://wa.me/5571991202969?text=" + encodeURIComponent(readyMessage)
    window.open(url, "_blank")
  }