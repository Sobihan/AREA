const search = require('../search');
const fetch = require('node-fetch');

function getRandomDog(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://dog.ceo/api/breeds/image/random", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            // console.log('getRandomDog SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((dog) => {
                if (isSuccess_2 == true) {
                    // console.log('getRandomDog JSON SUCESSFUL');
                    //search.AddArgs(reactionArgs, "text", "Here is your astronomy picture of the day:\n\n\nTitled: " + apod.title + "\n" + apod.hdurl + "\n\n\n" + "Explanation: " + apod.explanation + "\n");
                    // search.AddArgs(reactionArgs, "text", "Here is your astronomy picture of the day:\n\n\nTitled: " + apod.title + "\n\n" + "Explanation: " + apod.explanation + "\n" + apod.hdurl);
                    search.changeArgs(reactionArgs, "text", "Here is your random picture of a dog:\n" + dog.message);
                    callback(reactionArgs);
                }
                // else
                //     console.log('getRandomDog JSON FAIL');
            });
        }
        // else {
        //     console.log('getRandomDog FAIL');
        // }
    });
}

module.exports.getRandomDog = getRandomDog;



function checkGetRandomDog(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetRandomDog = checkGetRandomDog;



const doggoInfo = new Map();

doggoInfo.set("[Dog] getRandomDog", {
    name: "[Dog] getRandomDog",
    description: "Give a random dog picture.",
    args: []
});

module.exports.doggoInfo = doggoInfo;