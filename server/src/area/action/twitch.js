const TwitchApi = require("node-twitch").default;
const search = require('../search');

function getStream(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const channelName = search.args(actionArgs, "channelName");

    const twitch = new TwitchApi({
        client_id: "84write1ma6r2u8dtgx47h9qz2pgaj",
        client_secret: "53wv6bcfjfthbi8afzvhwk6t13eb48"
    });
    twitch.getStreams({ channel: channelName })
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((twitch) => {
        if (isSuccess == true && twitch.data.length > 0){
            console.log('testgetStream SUCESSFUL');
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}

function testAction(actionArgs, callback, reactionArgs)
{
    //var test = search.args(actionArgs, "test");
    //var test = 0;
    //console.log("Hello world" + text);
    //test += 1;

    /*if (!isNaN(search.args(actionArgs, "test")))
        var test = parseInt(search.args(actionArgs, "test"));

    test += 1;*/

    //var test = parseInt(search.args(actionArgs, "test"));
    //search.args(actionArgs, "test") += 1;

/*
    var test = search.args(actionArgs, "test");
    test += 1;
    search.changeArgs(actionArgs, "test", test);
*/
    console.log("\nHello action world " + test + "\n");
}

module.exports.getStream = getStream;
module.exports.testAction = testAction;



function checkGetStream(actionArgs)
{
    if (search.args(actionArgs, "channelName") == null)
        return false;
    return true;
}

function checktestAction(actionArgs)
{
    return true;
}

module.exports.checkGetStream = checkGetStream;
module.exports.checktestAction = checktestAction;



const twitchInfo = new Map();

twitchInfo.set("getStream", {
    name: "getStream",
    description: "I am a description",
    args: [
        {channelName: "I describe an arg"},
        {yolo: "I describe another arg"}
    ]
});

twitchInfo.set("testAction", {
    name:"testAction",
    description:"I am new description",
    args: []
});

module.exports.twitchInfo = twitchInfo;