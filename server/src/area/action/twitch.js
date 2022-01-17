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

module.exports.getStream = getStream;