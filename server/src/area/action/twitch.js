const TwitchApi = require("node-twitch").default;

/*
function getStream(channelName){
    const TwitchApi = require("node-twitch").default;
    const twitch = new TwitchApi({
        client_id: "84write1ma6r2u8dtgx47h9qz2pgaj",
        client_secret: "53wv6bcfjfthbi8afzvhwk6t13eb48"
    });
    return new Promise((resolve,reject) => {
        twitch.getStreams({ channel: channelName }).then(stream => {
//            console.log(stream);
            if (stream.data.length > 0)
                resolve(true);
            else
                resolve(false);
        }).catch(reject);
    })
}
*/

function testgetStream(channelName, callback){
    let isSuccess = true;

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
        if (isSuccess == true && twitch.data.length > 0){
            console.log('testgetStream SUCESSFUL');
            callback();
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}

function testAction()
{
    //console.log("Hello world" + text);
    console.log("\nHello action world\n");
}

module.exports.testgetStream = testgetStream;
module.exports.testAction = testAction;