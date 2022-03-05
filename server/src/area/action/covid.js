const search = require('../search');
const covid = require('novelcovid');

covid.settings({
    baseUrl: 'https://disease.sh'
})

function getUpdatedInfo(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = search.args(actionArgs, "country");
    const updated = search.args(actionArgs, "updated");

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess == true) {
            console.log("coronavirus = ", JSON.stringify(coronavirus));
            if (coronavirus != null && coronavirus != undefined && coronavirus.country != undefined &&
                coronavirus.cases != undefined && coronavirus.todayCases != undefined && coronavirus.deaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.todayDeaths != undefined &&
                coronavirus.recovered != undefined && coronavirus.todayRecovered != undefined &&
                coronavirus.active != undefined && coronavirus.critical != undefined &&
                coronavirus.population != undefined && coronavirus.updated != undefined && coronavirus.updated > updated) {

                search.changeArgs(actionArgs, "updated", coronavirus.updated)
                search.AddArgs(reactionArgs, "text", "Please be aware that those informations should be taken with a grain of salt.\nYour chosen country: " + coronavirus.country + ".\nAs " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today and " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

//target active
function getOverXActive(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = search.args(actionArgs, "country");
    const updated = search.args(actionArgs, "updated");
    const threshold = search.args(actionArgs, "threshold");

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess == true) {
            if (coronavirus != null && coronavirus != undefined && coronavirus.country != undefined &&
                coronavirus.active != undefined && coronavirus.cases != undefined && coronavirus.todayCases != undefined &&
                coronavirus.deaths != undefined && coronavirus.todayDeaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.recovered != undefined &&
                coronavirus.todayRecovered != undefined && coronavirus.critical != undefined &&
                coronavirus.population != undefined && coronavirus.updated != undefined &&
                coronavirus.updated > updated && coronavirus.active >= threshold) {

                search.changeArgs(actionArgs, "updated", coronavirus.updated)
                search.AddArgs(reactionArgs, "text", "Your threshold (" + threshold + " active cases) for " + coronavirus.country + " as been reached and we have new informations about the covid-19 there.\nPlease be aware that those informations should be taken with a grain of salt.\nThey have " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today, " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

//target critical
function getOverXCritical(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const country = search.args(actionArgs, "country");
    const updated = search.args(actionArgs, "updated");
    const threshold = search.args(actionArgs, "threshold");

    covid.countries({country: country})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((coronavirus) => {
        if (isSuccess == true) {
            if (coronavirus != null && coronavirus != undefined && coronavirus.country != undefined &&
                coronavirus.active != undefined && coronavirus.cases != undefined && coronavirus.todayCases != undefined &&
                coronavirus.deaths != undefined && coronavirus.todayDeaths != undefined &&
                coronavirus.todayDeaths != undefined && coronavirus.recovered != undefined &&
                coronavirus.todayRecovered != undefined && coronavirus.critical != undefined &&
                coronavirus.population != undefined && coronavirus.updated != undefined &&
                coronavirus.updated > updated && coronavirus.critical >= threshold) {

                search.changeArgs(actionArgs, "updated", coronavirus.updated)
                search.AddArgs(reactionArgs, "text", "Your threshold (" + threshold + " critical cases) for " + coronavirus.country + " as been reached and we have new informations about the covid-19 there.\nPlease be aware that those informations should be taken with a grain of salt.\nThey have " + coronavirus.cases + " cases with " + coronavirus.todayCases + " today, " + coronavirus.deaths + " deaths with " + coronavirus.todayDeaths + " today, " + coronavirus.recovered + " peoples recovered with " + coronavirus.todayRecovered + " today.\nThey currently have " + coronavirus.active + " active cases from wich " + coronavirus.critical + " are critical.\nThey have a population of " + coronavirus.population + " people.\nThos information comes from disease.sh.");
                callback(reactionArgs);
            }
        }
    });
}

module.exports.getUpdatedInfo = getUpdatedInfo;
module.exports.getOverXActive = getOverXActive;
module.exports.getOverXCritical = getOverXCritical;


function checkGetUpdatedInfo(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "updated", 0);
    if (search.args(actionArgs, "country") == null)
        return false;
    return true;
}

function checkGetOverX(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "updated", 0);
    if (search.args(actionArgs, "country") == null || search.args(actionArgs, "threshold") == null || !Number.isInteger(search.args(actionArgs, "threshold")))
        return false;
    return true;
}

module.exports.checkGetUpdatedInfo = checkGetUpdatedInfo;
module.exports.checkGetOverX = checkGetOverX;



const covidInfo = new Map();

covidInfo.set("getUpdatedInfo", {
    name: "getUpdatedInfo",
    description: "Informs you of the latest covid information for the chosen country.",
    args: [
        {country: "The requested streamer channel name."}
    ]
});

covidInfo.set("getOverXActive", {
    name: "getOverXActive",
    description: "Informs you of the latest covid information for the chosen country. When the number of active cases reach the threshold.",
    args: [
        {country: "The requested streamer channel name."},
        {threshold: "The requested streamer channel name."}
    ]
});

covidInfo.set("getOverXCritical", {
    name: "getOverXCritical",
    description: "Informs you of the latest covid information for the chosen country. When the number of critical cases reach the threshold.",
    args: [
        {country: "The requested streamer channel name."},
        {threshold: "The requested streamer channel name."}
    ]
});

module.exports.covidInfo = covidInfo;