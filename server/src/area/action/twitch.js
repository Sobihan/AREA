const TwitchApi = require("node-twitch").default;
const search = require('../search');

function getStream(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const channelName = search.args(actionArgs, "channelName");
    const live = search.args(actionArgs, "live");

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
        if (isSuccess == true) {
            //console.log('twitch =', JSON.stringify(twitch));
            // if (twitch.data[0] != undefined)
            //     console.log("IS Live");

            if (!live && twitch.data[0] != undefined && twitch.data[0].game_name != undefined) {
                search.changeArgs(actionArgs, "live", true);

                // search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is streamimg.\nThey are currently playing " + twitch.data[0].game_name + ".")

                callback(reactionArgs);
            }
            else if (live && twitch.data[0] == undefined) {
                search.changeArgs(actionArgs, "live", false);
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is no longer streamimg.\n");
                callback(reactionArgs);
            }

        }
/*
        if (isSuccess == true && twitch.data.length > 0) {
            // console.log('testgetStream SUCESSFUL');
            search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
*/
    });
}

//viewerCount

//check game name

module.exports.getStream = getStream;



function checkGetStream(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    //search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "live", false);
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