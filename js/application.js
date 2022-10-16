$(document).ready(function(){
  console.log("Ready");

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
        console.log(items["photos"][photo_key]["path"])

        var img = document.createElement('img');
        img.src = items["photos"][photo_key]["path"];

        img.className = "img-fluid";
        var projectLink = document.createElement('a');
        projectLink.setAttribute('href', "projects.html");
        var text = document.createTextNode(items["categories"][key]["title"]);
        projectLink.appendChild(text);
        projectLink.appendChild(img)
        var portfolio_item = document.createElement('div');
        portfolio_item.className = "portfolio-item mx-auto";
        portfolio_item.appendChild(projectLink)

        var item_one = document.createElement('div');
        item_one.className = "col-md-6 col-lg-4";
        item_one.appendChild(portfolio_item)

        document.getElementById('portfolio-grid').appendChild(item_one);
      }







      // console.log(item_one)

    }
  }


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


