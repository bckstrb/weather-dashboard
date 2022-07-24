//STEP 0:
//--select an html element
var searchBtn = document.getElementById("search-button");
var inputCity = document.getElementById("input-field");

//STEP 1:
//--when the user inputs a city the button will use the search city to look for appropriate data
//A. once the button is clicked, make it so it can listen to that user event
searchBtn.addEventListener("click", function () {
  //B. once the button is clicked, collect input data
  var city = inputCity.value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e724a8c2efe87cb7d11167a88760999b`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        fetchCurrentWeather(data[0].lat, data[0].lon)
    })
    .catch(function (err) {
      console.log(err);
    });
});

function fetchCurrentWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e724a8c2efe87cb7d11167a88760999b`)
    .then (function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })
    .catch(function (err){
        console.log(err);
    })
}

//STEP 2:
//--using the search city, will request info from a third party source

//STEP 3:
//--once the data is retreived, will populate said data and display on page
