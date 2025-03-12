let searchBar = document.getElementById('userInput')
const Searchbutton = document.getElementById('button')
const API_KEY = "36421c0e4d02fd00584284434afe866a"

fetchweather("bengaluru")

// let apiData;
// let description;
// let currentcity;
// let wind_speed;
// let windSpeedInKm;
// let humidity;
let forecastData;
// let forecastTime;
// let timern;

Searchbutton.addEventListener('click', function (){
     let CITY_NAME = document.getElementById('userInput').value
     console.log(CITY_NAME)
    fetchweather(CITY_NAME);
})

function fetchweather(CITY_NAME){
    const currentweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
    fetch(currentweatherURL)
    .then(response => response.json())
    .then(data => {
        apiData = data
        displayweather(apiData)
        forecastweather(CITY_NAME)
    })
    .catch(error => console.log("ERROR: ", error))
}

function currentTime (){
    let date = new Date()
    let time = date.toLocaleString('en-IN',{timeZone: 'Asia/Kolkata', year:'numeric',month:'long',day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})
    console.log(time)
    document.getElementById('current-time').textContent = `${time}`
}
currentTime()

function windspeedcalc(wind_speed){
    windSpeedInKm =  (wind_speed * 3.6).toFixed(2);
    return windSpeedInKm
}

function time(forecastTime){
     timern = new Date (forecastTime).toLocaleString('en-IN',{hour: '2-digit', minute: '2-digit', hour12: true})
}

function displayweather(apiData){

    let iconCode = apiData.weather[0].icon
    const imageURL =  `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    let currentcity = document.getElementById('cityname')
    let weathericon = document.getElementById('weathericon')
    let temperature = document.getElementById('temperature')
    let wind = document.getElementById('wind')
    let humidity = document.getElementById('humidity')
    let description = document.getElementById('description')

    windspeedcalc(apiData.wind.speed)

    currentcity.textContent = `${apiData.name}`
    weathericon.innerHTML = `<img src="${imageURL}" alt="weather image"/>`
    temperature.innerHTML = `<p>${apiData.main.temp}&deg;C</p>`
    wind.textContent = `Wind Speed: ${windSpeedInKm} Km/hr`
    humidity.textContent = `Humidity: ${apiData.main.humidity} %`
    description.textContent = `${apiData.weather[0].description}`
    
}

function forecastweather(CITY_NAME){

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        forecastData = data
        displayforecast(forecastData)
    })
    .catch(error => console.log(`${error}`))
}

function displayforecast(forecastData){

    for (let i = 0; i < 5; i++) {
        forecastTime = forecastData.list[i].dt_txt
        time(forecastTime)
    
        let time1 = document.getElementById(`time${i}`) 
        let img = document.getElementById(`img${i}`)
        let imgicon = forecastData.list[i].weather[0].icon
        let imgurl = `https://openweathermap.org/img/wn/${imgicon}@4x.png`
        let temperature = forecastData.list[i].main.temp
        let temp = document.getElementById(`temp${i}`)
    
    
        time1.textContent = timern
        img.src = imgurl
        temp.innerHTML = `<p>${temperature}&deg;C</p>`
        
        
    }
    // forecastTime = forecastData.list[0].dt_txt
    // time(forecastTime)

    // let time1 = document.getElementById('time1') 
    // let img1 = document.getElementById('img1')
    // let img = forecastData.list[0].weather[0].icon
    // let imgurl = `https://openweathermap.org/img/wn/${img}.png`
    // let temp = forecastData.list[0].main.temp
    // let temp1 = document.getElementById('temp1')


    // time1.textContent = timern
    // img1.src = imgurl
    // temp1.innerHTML = `<p>${temp}&deg;C</p>`
}


