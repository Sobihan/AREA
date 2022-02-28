const getVideoId = require('get-video-id');
const { Client } = require("youtubei");
const search = require('../search');

const youtube = new Client();

//like counter changed
function NewLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = search.args(actionArgs, "likes"); //added by us
    const videoURL = search.args(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess == true && video != null && video != undefined && video.likeCount != undefined && video.likeCount != likes) {
            console.log('testgetStream SUCESSFUL');
            //console.log('video = ', JSON.stringify(video));
            console.log('video.likeCount = ', JSON.stringify(video.likeCount));
            search.changeArgs(actionArgs, "likes", video.likeCount);
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " like count as changed.\n New like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}

//video got over x likes
function overXLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = search.args(actionArgs, "likes");  //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess == true && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
            console.log('testgetStream SUCESSFUL');
            //console.log('video = ', JSON.stringify(video));
            console.log('video.likeCount = ', JSON.stringify(video.likeCount));
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like as been reached.\n New like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}




//change view counter

//reached targeted view

module.exports.NewLike = NewLike;
module.exports.overXLike = overXLike;



function checkNewLike(userToken, actionArgs)
{
    search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "likes", 0);
    if (search.args(actionArgs, "videoURL") == null)
        return false;
    return true;
}

function checkOverXLike(userToken, actionArgs)
{
    search.AddArgs(actionArgs, "userToken", userToken);
    if (search.args(actionArgs, "videoURL") == null || search.args(actionArgs, "likes") == null)
        return false;
    return true;
}

module.exports.checkNewLike = checkNewLike;
module.exports.checkOverXLike = checkOverXLike;



const youtubeInfo = new Map();

youtubeInfo.set("NewLike", {
    name: "NewLike",
    description: "To know if a video's like counter changed.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."}
    ]
});

youtubeInfo.set("overXLike", {
    name: "overXLike",
    description: "To know if a video as reached the targeted number of likes.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."}
    ]
});

module.exports.youtubeInfo = youtubeInfo;