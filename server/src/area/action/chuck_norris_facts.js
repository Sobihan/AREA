const search = require('../search');
const fetch = require('node-fetch');

function getRandomChuckNorrisFacts(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.chucknorris.io/jokes/random", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getRandomChuckNorrisFacts SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((fatcs) => {
                if (isSuccess_2 == true) {
                    console.log('getRandomChuckNorrisFacts JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random Chuck Norris facts, remember they are ALWAYS true:\n" + fatcs.value);
                    callback(reactionArgs);
                }
                else
                    console.log('getRandomChuckNorrisFacts JSON FAIL');
            });
        }
        else {
            console.log('getRandomChuckNorrisFacts FAIL');
        }
    });
}

module.exports.getRandomChuckNorrisFacts = getRandomChuckNorrisFacts;



function checkGetRandomChuckNorrisFacts(userToken, actionArgs)
{
    return true;
}

module.exports.checkGetRandomChuckNorrisFacts = checkGetRandomChuckNorrisFacts;



const chuckNorrisFactsInfo = new Map();

chuckNorrisFactsInfo.set("getRandomChuckNorrisFacts", {
    name: "getRandomChuckNorrisFacts",
    description: "Give a random and true fact about Chuck Norris",
    args: []
});

module.exports.chuckNorrisFactsInfo = chuckNorrisFactsInfo;