const search = require('../search');
const fetch = require('node-fetch');

function getRandomCat(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.thecatapi.com/v1/images/search", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getRandomCat SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((cat) => {
                if (isSuccess_2 == true) {
                    console.log('getRandomCat JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random picture of a cat:\n" + cat[0].url);
                    callback(reactionArgs);
                }
                else
                    console.log('getRandomCat JSON FAIL');
            });
        }
        else {
            console.log('getRandomCat FAIL');
        }
    });
}

module.exports.getRandomCat = getRandomCat;



function checkGetRandomCat(userToken, actionArgs)
{
    return true;
}

module.exports.checkGetRandomCat = checkGetRandomCat;



const catInfo = new Map();

catInfo.set("getRandomCat", {
    name: "getRandomCat",
    description: "Give a random cat picture",
    args: []
});

module.exports.catInfo = catInfo;