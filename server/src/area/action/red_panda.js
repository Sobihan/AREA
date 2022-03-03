const search = require('../search');
const fetch = require('node-fetch');

function getRandomRedPanda(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animal/red_panda", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getRandomRedPanda SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((red_panda) => {
                if (isSuccess_2 == true) {
                    console.log('getRandomRedPanda JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random red panda and a fact about them:\n" + red_panda.fact + "\n" + red_panda.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getRandomRedPanda JSON FAIL');
            });
        }
        else {
            console.log('getRandomRedPanda FAIL');
        }
    });
}

module.exports.getRandomRedPanda = getRandomRedPanda;



function checkGetRandomRedPanda(userToken, actionArgs)
{
    return true;
}

module.exports.checkGetRandomRedPanda = checkGetRandomRedPanda;



const redPandaInfo = new Map();

redPandaInfo.set("getRandomRedPanda", {
    name: "getRandomRedPanda",
    description: "Give a random red panda picture and fact",
    args: []
});

module.exports.redPandaInfo = redPandaInfo;