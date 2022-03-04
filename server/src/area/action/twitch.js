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
            search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}

module.exports.getStream = getStream;



function checkGetStream(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "userToken", userToken);
    if (search.args(actionArgs, "channelName") == null)
        return false;
    return true;
}

module.exports.checkGetStream = checkGetStream;



const twitchInfo = new Map();

twitchInfo.set("getStream", {
    name: "getStream",
    description: "I am a description",
    args: [
        {channelName: "I describe an arg"},
        {yolo: "I describe another arg"}
    ]
});

module.exports.twitchInfo = twitchInfo;