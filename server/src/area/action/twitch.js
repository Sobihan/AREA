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
            if (!live && twitch.data[0] != undefined && twitch.data[0].game_name != undefined) {
                search.changeArgs(actionArgs, "live", true);
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is streamimg.\nThey are currently playing " + twitch.data[0].game_name + ".");
                callback(reactionArgs);
            }
            else if (live && twitch.data[0] == undefined) {
                search.changeArgs(actionArgs, "live", false);
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is no longer streamimg.\n");
                callback(reactionArgs);
            }
        }
    });
}

//viewerCount
function overXViewer(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = search.args(actionArgs, "viewerCount");
    const channelName = search.args(actionArgs, "channelName");
    const done = search.args(actionArgs, "done"); //added by us

    if (!done) {
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
                if (!done && twitch.data[0] != undefined && twitch.data[0].viewer_count != undefined && twitch.data[0].viewer_count >= viewerCount) {
                    search.changeArgs(actionArgs, "done", true);
                    search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.");
                    callback(reactionArgs);
                }
            }
        });
    }
}

//viewerCount X + Y
function overXViewerAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = search.args(actionArgs, "viewerCount");
    const addViewerCount = search.args(actionArgs, "addViewerCount");
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
        if (isSuccess == true) {
            if (twitch.data[0] != undefined && twitch.data[0].viewer_count != undefined && twitch.data[0].viewer_count >= viewerCount) {
                search.changeArgs(actionArgs, "viewerCount", (viewerCount + addViewerCount));
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.\nThe new target is " + (viewerCount + addViewerCount) + " viewers");
                callback(reactionArgs);
            }
        }
    });
}

//viewerCount X * Y
function overXViewerTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const viewerCount = search.args(actionArgs, "viewerCount");
    const addViewerCount = search.args(actionArgs, "addViewerCount");
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
        if (isSuccess == true) {
            if (twitch.data[0] != undefined && twitch.data[0].viewer_count != undefined && twitch.data[0].viewer_count >= viewerCount) {
                search.changeArgs(actionArgs, "viewerCount", (viewerCount * addViewerCount));
                search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " as reached the targeted viewer count of " + viewerCount + " viewers.\nThey currently have " + twitch.data[0].viewer_count + " viewers.\nThe new target is " + (viewerCount * addViewerCount) + " viewers");
                callback(reactionArgs);
            }
        }
    });
}


//check game name
// function getStreamsIfPlayingX(actionArgs, callback, reactionArgs)
// {
//     let isSuccess = true;
//     const wantedGame = search.args(actionArgs, "wantedGame");
//     const channelName = search.args(actionArgs, "channelName");
//     //const channelName = search.args(actionArgs, "channelName");

//     const twitch = new TwitchApi({
//         client_id: "84write1ma6r2u8dtgx47h9qz2pgaj",
//         client_secret: "53wv6bcfjfthbi8afzvhwk6t13eb48"
//     });
//     twitch.getStreams({ channel: channelName })
//     .catch((e) => {
//         isSuccess = false;
//         console.log(e);
//     })
//     .then((twitch) => {
//         if (isSuccess == true) {
//             if (twitch.data[0] != undefined && twitch.data[0].game_name != undefined && twitch.data[0].game_name == wantedGame) {
//                 search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is streaming the game you wish to see, " + wantedGame + ".");
//                 callback(reactionArgs);
//             }
//         }
//     });
// }

//switched game

module.exports.getStream = getStream;
module.exports.overXViewer = overXViewer;
module.exports.overXViewerAddY = overXViewerAddY;
module.exports.overXViewerTimesY = overXViewerTimesY;
// module.exports.getStreamsIfPlayingX = getStreamsIfPlayingX;



function checkGetStream(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "live", false);
    if (search.args(actionArgs, "channelName") == null)
        return false;
    return true;
}

function checkOverXViewer(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "done", false);
    if (search.args(actionArgs, "channelName") == null || search.args(actionArgs, "viewerCount") == null || !Number.isInteger(search.args(actionArgs, "viewerCount")))
        return false;
    return true;
}

function checkOverXViewerY(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    if (search.args(actionArgs, "channelName") == null || search.args(actionArgs, "viewerCount") == null || search.args(actionArgs, "addViewerCount") == null ||
        !Number.isInteger(search.args(actionArgs, "viewerCount")) || !Number.isInteger(search.args(actionArgs, "addViewerCount")))
        return false;
    return true;
}

// function checkGetStreamsIfPlayingX(userToken, actionArgs)
// {
//     search.initializeArgs(actionArgs);
//     if (search.args(actionArgs, "channelName") == null || search.args(actionArgs, "wantedGame") == null)
//         return false;
//     return true;
// }

module.exports.checkGetStream = checkGetStream;
module.exports.checkOverXViewer = checkOverXViewer;
module.exports.checkOverXViewerY = checkOverXViewerY;
// module.exports.checkGetStreamsIfPlayingX = checkGetStreamsIfPlayingX;



const twitchInfo = new Map();

twitchInfo.set("getStream", {
    name: "getStream",
    description: "Tells you if the requested streamer as started or stoped streamimg.",
    args: [
        {channelName: "The requested streamer channel name."}
    ]
});

twitchInfo.set("overXViewer", {
    name: "overXViewer",
    description: "Tells you if the requested streamer as reached the targeted number of viewers.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."}
    ]
});

twitchInfo.set("overXViewerAddY", {
    name: "overXViewerAddY",
    description: "Tells you if the requested streamer as reached the targeted number of viewers. And then add addViewerCount to the target.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."},
        {addViewerCount: "Number of viewers to add when the previous target has been reached."}
    ]
});

twitchInfo.set("overXViewerTimesY", {
    name: "overXViewerTimesY",
    description: "Tells you if the requested streamer as reached the targeted number of viewers. And then multiply the target by addViewerCount.",
    args: [
        {channelName: "The requested streamer channel name."},
        {viewerCount: "Targeted number of viewers."},
        {addViewerCount: "Number of viewers to multiply by when the previous target has been reached."}
    ]
});

module.exports.twitchInfo = twitchInfo;
