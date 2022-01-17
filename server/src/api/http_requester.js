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

module.exports.http_req = http_req;