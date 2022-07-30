//STEP 0:
//--select an html element
var searchBtn = document.getElementById("search-button");
var inputCity = document.getElementById("input-field");

var searchedCityNames =
  JSON.parse(localStorage.getItem("searchedCityNames")) || [];
console.log(searchedCityNames);
//STEP 1:
//--when the user inputs a city the button will use the search city to look for appropriate data
//A. once the button is clicked, make it so it can listen to that user event
searchBtn.addEventListener("click", function () {
  //B. once the button is clicked, collect input data
  var city = inputCity.value;

  //STEP 2:
  //--using the search city, will request info from a third party source
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e724a8c2efe87cb7d11167a88760999b`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!searchedCityNames.includes(data[0].name)) {
        searchedCityNames.push(data[0].name);
        localStorage.setItem(
          "searchedCityNames",
          JSON.stringify(searchedCityNames)
        );
        renderSavedCities();
      }
      fetchCurrentWeather(data[0].lat, data[0].lon);
      weatherForecast(data[0].lat, data[0].lon);
    })
    .catch(function (err) {
      console.log(err);
    });
});

function fetchCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e724a8c2efe87cb7d11167a88760999b`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(data);
      displayCurrentData(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function weatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e724a8c2efe87cb7d11167a88760999b`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.list);
      displayForecast(data.list);
      for (let i = 4; i < data.list.length; i += 8) {
        // console.log(data.list[i]);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

renderSavedCities();

function renderSavedCities() {
  document.getElementById("city-list").innerHTML = "";

  //getItem out of local storage
  var arrayFromStorage =
    JSON.parse(localStorage.getItem("searchedCityNames")) || [];

  //loop over the array from LS, create a button for each one
  for (let index = 0; index < arrayFromStorage.length; index++) {
    var citySearched = document.createElement("button");
    citySearched.textContent = arrayFromStorage[index];
    document.getElementById("city-list").append(citySearched);
  }
}

//STEP 3:
//--once the data is retreived, will populate said data and display on page
var tempLi = document.querySelector(".temp");
var windLi = document.querySelector(".wind");
var humidityLi = document.querySelector(".humidity");
var currentDayIcon = document.querySelector(".icon");

function displayCurrentData(data) {
  // console.log(data.main.temp);
  tempLi.textContent = "Temp: " + data.main.temp + "°F";
  windLi.textContent = "Wind: " + data.wind.speed + " MPH";
  humidityLi.textContent = "Humidity: " + data.main.humidity + " %";
  currentDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
}

var cardsContainer = document.querySelector(".cardsContainer");

function displayForecast(data) {
  for (var i = 1; i < 6; i++) {
    var cards = document.createElement("div");
    cards.setAttribute("class", "col-2");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var unorderedLi = document.createElement("ul");
    unorderedLi.setAttribute("class", "forecast-list");
    var tempLi = document.createElement("li");
    tempLi.textContent = "Temp: " + data[i].main.temp + "°F";
    var dateLi = document.createElement("li");
    dateLi.textContent = "Date: " + data[i].dt_txt;
    var iconLi = document.createElement("li");
    // iconLi.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    var windLi = document.createElement("li");
    windLi.textContent = "Wind: " + data[i].wind.speed + " MPH";
    var humidityLi = document.createElement("li");
    humidityLi.textContent = "Humidity: " + data[i].main.humidity + " %";
    unorderedLi.appendChild(dateLi);
    unorderedLi.appendChild(iconLi);
    unorderedLi.appendChild(tempLi);
    unorderedLi.appendChild(windLi);
    unorderedLi.appendChild(humidityLi);
    card.appendChild(unorderedLi);
    cards.appendChild(card);
    cardsContainer.appendChild(cards);
  }
}
