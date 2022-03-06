const search = require('../search');
const fetch = require('node-fetch');

function getRandomPoem(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://www.poemist.com/api/v1/randompoems", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            // console.log('getRandomPoem SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((poems) => {
                if (isSuccess_2 == true) {
                    // console.log('getRandomPoem JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random poem:\n\n\nTitled: " + poems[0].title + "\n\n" + poems[0].content + "\nBy: " + poems[0].poet.name);
                    callback(reactionArgs);
                }
                // else
                //     console.log('getRandomPoem JSON FAIL');
            });
        }
        // else {
        //     console.log('getRandomPoem FAIL');
        // }
    });
}

module.exports.getRandomPoem = getRandomPoem;



function checkGetRandomPoem(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetRandomPoem = checkGetRandomPoem;



const poemInfo = new Map();

poemInfo.set("[Poemist] getRandomPoem", {
    name: "[Poemist] getRandomPoem",
    description: "Give a random poem.",
    args: []
});

module.exports.poemInfo = poemInfo;