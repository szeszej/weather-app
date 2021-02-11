console.log("Client side js loaded!");

const form = document.querySelector("form");
const search = document.querySelector("input");
let locationParagraph = document.getElementById("location");
let forecastParagraph = document.getElementById("forecast");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  locationParagraph.innerHTML = "Loading weather...";
  forecastParagraph.innerHTML = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationParagraph.innerHTML = data.error;
      } else {
        locationParagraph.innerHTML = data.location;
        forecastParagraph.innerHTML = data.forecast;
      }
    });
  });
});
