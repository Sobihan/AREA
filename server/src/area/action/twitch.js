const TwitchApi = require("node-twitch").default;
const search = require('../search');

function getStream(actionArgs, callback, reactionArgs)
{
    let isSuccess = true;
    const channelName = search.args(actionArgs, "channelName");

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
            callback(reactionArgs);
        }
        else {
            console.log('testgetStream FAIL');
        }
    });
}

function testAction(actionArgs, callback, reactionArgs)
{
//    console.log(actionArgs);

    var test = search.args(actionArgs, "test");
    test += 1;
    search.changeArgs(actionArgs, "test", test);
/*
    var data = search.args(actionArgs, "data");
    console.log("data = ", data);
    console.log("data.test = ", data.test);

    search.args(actionArgs, "chedg")();
*/
    console.log("\nHello action world " + test + "\n");
}

module.exports.getStream = getStream;
module.exports.testAction = testAction;



function checkGetStream(userToken, actionArgs)
{
    search.AddArgs(actionArgs, "userToken", userToken);
    if (search.args(actionArgs, "channelName") == null)
        return false;
    return true;
}
/*
function testtt(actionArgs, callback)
{
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function fn60sec(actionArgs, callback)
    {
        callback(actionArgs, "data", makeid(5))
        //data = makeid(5);
        //console.log("origin data = ", data);
    }


    //fn60sec(data.test);
    //setInterval(fn60sec, 3*1000);
    setInterval(fn60sec, 3*1000, actionArgs, callback);
}

function helloTestt()
{
    console.log("sfvghjkiolmp");
}
*/
function checktestAction(userToken, actionArgs)
{
    //search.AddArgs(actionArgs, "data", '');
    //search.AddArgs(actionArgs, "chedg", helloTestt);
    //var data = {test:''};

    //testtt(actionArgs, search.changeArgs);

/*    let data = '';

    testtt(data)*/

    // if (search.args(actionArgs, "test") == null)
    //     search.AddArgs(actionArgs, "test", 0);


    search.AddArgs(actionArgs, "userToken", userToken);

    return true;
}

module.exports.checkGetStream = checkGetStream;
module.exports.checktestAction = checktestAction;



const twitchInfo = new Map();

twitchInfo.set("getStream", {
    name: "getStream",
    description: "I am a description",
    args: [
        {channelName: "I describe an arg"},
        {yolo: "I describe another arg"}
    ]
});

twitchInfo.set("testAction", {
    name:"testAction",
    description:"I am new description",
    args: []
});

function create_callback_hook_sub(userId, actionCallback) {
    let resolve;
    let rejectRequest;
    const request = new request((resolve, reject) => {
      resolve = resolve;
      rejectRequest = reject;
    });
    const options = {method: 'POST', headers: {
        'Content-Type': 'application/json',
        'client-id': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`}};
    const req = https.request('https://api.twitch.tv/helix/webhooks/hub',
      options, (res) => {
        twitch_request(res, body => {
          console.info(`${actionCallback}d to ${userId} with HTTP status ${res.statusCode}`);
          if (res.statusCode.toString().startsWith('2')) {
            resolve();
          } else {
            rejectRequest();
          }
          res && endWithCode(res, 200);
        });
      });
    req.on('error', console.error);
    const callbackUrl = `${hostname}/consume/${userId}`;
    const topic = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
    console.info(`${actionCallback} `, topic);
    req.write(JSON.stringify({"hub.callback": callbackUrl,"hub.mode": actionCallback,"hub.topic": topic,"hub.secret": process.env.TWITCH_CLIENT_SECRET,"hub.lease_seconds": leaseSeconds,}));
    req.end();
    return request;
}

function twitch_request(req, callback) {
    let body = '';
    req.on('data', chunk => body += chunk).on('end', () => {
        if (!body) return callback(null);
        try {
          callback(JSON.parse(body), body)
        } catch (e) {
          console.warn('error while parsing twitch request', e);
          callback(null);
        }
      });
}

module.exports.twitchInfo = twitchInfo;
module.exports.create_callback_hook_sub = create_callback_hook_sub;