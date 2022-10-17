$(document).ready(function(){
  console.log("Ready");

  var collections_obj = null

  function myFunction(items) {
    // console.log(items["categories"])
    for (var key in items["categories"]){
      // console.log(key);
      console.log(items["categories"][key]["title"])
      console.log(items["categories"][key])
      var len = items["categories"][key]["photos_ids"].length
      console.log(items["categories"][key]["photos_ids"][len - 1])
      photo_id = items["categories"][key]["photos_ids"][len - 1]
      console.log(items["photos"])


      for (var photo_key in items["photos"]){
        // if (photo_id == items["photos"][photo_key]["id"]) {
        //   console.log(items["photos"][photo_key]["path"])
        //   img.src = items["photos"][photo_key]["path"];
        // };


        var test_item_one = document.createElement('div');
        test_item_one.className = "col-md-6 col-lg-4";

        test_item_one.innerHTML = `<a href="projects.html">
            <div class="portfolio-item mx-auto" >
              <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
              <img class="img-fluid" src="${items["photos"][photo_key]["path"]}" alt="obras">
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <h3 class="first-txt text-uppercase">${items['categories'][key]['title']}</h3>
              </div>
            </div>
          </a>`
        document.getElementById('portfolio-grid').appendChild(test_item_one);
      } // end of photo for
    } // end of categories for
  } // end of myFunction


  console.log(collections_obj)




  // var settings = {
  //   "url": "https://radiant-journey-86877.herokuapp.com/photos",
  //   "method": "GET",
  //   "timeout": 0,
  //   "headers": {
  //     "X-Requested-With": "XMLHttpRequest"
  //   },
  // };

  // $.ajax(settings).done(function (response) {
  //   // console.log(response);
  //   myFunction(response);
  // });
});


collections(result => {
  collections_obj = result;
});

function collections (callback) {
  var api_response = null;
  var settings = {
    "url": "https://radiant-journey-86877.herokuapp.com/photos",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: callback
  };

  $.ajax(settings).done(function (response) {
    return response;
  });
}


