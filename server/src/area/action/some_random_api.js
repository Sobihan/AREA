const search = require('../search');
const fetch = require('node-fetch');

function getSomeRandomRedPanda(actionArgs, callback, reactionArgs)
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

function getSomeRandomRaccoon(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animal/raccoon", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomRaccoon SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((raccoon) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomRaccoon JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random raccoon and a fact about them:\n" + raccoon.fact + "\n" + raccoon.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomRaccoon JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomRaccoon FAIL');
        }
    });
}

function getSomeRandomKangaroo(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animal/kangaroo", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomKangaroo SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((kangaroo) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomKangaroo JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random kangaroo and a fact about them:\n" + kangaroo.fact + "\n" + kangaroo.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomKangaroo JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomKangaroo FAIL');
        }
    });
}

function getSomeRandomKoala(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animal/koala", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomKoala SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((koala) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomKoala JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random koala and a fact about them:\n" + koala.fact + "\n" + koala.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomKoala JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomKoala FAIL');
        }
    });
}

function getSomeRandomJoke(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/joke", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomJoke SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((joke) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomJoke JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random joke\n" + joke.joke);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomJoke JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomJoke FAIL');
        }
    });
}

function getSomeRandomAnimePat(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animu/pat", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomAnimePat SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((pat) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomAnimePat JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random gif of anime pat\n" + pat.link);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomAnimePat JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomAnimePat FAIL');
        }
    });
}

function getSomeRandomAnimeWink(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animu/wink", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomAnimeWink SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((wink) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomAnimeWink JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random gif of anime wink\n" + wink.link);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomAnimeWink JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomAnimeWink FAIL');
        }
    });
}

function getSomeRandomAnimeHug(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/animu/hug", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomAnimeHug SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((hug) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomAnimeHug JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random gif of anime hug\n" + hug.link);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomAnimeHug JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomAnimeHug FAIL');
        }
    });
}

function getSomeRandomMeme(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    var options = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://some-random-api.ml/meme", options)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((response) => {
        if (isSuccess == true) {
            console.log('getSomeRandomMeme SUCESSFUL');

            response.json()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((meme) => {
                if (isSuccess_2 == true) {
                    console.log('getSomeRandomMeme JSON SUCESSFUL');
                    search.AddArgs(reactionArgs, "text", "Here is your random meme, it comes from the category: \n" + meme.category + "\n" + meme.caption + "\n" + meme.image);
                    callback(reactionArgs);
                }
                else
                    console.log('getSomeRandomMeme JSON FAIL');
            });
        }
        else {
            console.log('getSomeRandomMeme FAIL');
        }
    });
}

module.exports.getSomeRandomRedPanda = getSomeRandomRedPanda;
module.exports.getSomeRandomRaccoon = getSomeRandomRaccoon;
module.exports.getSomeRandomKangaroo = getSomeRandomKangaroo;
module.exports.getSomeRandomKoala = getSomeRandomKoala;
module.exports.getSomeRandomJoke = getSomeRandomJoke;
module.exports.getSomeRandomAnimePat = getSomeRandomAnimePat;
module.exports.getSomeRandomAnimeWink = getSomeRandomAnimeWink;
module.exports.getSomeRandomAnimeHug = getSomeRandomAnimeHug;
module.exports.getSomeRandomMeme = getSomeRandomMeme;



function checkGetSomeRandom(userToken, actionArgs)
{
    return true;
}

module.exports.checkGetSomeRandom = checkGetSomeRandom;



const someRandomInfo = new Map();

someRandomInfo.set("getSomeRandomRedPanda", {
    name: "getSomeRandomRedPanda",
    description: "Give a random red panda picture and fact",
    args: []
});

someRandomInfo.set("getSomeRandomRaccoon", {
    name: "getSomeRandomRaccoon",
    description: "Give a random raccoon picture and fact",
    args: []
});

someRandomInfo.set("getSomeRandomKangaroo", {
    name: "getSomeRandomKangaroo",
    description: "Give a random kangaroo picture and fact",
    args: []
});

someRandomInfo.set("getSomeRandomKoala", {
    name: "getSomeRandomKoala",
    description: "Give a random koala picture and fact",
    args: []
});

someRandomInfo.set("getSomeRandomJoke", {
    name: "getSomeRandomJoke",
    description: "Give a random joke",
    args: []
});

someRandomInfo.set("getSomeRandomAnimePat", {
    name: "getSomeRandomAnimePat",
    description: "Give a random anime pat GIF",
    args: []
});

someRandomInfo.set("getSomeRandomAnimeWink", {
    name: "getSomeRandomAnimeWink",
    description: "Give a random anime wink GIF",
    args: []
});

someRandomInfo.set("getSomeRandomAnimeHug", {
    name: "getSomeRandomAnimeHug",
    description: "Give a random anime hug GIF",
    args: []
});

someRandomInfo.set("getSomeRandomJoke", {
    name: "getSomeRandomJoke",
    description: "Give a random joke",
    args: []
});

module.exports.someRandomInfo = someRandomInfo;