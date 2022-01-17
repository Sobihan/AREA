const prisma = require('../main');
/*
function redditAcessToken(authtoken, callback) {
    let isSuccess = true;
    let isSuccess2 = true;
    prisma.findUniqueToken(authtoken)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        //console.logTEST ' + isSuccess);
    })
    .then((user) => {
        //console.logTEST22 ' + isSuccess);
        if (isSuccess == true && user.length == 1){

            if (user[0].exApi[0].token == null) {
                console.log('testReddit FAIL');
                callback(null);
            }
            else if (user[0].exApi[0].disableAt == null) {
                prisma.redditGetAcessToken(user[0].exApi[0].token, function(response) {
                    const json_response = JSON.parse(response);

                    console.log('access_token: ', json_response.access_token);
                    console.log('expires_in: ', json_response.expires_in);
                    console.log('refresh_token: ', json_response.refresh_token);

                    prisma.updateRedditAccessToken(user[0].exApi[0].token, json_response.access_token, json_response.refresh_token, (Date.now() + ((json_response.expires_in - 200) * 1000)))
                    .catch((e) => {
                        isSuccess2 = false;
                        console.log(e);
                        //console.logTEST ' + isSuccess2);
                    })
                    .then((user) => {
                        //console.logTEST22 ' + isSuccess2);
                        if (isSuccess2 == true){
                            console.log('updateRedditAccessToken SUCESS');
                            callback(json_response.access_token);
                        }
                        else {
                            console.log('updateRedditAccessToken FAIL');
                            callback(null);
                        }
                    });
                })
                //get acess token
            }
            else if (user[0].exApi[0].disableAt < Date.now()) {
                console.log('refresh needed');
                console.log(user[0].exApi[0].rfstoken);

                prisma.redditRefreshAcessToken(user[0].exApi[0].rfstoken, function(response) {
                    const json_response = JSON.parse(response);
                    prisma.updateRedditAccessToken(user[0].exApi[0].token, json_response.access_token, json_response.refresh_token, (Date.now() + ((json_response.expires_in - 200) * 1000)))
                    .catch((e) => {
                        isSuccess2 = false;
                        console.log(e);
                        //console.logTEST ' + isSuccess2);
                    })
                    .then((user) => {
                        //console.logTEST22 ' + isSuccess2);
                        if (isSuccess2 == true){
                            console.log('RefreshAcessToken updateRedditAccessToken SUCESS');
                            callback(json_response.access_token);
                        }
                        else {
                            console.log('RefreshAcessToken updateRedditAccessToken FAIL');
                            callback(null);
                        }
                    });
                })
                //refresh
            }
            else if (user[0].exApi[0].disableAt > Date.now()) {
                console.log('use acess token');
                console.log(user[0].exApi[0].acstoken);
                //use acess token
                callback(user[0].exApi[0].acstoken);
            }
        }
        else {
            console.log('testReddit FAIL');
            callback(null);
        }
    });
    console.log('testReddit');
};

module.exports.redditAcessToken = redditAcessToken;
*/