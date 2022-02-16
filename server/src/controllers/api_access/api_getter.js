const api_access = require('../../db_management/api_access/db_api_access');

const apiTokens = new Map();

async function apiGetter(userToken, type)
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
        //console.log("map = ", apiTokens.get(userToken));
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
                console.log("success"); //token found in db.

                if (apiToken.disableAt <= Date.now()) {
                    //refresh token
                    if (type == 'REDDIT') {

                        let is_failed_2 = false;

                        try {
                            var data = await refreshReddit(type, userToken, apiToken.rfstoken);
                        }
                        catch (error) {
                            console.log(error);
                            is_failed_2 = true
                        }
                        finally {
                            if (!is_failed_2) {
                                apiTokens.set(userToken, {[type]: data});
                                return data;
                            }
                            else {
                                console.log("FAIL");
                                return null;
                            }
                        }
                    }
                    else if (type == 'GOOGLE') {
                        console.log("GOOGLE is under construction");
                        return null;
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
                return null;
            }
        }


    }

    console.log("apiTokens =", apiTokens);

    //impossible to do.

}

async function refreshReddit(type, userToken, refreshToken)
{
    let is_failed = false;
    let is_failed_2 = false;

    try {
        var data = await api_access.redditRefreshAcessToken(refreshToken);
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed) {
            //working
            //console.log("data = ", data);
            const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));

            try {
                await api_access.updateApiAccessToken(type, userToken, data.access_token, data.refresh_token, disableAt);
            }
            catch (error) {
                console.log(error);
                is_failed_2 = true
            }
            finally {
                if (!is_failed_2) {
                    console.log('refreshReddit SUCESS');
                    return {disableAt: disableAt, acstoken: data.access_token};
                }
                else {
                    console.log('refreshReddit FAIL');
                }
            }
        }
        else {
            console.log("FAIL");
        }
    }
}

module.exports.apiGetter = apiGetter;
module.exports.apiTokens = apiTokens;