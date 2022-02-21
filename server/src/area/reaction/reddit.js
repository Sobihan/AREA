const fetch = require('node-fetch');
const http_r = require('../../api/http_requester');

async function send_request(token, url, data) {
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", 'bearer ' + token);
    myHeaders.append("user-agent", "node.js");
    var opt = {
        method: 'POST',
        headers: myHeaders,
        data : data
    };
    var data = await http_r.apiCaller(opt, url);
    return data;
}

async function submit_post(token, subreddit, title, text)
{
    return send_request(token, "https://oauth.reddit.com/api/submit", {
            api_type: 'json',
            kind: 'self',
            sr: subreddit,
            title: title,
            text: text,
        }
    );
};

async function send_pm(token, subject, text, to)
{
    return send_request(token, "https://oauth.reddit.com/api/compose", {
        api_type: 'json',
        kind: 'self',
        subject: subreddit,
        text: text,
        to: to,
    }
    );
};