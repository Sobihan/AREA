const api_access = require('../../db_management/api_access/db_api_access');

const apiTokens = new Map();

async function apiGetter(userToken, type /* callback */)
{
    /*
    {
        userToken: {
            REDDIT: {
                token: '',
                disableAt: '',
            },
            Google: {
                ???
            }
        }
    }
    */


    if (apiTokens.get(userToken) != undefined) {
        console.log("if get map");
        /*if (apiTokens.get(userToken)[type] != undefined) {
            if (apiTokens.get(userToken)[type].disableAt > Date.now()) {
                //return apiTokens.get(userToken).get(type).token;
                return apiTokens.get(userToken)[type].token;
            }
            else {
                console.log("NEED To REFRESH TOKEN");
            }
        }*/
    }
    else {
        //get data from db.
        console.log("else set map");
        //apiTokens.set(userToken, {});



        let is_failed = false;

        try {
            var apiToken = await api_access.findUniqueApiTokenSimple(userToken, type);
        }
        catch (error) {
            console.log(error);
            is_failed = true
        }
        finally {
            if (!is_failed) {
                console.log("success");
                //console.log(apiToken);

                if (apiToken.disableAt <= Date.now()) {
                    //refresh token
                    if (type == 'REDDIT') {
                        /*await api_access.redditRefreshAcessToken(apiToken.rfstoken, refreshReddit, type, userToken, function(res, disableAt) {
                            console.log("res = ", res);
                            apiTokens.set(userToken, {[type]: {disableAt: disableAt, acstoken: res.access_token}});
                            //return res;
                        });*/

                        try {
                            api_access.redditRefreshAcessToken(apiToken.rfstoken, refreshReddit, type, userToken, function(res, disableAt) {
                                console.log("res = ", res);
                                apiTokens.set(userToken, {[type]: {disableAt: disableAt, acstoken: res.access_token}});
                                //return res;
                            });
                        }
                        catch (error) {
                            console.log(error);
                            is_failed = true
                        }
                        finally {

                        }

                        //console.log("apiToken.rfstoken =", apiToken.rfstoken);

                        //api_access.redditRefreshAcessToken(apiToken.rfstoken, refreshReddit, type, userToken);

                        //console.log("data =", data);
                    }
                    else if (type == 'GOOGLE') {

                    }
                }
                else{
                    apiTokens.set(userToken, {[type]: apiToken});
                    return apiTokens;
                }

            }
            else {
                //fail getting token, so no token in db found.
                console.log("fail");
            }
        }


    }

    console.log("apiTokens =", apiTokens);

    //impossible to do.

}

function refreshReddit(responce, type, userToken, returnCallback)
{
    //api_access.redditRefreshAcessToken(rfstoken, refreshReddit);
    //resfesh token
    //update db
    //return { token: 'LOL', disableAt: null }

    const json_responce = JSON.parse(responce);
    let isSuccess = true;
    const disableAt = (Date.now() + ((json_responce.expires_in - 200) * 1000));

    api_access.updateApiAccessToken(type, userToken, json_responce.access_token, json_responce.refresh_token, disableAt)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        console.log('refreshReddit ERROR');
        //console.logTEST ' + isSuccess);
    })
    .then((user) => {
        //console.logTEST22 ' + isSuccess);
        if (isSuccess == true){
            console.log('refreshReddit SUCESS');
            returnCallback(json_responce, disableAt);
        }
        else {
            console.log('refreshReddit FAIL');
            //callback(null);
        }
    });
}

module.exports.apiGetter = apiGetter;
module.exports.apiTokens = apiTokens;