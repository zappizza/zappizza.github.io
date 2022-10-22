$(document).ready(function(){
  console.log("Ready");
  console.log(decodeURI(window.location.href.split("/").pop()));
  var pageLocation = decodeURI(window.location.href.split("/").pop());


  function myFunction(items) {
    console.log(items)
    if (pageLocation == "index.html") {
      document.getElementById("home_default").style.display = 'none';
      document.getElementById("home_carousel").style.display = 'block';
      categories(items)
      // photosCategory(items)
      // courselHeader(items)
    }
    else if (pageLocation.includes("#")){
      console.log("icludes!!!!")
      category = pageLocation.split("#").pop()
      photosCategory(items, category)
    }
  }

  function courselHeader(items) {
    // console.log(items["projects"])
    // for (var key in items["projects"]){
    //   console.log(items["projects"][key])
    //   // Needs to with Nen if we will have project section
    // }
  };


  function photosCategory(items, category) {

    var photos = []
    for (var key in items["categories"]){
      if (items["categories"][key]["title"] == category) {
        console.log("Category found")
        photos = items["categories"][key]["photos_ids"]
      }
    }
    console.log(photos)
    for (photo in items["photos"]) {
      if (photos.includes(items["photos"][photo]["id"])){
        console.log(items["photos"][photo])
        var imageBlock = document.createElement('div');
        imageBlock.className = "col-md-6 col-lg-4 photo-pad";

        imageBlock.innerHTML = `<div class="portfolio-item mx-auto">
          <p class="text-center mb-0 lead">${items["photos"][photo]["title"]}</p>
          <img class="img-fluid-projetos" src="${items["photos"][photo]["path"]}" alt="${items["photos"][photo]["title"]}">
        </div>`

        document.getElementById("image-section").appendChild(imageBlock);
      }
    }
  };

  function categories(items) {
    // console.log(items["categories"])
    for (var key in items["categories"]){
      var len = items["categories"][key]["photos_ids"].length
      photo_id = items["categories"][key]["photos_ids"][len - 1]

      for (var photo in items["photos"]){
        if (items["photos"][photo]["id"] == photo_id) {

          // Set carousel photos header
          var courselImage = document.createElement('div');
          var classesCoursel = ""
          if (key == 1) {
            classesCoursel = "carousel-item position-relative active";
          } else {
            classesCoursel = "carousel-item position-relative";
          }
          courselImage.className = classesCoursel;
          courselImage.style.setProperty('height', '100vh');
          courselImage.style.setProperty('min-height', '400px');

          courselImage.innerHTML = `<img class="position-absolute w-100 h-100" src="${items["photos"][photo]["path"]}" style="object-fit: cover;">
            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div class="p-3" style="max-width: 900px;">
                  <strong>
                    <h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">${items["categories"][key]["title"]}</h4>
                    <h3 class="display-2 font-secondary text-white mb-4">${items["photos"][photo]["tag"]}</h3>
                  </strong>
                </div>
            </div>`
          document.getElementById("coursel-wrapper").appendChild(courselImage);

          // Set photos by categories on home page
          var test_item_one = document.createElement('div');
          test_item_one.className = "col-md-6 col-lg-4";
          test_item_one.setAttribute("id", items["categories"][key]["title"]);
          test_item_one.innerHTML = `<a href="projects.html#${items["categories"][key]["title"]}">
              <div class="portfolio-item mx-auto" >
                <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
                <img class="img-fluid" src="${items["photos"][photo]["path"]}" alt="obras">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
                </div>
              </div>
            </a>`
          document.getElementById('portfolio-grid').appendChild(test_item_one);
        }
      }
    } // end of categories for
  } // end of categories function




  var settings = {
    "url": "https://radiant-journey-86877.herokuapp.com/photos",
    "method": "GET",
    "timeout": 0,
    crossDomain: true,

  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
    myFunction(response);
  });
});

function testFunction() {
  console.log("testing works");
}

