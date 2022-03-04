const search = require('../search');
const fetch = require('node-fetch');

//temperature
function overXTemperature(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const temperature = search.args(actionArgs, "temperature");
    const city = search.args(actionArgs, "city");
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric";

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(URL, options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            // console.log('getRandomCat SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.main.humidity != undefined && weather.wind.speed != undefined && weather.main.temp >= temperature) {
                    // console.log('getRandomCat JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "The current temperature is " + weather.main.temp + ", but it feels like " + weather.main.feels_like + ", the humidity is " + weather.main.humidity + "% and the wind speed is " + weather.wind.speed + ".");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//bellow X

//cloudinesse

//vissibility

//wind speed

//At X(Date or worldtimeapi) send weather broadcast


module.exports.overXTemperature = overXTemperature;



function checkOverXTemperature(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);

    if (search.args(actionArgs, "city") == null || search.args(actionArgs, "temperature") == null || !Number.isInteger(search.args(actionArgs, "temperature")))
        return false;

    return true;
}

module.exports.checkOverXTemperature = checkOverXTemperature;



const weatherInfo = new Map();

weatherInfo.set("overXTemperature", {
    name: "overXTemperature",
    description: "Give information if the current temperature is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {temperature: "the temperature threshold you wish to use."}
    ]
});

module.exports.weatherInfo = weatherInfo;