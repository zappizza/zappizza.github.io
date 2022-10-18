$(document).ready(function(){
  console.log("Ready");
  console.log(decodeURI(window.location.href.split("/").pop()));
  var pageLocation = decodeURI(window.location.href.split("/").pop());



  function myFunction(items) {
    if (pageLocation == "index.html") {
      categories(items)
      projects(items)
    }
    else if (pageLocation.includes("#")){
      console.log("icludes!!!!")
    }
  }

  function projects(items) {
    console.log(items["projects"])
    for (var key in items["projects"]){
    }
  };

  function categories(items) {
    console.log(items["categories"])
    for (var key in items["categories"]){
      var len = items["categories"][key]["photos_ids"].length
      photo_id = items["categories"][key]["photos_ids"][len - 1] - 1

      var test_item_one = document.createElement('div');
      test_item_one.className = "col-md-6 col-lg-4";
      test_item_one.setAttribute("id", items["categories"][key]["title"]);


      test_item_one.innerHTML = `<a href="projects.html#${items["categories"][key]["title"]}">
          <div class="portfolio-item mx-auto" >
            <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
            <img class="img-fluid" src="${items["photos"][photo_id]["path"]}" alt="obras">
            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
              <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
            </div>
          </div>
        </a>`
      document.getElementById('portfolio-grid').appendChild(test_item_one);
    } // end of categories for
  } // end of categories function




  var settings = {
    "url": "https://radiant-journey-86877.herokuapp.com/photos",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "X-Requested-With": "XMLHttpRequest"
    },
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
    myFunction(response);
  });
});

function testFunction() {
  console.log("testing works");
}

