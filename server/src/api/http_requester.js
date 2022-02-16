var https = require('follow-redirects').https;

function http_req(options, callback) {
    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            callback(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
});

req.end();
}

function http_reqRefresh(options, callback, type, userToken, returnCallback) {
    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            callback(body.toString(), type, userToken, returnCallback);
        });

        res.on("error", function (error) {
            console.error(error);
        });
});

req.end();
}

module.exports.http_req = http_req;
module.exports.http_reqRefresh = http_reqRefresh;






//import fetch from 'node-fetch';
const fetch = require('node-fetch');

async function apiCaller(options, url)
{
    const response = await fetch(url, options);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    else {
        const data = await response.json();
        return data;
    }
}

module.exports.apiCaller = apiCaller;