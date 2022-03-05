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
            search.changeArgs(actionArgs, "likes", video.likeCount);
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " like count as changed.\nCurrent like counter is " + video.likeCount + " likes.\n");
            callback(reactionArgs);
        }
    });
}

//video got over x likes
function overXLike(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = search.args(actionArgs, "likes");  //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed
    const done = search.args(actionArgs, "done"); //added by us

    if (!done) {
        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
                search.changeArgs(actionArgs, "done", true);
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like as been reached.\nCurrent like counter is " + video.likeCount + " likes.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXLikeAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = search.args(actionArgs, "likes");  //needed
    const addLikes = search.args(actionArgs, "addLikes");  //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed

        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
                search.changeArgs(actionArgs, "likes", (likes + addLikes));
                //search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like as been reached.\n New like counter is " + video.likeCount + " likes.\n");
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like (" + likes + " likes) as been reached.\nThe new target is " + (likes + addLikes) + " likes.\nCurrent like counter is " + video.likeCount + " likes.\n");
                callback(reactionArgs);
            }
        });
}

function overXLikeTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const likes = search.args(actionArgs, "likes");  //needed
    const addLikes = search.args(actionArgs, "addLikes");  //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed

        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.likeCount != undefined && video.likeCount >= likes) {
                search.changeArgs(actionArgs, "likes", (likes * addLikes));
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of like (" + likes + " likes) as been reached.\nThe new target is " + (likes * addLikes) + " likes.\nCurrent like counter is " + video.likeCount + " likes.\n");
                callback(reactionArgs);
            }
        });
}

//change view counter
function newView(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = search.args(actionArgs, "views"); //added by us
    const videoURL = search.args(actionArgs, "videoURL"); //needed

    youtube.getVideo(videoURL)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((video) => {
        if (isSuccess == true && video != null && video != undefined && video.viewCount != undefined && video.viewCount != views) {
            search.changeArgs(actionArgs, "views", video.viewCount);
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " view count as changed.\nCurrent view counter is " + video.viewCount + " views.\n");
            callback(reactionArgs);
        }
    });
}

//reached targeted view
function overXView(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = search.args(actionArgs, "views");  //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed
    const done = search.args(actionArgs, "done"); //added by us

    if (!done) {
        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
                search.changeArgs(actionArgs, "done", true);
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views as been reached.\nCurrent views counter is " + video.viewCount + " views.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXViewAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = search.args(actionArgs, "views"); //needed
    const addViews = search.args(actionArgs, "addViews"); //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed

        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
                search.changeArgs(actionArgs, "views", (views + addViews));
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views (" + views + " views) as been reached.\nThe new target is " + (views + addViews) + " views.\nCurrent views counter is " + video.viewCount + " views.\n");
                callback(reactionArgs);
            }
        });
}

function overXViewTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const views = search.args(actionArgs, "views"); //needed
    const addViews = search.args(actionArgs, "addViews"); //needed
    const videoURL = search.args(actionArgs, "videoURL"); //needed

        youtube.getVideo(videoURL)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((video) => {
            if (isSuccess == true && video != null && video != undefined && video.viewCount != undefined && video.viewCount >= views) {
                search.changeArgs(actionArgs, "views", (views * addViews));
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube video's tilted: " + video.title + " by " + video.channel.name + " targeted number of views (" + views + " views) as been reached.\nThe new target is " + (views * addViews) + " views.\nCurrent views counter is " + video.viewCount + " views.\n");
                callback(reactionArgs);
            }
        });
}

//new videos
function newVideos(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    let isSuccess_2 = true;
    const lastVideoID = search.args(actionArgs, "lastVideoID"); //added by us
    const channelName = search.args(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess == true && channel != null) {
            channel.nextVideos()
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then(() => {
                if (isSuccess_2 == true && channel.videos != undefined && channel.videos.length >= 1 && lastVideoID != channel.videos[0].id){
                    search.changeArgs(actionArgs, "lastVideoID", channel.videos[0].id);
                    search.AddArgs(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as published a new video titled \"" + channel.videos[0].title + "\", it has a duration of " + channel.videos[0].duration + " seconds.\n");
                    callback(reactionArgs);
                }
            });
        }
    });
}

//reached targeted number of videos
function overXVideos(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = search.args(actionArgs, "videoCount"); //needed
    const channelName = search.args(actionArgs, "channelName"); //needed
    const done = search.args(actionArgs, "done"); //added by us

    if (!done) {
        youtube.findOne(channelName, {type: "channel"})
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((channel) => {
            if (isSuccess == true && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
                search.changeArgs(actionArgs, "done", true);
                search.AddArgs(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded.\nCurrent video counter is " + channel.videoCount + " video.\n");
                callback(reactionArgs);
            }
        });
    }
}

function overXVideosAddY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = search.args(actionArgs, "videoCount"); //needed
    const addVideoCount = search.args(actionArgs, "addVideoCount"); //needed
    const channelName = search.args(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess == true && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
            search.changeArgs(actionArgs, "videoCount", (videoCount + addVideoCount));
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded (" + videoCount + " videos).\nThe new target is " + (videoCount + addVideoCount) + " videos.\nCurrent video counter is " + channel.videoCount + " videos.\n");
            callback(reactionArgs);
        }
    });
}

function overXVideosTimesY(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const videoCount = search.args(actionArgs, "videoCount"); //needed
    const addVideoCount = search.args(actionArgs, "addVideoCount"); //needed
    const channelName = search.args(actionArgs, "channelName"); //needed

    youtube.findOne(channelName, {type: "channel"})
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((channel) => {
        if (isSuccess == true && channel != null && channel != undefined && channel.videoCount != undefined && channel.videoCount >= videoCount) {
            search.changeArgs(actionArgs, "videoCount", (videoCount * addVideoCount));
            search.AddArgs(reactionArgs, "text", "Your chossen Youtube channel named: " + channel.name + " as reached the targeted number of videos uploaded (" + videoCount + " videos).\nThe new target is " + (videoCount * addVideoCount) + " videos.\nCurrent video counter is " + channel.videoCount + " videos.\n");
            callback(reactionArgs);
        }
    });
}

module.exports.NewLike = NewLike;
module.exports.overXLike = overXLike;
module.exports.overXLikeAddY = overXLikeAddY;
module.exports.overXLikeTimesY = overXLikeTimesY;

module.exports.newView = newView;
module.exports.overXView = overXView;
module.exports.overXViewAddY = overXViewAddY;
module.exports.overXViewTimesY = overXViewTimesY;

module.exports.newVideos = newVideos;
module.exports.overXVideos = overXVideos;
module.exports.overXVideosAddY = overXVideosAddY;
module.exports.overXVideosTimesY = overXVideosTimesY;



function checkNewLike(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "likes", 0);
    if (search.args(actionArgs, "videoURL") == null)
        return false;
    return true;
}

function checkOverXLike(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "done", false);
    if (search.args(actionArgs, "videoURL") == null || search.args(actionArgs, "likes") == null || !Number.isInteger(search.args(actionArgs, "likes")))
        return false;
    return true;
}

function checkOverXLikeY(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    if (search.args(actionArgs, "videoURL") == null || search.args(actionArgs, "likes") == null || search.args(actionArgs, "addLikes") == null ||
        !Number.isInteger(search.args(actionArgs, "likes")) || !Number.isInteger(search.args(actionArgs, "addLikes")))
        return false;
    return true;
}

function checkNewView(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "views", 0);
    if (search.args(actionArgs, "videoURL") == null)
        return false;
    return true;
}

function checkOverXView(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "done", false);
    if (search.args(actionArgs, "videoURL") == null || search.args(actionArgs, "views") == null || !Number.isInteger(search.args(actionArgs, "views")))
        return false;
    return true;
}

function checkOverXViewY(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    if (search.args(actionArgs, "videoURL") == null || search.args(actionArgs, "views") == null || search.args(actionArgs, "addViews") == null ||
        !Number.isInteger(search.args(actionArgs, "views")) || !Number.isInteger(search.args(actionArgs, "addViews")))
        return false;
    return true;
}

function checkNewVideos(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "lastVideoID", "");
    if (search.args(actionArgs, "channelName") == null)
        return false;
    return true;
}

function checkOverXVideos(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    // search.AddArgs(actionArgs, "userToken", userToken);
    search.AddArgs(actionArgs, "done", false);
    if (search.args(actionArgs, "channelName") == null || search.args(actionArgs, "videoCount") == null || !Number.isInteger(search.args(actionArgs, "videoCount")))
        return false;
    return true;
}

function checkOverXVideosY(userToken, actionArgs)
{
    search.initializeArgs(actionArgs);
    if (search.args(actionArgs, "channelName") == null || search.args(actionArgs, "videoCount") == null || search.args(actionArgs, "addVideoCount") == null ||
        !Number.isInteger(search.args(actionArgs, "videoCount")) || !Number.isInteger(search.args(actionArgs, "addVideoCount")))
        return false;
    return true;
}

module.exports.checkNewLike = checkNewLike;
module.exports.checkOverXLike = checkOverXLike;
module.exports.checkOverXLikeY = checkOverXLikeY;

module.exports.checkNewView = checkNewView;
module.exports.checkOverXView = checkOverXView;
module.exports.checkOverXViewY = checkOverXViewY;

module.exports.checkNewVideos = checkNewVideos;
module.exports.checkOverXVideos = checkOverXVideos;
module.exports.checkOverXVideosY = checkOverXVideosY;



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

youtubeInfo.set("overXLikeAddY", {
    name: "overXLikeAddY",
    description: "To know if a video as reached the targeted number of likes. And then add addLikes to the target.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."},
        {addLikes: "Number of likes to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("overXLikeTimesY", {
    name: "overXLikeTimesY",
    description: "To know if a video as reached the targeted number of likes. And then multiply the target by addLikes.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {likes: "Targeted number of likes."},
        {addLikes: "Number of likes to multiply by when the previous target has been reached."}
    ]
});

youtubeInfo.set("newView", {
    name: "newView",
    description: "To know if a video's views counter changed.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."}
    ]
});

youtubeInfo.set("overXView", {
    name: "overXView",
    description: "To know if a video as reached the targeted number of views.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."}
    ]
});

youtubeInfo.set("overXViewAddY", {
    name: "overXViewAddY",
    description: "To know if a video as reached the targeted number of views. And then add addViews to the target.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."},
        {addViews: "Number of views to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("overXViewTimesY", {
    name: "overXViewTimesY",
    description: "To know if a video as reached the targeted number of views. And then multiply the target by addViews.",
    args: [
        {videoURL: "The URL of the video you wish to monitor."},
        {views: "Targeted number of views."},
        {addViews: "Number of views to multiply by when the previous target has been reached."}
    ]
});

youtubeInfo.set("newVideos", {
    name: "newVideos",
    description: "To know if a Youtube channel as uploaded a new video.",
    args: [
        {channelName: "The channel's name you wish to monitor."}
    ]
});

youtubeInfo.set("overXVideos", {
    name: "overXVideos",
    description: "To know if a Youtube channel as reached the targeted number of videos.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."}
    ]
});

youtubeInfo.set("overXVideosAddY", {
    name: "overXVideosAddY",
    description: "To know if a Youtube channel as reached the targeted number of videos. And then add addVideoCount to the target.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."},
        {addVideoCount: "Number of videos to add when the previous target has been reached."}
    ]
});

youtubeInfo.set("overXVideosTimesY", {
    name: "overXVideosTimesY",
    description: "To know if a Youtube channel as reached the targeted number of videos. And then multiply the target by addVideoCount.",
    args: [
        {channelName: "The channel's name you wish to monitor."},
        {videoCount: "Targeted number of videos."},
        {addVideoCount: "Number of videos to multiply by when the previous target has been reached."}
    ]
});

module.exports.youtubeInfo = youtubeInfo;