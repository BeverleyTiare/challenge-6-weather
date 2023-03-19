// Init function
//const apiURL = "api.openweathermap.org/data/2.5/forecast?lat=-33.82106872866662&lon=151.24032610117854&appid=6cc25325826301d0c05a11f987e8648a"
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=sydney&appid=6cc25325826301d0c05a11f987e8648a"
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => console.log(data));
  //let units = "metric";

function getCityWeather (cityname);

//Init day.js
let now =dayjs();
let currentDate = now.format("dddd MMM. D, YYYY");

//Init local storage + current city data
let city =[];
let currentCity =[];

/* TODOS
function: 
set date
init search
load ciies
get weather predictions: 5 day from APIs
API calls: current weather + 5 day : temp, hmdity, BP
save city in local storage
event listener 


