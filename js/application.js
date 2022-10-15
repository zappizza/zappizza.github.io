$(document).ready(function(){
  console.log("Ready");

  function myFunction(items) {
    for (var key in items){
      console.log(key);
      console.log(items[key])
      // if (key == "name") doSomething();



      var img = document.createElement('img');
      img.src = 'img/portfolio/obra.png';
      img.className = "img-fluid";
      var projectLink = document.createElement('a');
      projectLink.setAttribute('href', "projects.html");
      // projectLink.appendChild(createAText);
      projectLink.appendChild(img)
      var portfolio_item = document.createElement('div');
      portfolio_item.className = "portfolio-item mx-auto";
      portfolio_item.appendChild(projectLink)

      var item_one = document.createElement('div');
      item_one.className = "col-md-6 col-lg-4";
      item_one.appendChild(portfolio_item)

      document.getElementById('portfolio-grid').appendChild(item_one);


      // console.log(item_one)

    }
  }


  var settings = {
    "url": "http://127.0.0.1:3000/photos",
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


