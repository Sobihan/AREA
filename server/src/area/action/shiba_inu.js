const search = require('../search');
const fetch = require('node-fetch');

function getRandomShibaInu(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://shibe.online/api/shibes?count=1&urls=true", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            // console.log('getRandomShibaInu SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((shibaInu) => {
                if (isSuccess_2 == true) {
                    // console.log('getRandomShibaInu JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random picture of a Shiba Inu:\n" + shibaInu);
                    callback(reactionArgs);
                }
                // else
                //     console.log('getRandomShibaInu JSON FAIL');
            });
        }
        // else {
        //     console.log('getRandomShibaInu FAIL');
        // }
    });
}

module.exports.getRandomShibaInu = getRandomShibaInu;



function checkGetRandomShibaInu(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    return true;
}

module.exports.checkGetRandomShibaInu = checkGetRandomShibaInu;



const shibaInuInfo = new Map();

shibaInuInfo.set("getRandomShibaInu", {
    name: "getRandomShibaInu",
    description: "Give a random Shiba Inu picture",
    args: []
});

module.exports.shibaInuInfo = shibaInuInfo;