const search = require('../search');
const fetch = require('node-fetch');

function getRandomFox(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://randomfox.ca/floof/", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getRandomFox SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((fox) => {
                if (isSuccess_2 == true) {
                    console.log('getRandomFox JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random picture of a fox:\n" + fox.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getRandomFox JSON FAIL');
            });
        }
        else {
            console.log('getRandomFox FAIL');
        }
    });
}

module.exports.getRandomFox = getRandomFox;



function checkGetRandomFox(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetRandomFox = checkGetRandomFox;



const foxInfo = new Map();

foxInfo.set("getRandomCat", {
    name: "getRandomCat",
    description: "Give a random cat picture",
    args: []
});

module.exports.foxInfo = foxInfo;