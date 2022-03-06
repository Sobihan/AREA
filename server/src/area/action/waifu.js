const search = require('../search');
const fetch = require('node-fetch');

function getRandomWaifu(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.waifu.im/random/?gif=false&is_nsfw=false", options)
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
            .then((waifu) => {
                if (isSuccess_2 == true) {
                    // console.log('getRandomCat JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random picture of a female character: " + waifu.images[0].url + "\nby: " + waifu.images[0].source);
                    callback(reactionArgs);
                }
                // else
                //     console.log('getRandomCat JSON FAIL');
            });
        }
        // else {
        //     console.log('getRandomCat FAIL');
        // }
    });
}

module.exports.getRandomWaifu = getRandomWaifu;



function checkGetRandomWaifu(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetRandomWaifu = checkGetRandomWaifu;



const waifuInfo = new Map();

waifuInfo.set("[Waifu] getRandomWaifu", {
    name: "[Waifu] getRandomWaifu",
    description: "Give a random picture of a female character and the source of said picture.",
    args: []
});

module.exports.waifuInfo = waifuInfo;