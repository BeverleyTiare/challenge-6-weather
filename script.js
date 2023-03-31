
function clearHistory() {
  localStorage.setItem("history", "[]");
  document.getElementById("search-history").innerHTML = ""
}

function writeHistory() {
  // grab the history from local storage
  let historyString = localStorage.getItem("history")
  if (!historyString) {
    localStorage.setItem("history", "[]");
  } else {

    // convert it in to an array from a string
    const history = JSON.parse(historyString)

    // clear the history element
    document.getElementById("search-history").innerHTML = ""
    
    // append a element ot the history for each param in the array
    history.forEach(searchParam => {
      const listItem = document.createElement("li");
      listItem.innerText = searchParam
      listItem.addEventListener("click", () => {
        getCityWeather(searchParam)
      })
      document.getElementById("search-history").append(listItem)
    })
  }
}
//adding item to search history ( including local storage) 
function addCityToSearchHistory(cityname) {
  let historyString = localStorage.getItem("history")
  const history = JSON.parse(historyString)
  history.push(cityname)
  localStorage.setItem("history", JSON.stringify(history));
  writeHistory()
}

function getCityWeather (cityname){
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=6cc25325826301d0c05a11f987e8648a&units=imperial`
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {

    // separate data by day
    const days = {}

    // loop through every result out of 40
    data.list.forEach(dataObj => {
      // strip the time off of the date text, so we just have the day
      const day = dataObj.dt_txt.substr(0, 10)

      // if its the first time we see this day, add it to days data
      if (!days[day]) {
        days[day] = []
      }

      // push the data in to the days data
      days[day].push(dataObj);
    });

   
    // figure out the max temp, wind and humidity for each day
    weatherDaysHigh = []
    for (const day in days) {
      // create new arrays with just the values
      const temps = days[day].map(d => d.main.temp)
      const maxTemp = Math.max(...temps)

      const winds = days[day].map(d => d.wind.speed)
      const maxWinds = Math.max(...winds)

      const humidity = days[day].map(d => d.main.humidity)
      const maxHumidity = Math.max(...humidity)
      
      // 
      weatherDaysHigh.push({
        maxTemp, maxHumidity, maxWinds, day
      })
    } 

  //Looping thru daily data and inserting into page 
    document.getElementById("Cityname").innerText = data.city.name

    for (let index = 0; index < weatherDaysHigh.length; index++) {
      document.getElementById(`Temp${index}`).innerText = "Temp " + weatherDaysHigh[0].maxTemp + "F";
      document.getElementById(`Humidity${index}`).innerText = "Humidity " + weatherDaysHigh[0].maxHumidity + "%";
      document.getElementById(`Wind${index}`).innerText = "Wind " + weatherDaysHigh[0].maxWinds + " mph"; 
      document.getElementById(`Date${index}`).innerText = "" + weatherDaysHigh[0].day + ""
    }

    addCityToSearchHistory(cityname)


  });
}


/* code run for page loading */
window.onload = function() {
  document.getElementById("searchButton").addEventListener('click',function() {
    let value = document.getElementById ("city").value;
  getCityWeather(value) 
  })
  getCityWeather("Sydney")

  document.getElementById("Clear").addEventListener("click", clearHistory)

  writeHistory()
  
};

