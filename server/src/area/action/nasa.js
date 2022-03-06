const search = require('../search');
const fetch = require('node-fetch');

function getAPOD(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.nasa.gov/planetary/apod?api_key=6eCKaKJ3S6MhXUEMr3DDhcphb5Qbl1DohqPezjGB", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            // console.log('getAPOD SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((apod) => {
                if (isSuccess_2 == true) {
                    // console.log('getAPOD JSON SUCESSFUL');
                    //search.AddArgs(reactionArgs, "text", "Here is your astronomy picture of the day:\n\n\nTitled: " + apod.title + "\n" + apod.hdurl + "\n\n\n" + "Explanation: " + apod.explanation + "\n");
                    search.changeArgs(reactionArgs, "text", "Here is your astronomy picture of the day:\n\n\nTitled: " + apod.title + "\n\n" + "Explanation: " + apod.explanation + "\n" + apod.hdurl);
                    callback(reactionArgs);
                }
                // else
                //     console.log('getAPOD JSON FAIL');
            });
        }
        // else {
        //     console.log('getAPOD FAIL');
        // }
    });
}

module.exports.getAPOD = getAPOD;



function checkGetAPOD(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetAPOD = checkGetAPOD;



const nasaInfo = new Map();

nasaInfo.set("[NASA] getAPOD", {
    name: "[NASA] getAPOD",
    description: "With the nasa gives the astronomy picture of the day.",
    args: []
});

module.exports.nasaInfo = nasaInfo;