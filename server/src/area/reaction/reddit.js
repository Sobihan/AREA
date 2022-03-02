const fetch = require('node-fetch');
const http_r = require('../../api/http_requester');
const search = require('../search');

async function send_request(token, url, data) {
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", 'bearer ' + token);
    myHeaders.append("user-agent", "node.js");
    var opt = {
        method: 'POST',
        headers: myHeaders,
        data: data
    };
    var data = await http_r.apiCaller(opt, url);
    return data;
}

async function submitPost(token, subreddit, title, text) {
    return send_request(token, "https://oauth.reddit.com/api/submit", {
        api_type: 'json',
        kind: 'self',
        sr: subreddit,
        title: title,
        text: text,
    }
    );
};

async function submitPostReaction(args) {
    const token = search.args(args, "userToken");
    alert(token);
    //    return submitPost(token, args[0], args[1], args[2]);
};

async function checkSubmitPost(token, args) {
    search.AddArgs(reactionArgs, "userToken", userToken);
    if (search.args(reactionArgs, "text") == null)
        return false;
    return true;
};

async function send_pm(token, to, subject, text) {
    return send_request(token, "https://oauth.reddit.com/api/compose", {
        api_type: 'json',
        kind: 'self',
        subject: subreddit,
        text: text,
        to: to,
    }
    );
};

const redditInfo = new Map();

redditInfo.set("redditPost", {
    name: "redditPost",
    description: "Submit a post into a subreddit on trigger",
    args: [
        { text: "subreddit", text: "subject", text: "text" }
    ]
});

redditInfo.set("redditPM", {
    name: "redditPM",
    description: "Send a pm to a reddit user on trigger",
    args: [
        { text: "to", text: "subject", text: "text" }
    ]
});

module.exports.redditInfo = redditInfo;
module.exports.submitRedditPost = submitPostReaction;
module.exports.checkSubmitRedditPost = checkSubmitPost;