function changeMenu() {
    document.getElementsByClassName("menu")[0].classList.toggle("menuEdit")
}

const url = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=da3b68c843f01e78d91a043033def649&units=imperial"
fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
        let weatherSummarySection = document.createElement('SECTION')
        let currentCondition = document.createElement('P')
        let highTemp = document.createElement('P')
        let currentTemp = document.createElement('P')
        let humidity = document.createElement('P')
        let windSpeed = document.createElement('P')
        let windChill = document.createElement('P')

        // Setting weather summary box data
        currentCondition.textContent = "Currently: " + jsObject.weather[0].main
        highTemp.textContent = "High: " + Math.round(jsObject.main.temp_max)
        currentTemp.textContent = "Current Temp: " + Math.round(jsObject.main.temp)
        humidity.textContent = "Humidity: " + Math.round(jsObject.main.humidity) + "%"
        windSpeed.textContent = "Wind Speed: " + Math.round(jsObject.wind.speed) + " mph"
        windChill.textContent = ""

        // Wind chill calculation and display
        var t = currentTemp
        var wS = windSpeed

        function windChillCalculation(t, wS) {
            if (t < 50 && wS > 3) {
                var f = Math.round(35.74 + 0.6215 * t - 35.75 * wS ** 0.16 + 0.4275 * t * wS ** 0.16, 0)
                windChill.textContent = "Wind Chill: " + f
            } else {
                windChill.textContent = "Wind Chill: N/A"
            }
        }
        windChillCalculation(t, wS)
        // Adding weather summary box data
        weatherSummarySection.appendChild(currentCondition)
        weatherSummarySection.appendChild(highTemp)
        weatherSummarySection.appendChild(currentTemp)
        weatherSummarySection.appendChild(humidity)
        weatherSummarySection.appendChild(windSpeed)
        weatherSummarySection.appendChild(windChill)

        document.getElementById("weather-summary-box").appendChild(weatherSummarySection)
    })

// Loading information into the 5 day forecast
let fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=da3b68c843f01e78d91a043033def649&units=imperial"
fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject)
        let daysOfWeather = []
        for (let i = 0; i < jsObject.list.length; i++) {
            let correctEntry = "18:00:00"
            let goodEntry = jsObject.list[i].dt_txt
            if (goodEntry.includes(correctEntry)) {
                daysOfWeather.push(jsObject.list[i])
            }
        }
        // Creating new columns to hold the temperatures
        let dayOne = document.createElement("TD")
        let dayTwo = document.createElement("TD")
        let dayThree = document.createElement("TD")
        let dayFour = document.createElement("TD")
        let dayFive = document.createElement("TD")

        // Setting the temperatures that will go into the 5 day weather summary
        dayOne.textContent = Math.round(daysOfWeather[0].main.temp)
        dayTwo.textContent = Math.round(daysOfWeather[1].main.temp)
        dayThree.textContent = Math.round(daysOfWeather[2].main.temp)
        dayFour.textContent = Math.round(daysOfWeather[3].main.temp)
        dayFive.textContent = Math.round(daysOfWeather[4].main.temp)

        // Adding icons to 5 day weather summary
        document.getElementById("icon-one").setAttribute('src', `http://openweathermap.org/img/wn/${daysOfWeather[0].weather[0].icon}@2x.png`)
        document.getElementById("icon-two").setAttribute('src', `http://openweathermap.org/img/wn/${daysOfWeather[1].weather[0].icon}@2x.png`)
        document.getElementById("icon-three").setAttribute('src', `http://openweathermap.org/img/wn/${daysOfWeather[2].weather[0].icon}@2x.png`)
        document.getElementById("icon-four").setAttribute('src', `http://openweathermap.org/img/wn/${daysOfWeather[3].weather[0].icon}@2x.png`)
        document.getElementById("icon-five").setAttribute('src', `http://openweathermap.org/img/wn/${daysOfWeather[4].weather[0].icon}@2x.png`)

        // Adding temperatures to 5 day weather summary
        document.getElementById("day-one").appendChild(dayOne)
        document.getElementById("day-two").appendChild(dayTwo)
        document.getElementById("day-three").appendChild(dayThree)
        document.getElementById("day-four").appendChild(dayFour)
        document.getElementById("day-five").appendChild(dayFive)
    });