// import getVideoId from "get-video-id";
// import Innertube from "youtubei.js";
// import { search } from "../../routes/routes";
const getVideoId = require('get-video-id');
//const Innertube = require('youtubei.js');
const { Client } = require("youtubei");
const search = require('../search');

// const youtube = await new Innertube();
//const youtube = new Innertube();

const youtube = new Client();

async function NewLikeCall(videoID)
{
    const video = await youtube.getVideo(videoID);
    return video;
}

function NewLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const likes = search.args(actionArgs, "likes"); //added by us
    const videoURL = search.args(actionArgs, "videoURL"); //needed
    const videoID = getVideoId(videoURL);


//     new Innertube()
//     .catch((e) => {
//         isSuccess = false;
//         console.log(e);
//     })
//     .then((youtube) => {
//         if (isSuccess == true) {

//             youtube.getDetails(videoID)
//             .catch((e) => {
//                 isSuccess_2 = false;
//                 console.log(e);
//             })
//             .then((video) => {
//                 if (isSuccess_2 == true && video.metadata.likes != likes){
//                     console.log('testgetStream SUCESSFUL');
//                     console.log('video.metadata = ', JSON.stringify(video.metadata));
//                     console.log('video = ', JSON.stringify(video));
//                     search.changeArgs(actionArgs, "likes", video.metadata.likes);
//                     //search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
//                     search.AddArgs(reactionArgs, "text", "NewLike in progresse\n")
//                     callback(reactionArgs);
//                 }
//                 else if (isSuccess_2 == true) {
//                     search.changeArgs(actionArgs, "likes", video.metadata.likes);
//                 }
//                 else {
//                     console.log('testgetStream FAIL');
//                 }
//             });


// /*
//             console.log('testgetStream SUCESSFUL');
//             console.log('video.metadata = ', JSON.stringify(video.metadata));
//             console.log('video = ', JSON.stringify(video));
//             search.changeArgs(actionArgs, "likes", video.metadata.likes);
//             //search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
//             search.AddArgs(reactionArgs, "text", "NewLike in progresse\n")
//             callback(reactionArgs);
// */
//         }
//         else {
//             console.log('testgetStream FAIL');
//         }
//     });


/*
    youtube.getDetails(videoID)
    .catch((e) => {
        isSuccess_2 = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess_2 == true && video.metadata.likes != likes){
            console.log('testgetStream SUCESSFUL');
            console.log('video.metadata = ', JSON.stringify(video.metadata));
            console.log('video = ', JSON.stringify(video));
            search.changeArgs(actionArgs, "likes", video.metadata.likes);
            //search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
            search.AddArgs(reactionArgs, "text", "NewLike in progresse\n")
            callback(reactionArgs);
        }
        else if (isSuccess_2 == true) {
            search.changeArgs(actionArgs, "likes", video.metadata.likes);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
*/





    //youtube.getVideo(videoID)//.getDetails(videoID)
    //test(videoURL)
    //youtube.getVideo(videoID)
    NewLikeCall(videoID)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess == true/* && video.metadata.likes != likes*/) {
            console.log('testgetStream SUCESSFUL');
            //console.log('video.metadata = ', JSON.stringify(video.metadata));
            //console.log('video = ', JSON.stringify(video));
            console.log('video.likeCount = ', JSON.stringify(video.likeCount));
            //search.changeArgs(actionArgs, "likes", video.metadata.likes);
            //search.AddArgs(reactionArgs, "text", "The streamer named " + channelName + " is Live.\n")
            search.AddArgs(reactionArgs, "text", "NewLike in progresse\n")
            callback(reactionArgs);
        }
        /*else if (isSuccess == true) {
            search.changeArgs(actionArgs, "likes", video.metadata.likes);
        }*/
        else {
            console.log('testgetStream FAIL');
        }
    });

}

//video got over x likes

//change likes counter

module.exports.NewLike = NewLike;



function checkNewLike(userToken, actionArgs)
{
    search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "likes", 0);
    if (search.args(actionArgs, "videoURL") == null)
        return false;
    return true;
}

module.exports.checkNewLike = checkNewLike;



const youtubeInfo = new Map();

youtubeInfo.set("NewLike", {
    name: "NewLike",
    description: "To know if a video's like counter changed.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."}
    ]
});

module.exports.youtubeInfo = youtubeInfo;