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


    if (apiTokens.get(userToken) != undefined && apiTokens.get(userToken)[type] != undefined) {
        console.log("if get map");
        var data = apiTokens.get(userToken)[type];

        if (data.disableAt <= Date.now()) {
            console.log("if get map REFRESH");
            let is_failed = false;
            if (type == 'REDDIT') {
                console.log("if get map REFRESH REDDIT");

                try {
                    var data = await refreshReddit(type, userToken, data.rfstoken);
                }
                catch (error) {
                    console.log(error);
                    is_failed = true
                }
                finally {
                    if (!is_failed) {
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
                console.log("if get map REFRESH GOOGLE");
                console.log("GOOGLE is under construction");
                return null;
            }

        }
        else {
            return data;
        }
    }
    else {
        //get data from db.
        console.log("else set map");

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
                console.log("else set map success"); //token found in db.

                if (apiToken.disableAt <= Date.now()) {
                    //refresh token
                    console.log("else set map REFRESH");
                    if (type == 'REDDIT') {
                        console.log("else set map REFRESH REDDIT");

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
                                console.log("SUCESS");
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
                        console.log("else set map REFRESH GOOGLE");
                        console.log("GOOGLE is under construction");
                        return null;
                    }
                }
                else {
                    console.log("else set map NO REFRESH");
                    apiTokens.set(userToken, {[type]: {acstoken: apiToken.acstoken, disableAt: apiToken.disableAt, rfstoken: apiToken.rfstoken}/*{disableAt: apiToken.disableAt, acstoken: apiToken.acstoken}*/});
                    return {acstoken: apiToken.acstoken, disableAt: apiToken.disableAt, rfstoken: apiToken.rfstoken};
                }

            }
            else {
                //fail getting token, so no token in db found.
                console.log("fail");
                return null;
            }
        }


    }

    //console.log("apiTokens =", apiTokens);
    return null;
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
                    //return {disableAt: disableAt, acstoken: data.access_token};
                    return {acstoken: data.access_token, disableAt: disableAt, rfstoken: data.refresh_token};
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