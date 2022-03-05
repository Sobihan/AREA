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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.main.humidity != undefined && weather.wind.speed != undefined && weather.main.temp >= temperature) {
                    search.AddArgs(reactionArgs, "text", "The current temperature is above your threshold of " + temperature + "°C, it's " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C, the humidity is " + weather.main.humidity + "% and the wind speed is " + weather.wind.speed + "km/h.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//below X
function belowXTemperature(actionArgs, callback, reactionArgs)
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.main.humidity != undefined && weather.wind.speed != undefined && weather.main.temp <= temperature) {
                    search.AddArgs(reactionArgs, "text", "The current temperature is below your threshold of " + temperature + "°C, it's " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C, the humidity is " + weather.main.humidity + "% and the wind speed is " + weather.wind.speed + "km/h.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//humidity (over/below)
function overXHumidity(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const humidity = search.args(actionArgs, "humidity");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.main.humidity != undefined && weather.main.humidity >= humidity) {
                    search.AddArgs(reactionArgs, "text", "The current humidity is above your threshold of " + humidity + "%, it's " + weather.main.humidity + "%, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

function belowXHumidity(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const humidity = search.args(actionArgs, "humidity");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.main.humidity != undefined && weather.main.humidity <= humidity) {
                    search.AddArgs(reactionArgs, "text", "The current humidity is below your threshold of " + humidity + "%, it's " + weather.main.humidity + "%, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}


//vissibility
function overXVisibility(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const visibility = search.args(actionArgs, "visibility");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.visibility != undefined && weather.visibility >= visibility) {
                    search.AddArgs(reactionArgs, "text", "The current visibility is above your threshold of " + visibility + "km, it's " + weather.visibility + "km, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

function belowXVisibility(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const visibility = search.args(actionArgs, "visibility");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.visibility != undefined && weather.visibility <= visibility) {
                    search.AddArgs(reactionArgs, "text", "The current visibility is below your threshold of " + visibility + "km, it's " + weather.visibility + "km, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//wind speed
function overXWindSpeed(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const windSpeed = search.args(actionArgs, "windSpeed");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.wind.speed != undefined && weather.wind.speed >= windSpeed) {
                    search.AddArgs(reactionArgs, "text", "The current speed of the wind is above your threshold of " + windSpeed + "km/h, it's " + weather.wind.speed + "km/h, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

function belowXWindSpeed(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const windSpeed = search.args(actionArgs, "windSpeed");
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
            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((weather) => {
                if (isSuccess_2 == true && weather != null && weather != undefined && weather.main.temp != undefined && weather.main.feels_like != undefined && weather.wind.speed != undefined && weather.wind.speed <= windSpeed) {
                    search.AddArgs(reactionArgs, "text", "The current speed of the wind is below your threshold of " + windSpeed + "km/h, it's " + weather.wind.speed + "km/h, the current temperature is " + weather.main.temp + "°C, but it feels like " + weather.main.feels_like + "°C.");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//At X(Date or worldtimeapi) send weather broadcast


module.exports.overXTemperature = overXTemperature;
module.exports.belowXTemperature = belowXTemperature;
module.exports.overXHumidity = overXHumidity;
module.exports.belowXHumidity = belowXHumidity;
module.exports.overXVisibility = overXVisibility;
module.exports.belowXVisibility = belowXVisibility;
module.exports.overXWindSpeed = overXWindSpeed;
module.exports.belowXWindSpeed = belowXWindSpeed;



function checkXTemperature(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);

    if (search.args(actionArgs, "city") == null || search.args(actionArgs, "temperature") == null || !Number.isInteger(search.args(actionArgs, "temperature")))
        return false;

    return true;
}

function checkXHumidity(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);

    if (search.args(actionArgs, "city") == null || search.args(actionArgs, "humidity") == null || !Number.isInteger(search.args(actionArgs, "humidity")))
        return false;

    return true;
}

function checkXVisibility(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);

    if (search.args(actionArgs, "city") == null || search.args(actionArgs, "visibility") == null || !Number.isInteger(search.args(actionArgs, "visibility")))
        return false;

    return true;
}

function checkXWindSpeed(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);

    if (search.args(actionArgs, "city") == null || search.args(actionArgs, "windSpeed") == null || !Number.isInteger(search.args(actionArgs, "windSpeed")))
        return false;

    return true;
}

module.exports.checkXTemperature = checkXTemperature;
module.exports.checkXHumidity = checkXHumidity;
module.exports.checkXVisibility = checkXVisibility;
module.exports.checkXWindSpeed = checkXWindSpeed;



const weatherInfo = new Map();

weatherInfo.set("overXTemperature", {
    name: "overXTemperature",
    description: "Give information if the current temperature (°C) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {temperature: "the temperature (°C) threshold you wish to use."}
    ]
});

weatherInfo.set("belowXTemperature", {
    name: "belowXTemperature",
    description: "Give information if the current temperature (°C) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {temperature: "the temperature (°C) threshold you wish to use."}
    ]
});

weatherInfo.set("overXHumidity", {
    name: "overXHumidity",
    description: "Give information if the current humidity (%) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {humidity: "the humidity (%) threshold you wish to use."}
    ]
});

weatherInfo.set("belowXHumidity", {
    name: "belowXHumidity",
    description: "Give information if the current humidity (%) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {humidity: "the humidity (%) threshold you wish to use."}
    ]
});

weatherInfo.set("overXVisibility", {
    name: "overXVisibility",
    description: "Give information if the current visibility (km) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {visibility: "the visibility (km) threshold you wish to use."}
    ]
});

weatherInfo.set("belowXVisibility", {
    name: "belowXVisibility",
    description: "Give information if the current visibility (km) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {visibility: "the visibility (km) threshold you wish to use."}
    ]
});

weatherInfo.set("overXWindSpeed", {
    name: "overXWindSpeed",
    description: "Give information if the current speed of the wind (km/h) is above your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {windSpeed: "the speed (km/h) threshold you wish to use."}
    ]
});

weatherInfo.set("belowXWindSpeed", {
    name: "belowXWindSpeed",
    description: "Give information if the current speed of the wind (km/h) is below your threshold.",
    args: [
        {city: "the city you wish to monitor."},
        {windSpeed: "the speed (km/h) threshold you wish to use."}
    ]
});

module.exports.weatherInfo = weatherInfo;