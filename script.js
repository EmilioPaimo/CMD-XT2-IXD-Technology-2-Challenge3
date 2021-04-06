const api = {
    //gebruik eigen "key"
    key: "13fd6eddc98e4189306463ac05f3da33",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput(event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
}

function displayData(response) {
    // console.log(response);
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

function mapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGlvcGFpbW8iLCJhIjoiY2tuNHg0cmJ6MDcwZzJucDgxeTM0ZGF0YSJ9.c_NY2nAB-rduEPjXKdiPMA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [4.288788, 52.078663],
    zoom: 8
    });

    // Add the control to the map.
    var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    });
     
    document.getElementById('locate').appendChild(geocoder.onAdd(map));
}

mapbox();
