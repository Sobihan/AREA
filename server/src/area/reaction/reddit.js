const fetch = require('node-fetch');
const http_r = require('../../api/http_requester');

async function submit_post(token, subreddit, title, text)
{
    var url = "https://oauth.reddit.com/api/submit"
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", 'bearer ' + token);
    myHeaders.append("user-agent", "node.js");
    var opt = {
        method: 'POST',
        headers: myHeaders,
        data : {
            api_type: 'json',
            kind: 'self',
            sr: subreddit,
            title: title,
            text: text,
        }
    };
    var data = await http_r.apiCaller(opt, url);
    return data;
};