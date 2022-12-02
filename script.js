let clientID = "JrGOuFlLG6bDAqhHZA4OWFyGmqk0DDYu2P4MJ_aEMGA";
let endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientID}`;
fetch(endpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.urls.regular);

    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
  });

// object weather
let weather = {
  apiKey: "61021a8c5e205c1bae033fd2204cf4a6",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
// Duisburg: "lat":51.434999,"lon":6.759562,"country":"DE","state":"North Rhine-Westphalia"
// https:api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?q=Duisburg&units=metric&appid=61021a8c5e205c1bae033fd2204cf4a6
weather.fetchWeather("Duisburg");
