const user_prisma = require('../../db_management/user/db_user');
const http_r = require('../../api/http_requester');
const utf8 = require('utf8');
const fetch = require('node-fetch');
const api_access = require('../../db_management/api_access/db_api_access');

async function getGoogleAccessToken(token)
{
    console.log("INSIDE getGoogleAccessToken only for the web");
    const basicAuth = "Basic " + Buffer.from(utf8.encode('789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com: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')).toString('base64');
    var myHeaders = new fetch.Headers();
    var urlencoded = new URLSearchParams();
    let is_failed = false;

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", token);
    urlencoded.append("redirect_uri", "http://localhost:8081");
    urlencoded.append("client_id", "789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    var URL = "https://oauth2.googleapis.com/token"

    try {
        var data = await http_r.apiCaller(requestOptions, URL);
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed)
            return data;
        else {
            console.log("getGoogleAccessToken FAIL");
            return null;
        }
    }
}

async function getGoogleUserInfo(access_token)
{
    console.log("INSIDE getGoogleUserInfo only for the web");
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);
    let is_failed = false;

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

    try {
        var data = await http_r.apiCaller(requestOptions, URL);
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed)
            return data;
        else {
            console.log("getGoogleUserInfo FAIL");
            return null;
        }
    }
}

async function getGoogle(token)
{
    var tokens = await getGoogleAccessToken(token);
    var info = await getGoogleUserInfo(tokens.access_token);

    if (tokens == null || info == null) {
        const message = `An error has occured in getGoogle.`;
        throw new Error(message);
    }
    else
        return {tokens: tokens, info: info};
}

async function connectGoogle(info)
{
    let is_failed = false;
    let is_failed_2 = false;

    try {
        var user = await user_prisma.findUniqueAuthenticate(info.email);
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed && user != null && info.id == user.password) {
            console.log('googleAuthenticate SUCESSFUL');
            return {code:200, json:{
                //data: req.body.response,
                //data: req.body.response.tokenObj.session_state,
                success: true,
                body: 'googleAuthentication done!',
                token: user.token,
                }
            };
        }
        else {
            try {
                var registerUser = await user_prisma.createUser(info.email, info.email, info.id, info.given_name, info.family_name)
            }
            catch (error) {
                console.log(error);
                is_failed_2 = true
            }
            finally {
                if (!is_failed_2) {
                    console.log('googleRegister SUCESSFUL');
                    console.log('registerUser =', JSON.stringify(registerUser));
                    return {code:200, json:{
                        success: true,
                        body: 'googleAuthentication done!',
                        //registerUser
                        token: registerUser.token
                        }
                    };
                }
                else {
                    console.log('googleRegisterOrAuthenticate FAIL');
                    return null;
                    /*return {code:401, json:{
                        success: false,
                        body: 'googleRegisterOrAuthenticate Failed'
                        }
                    };*/
                }
            }
        }
    }
}

async function google(data, token, is_mobile)
{
    console.log("inside google")
    //let isSuccess = true;
    let is_failed = false;
    var userData = await connectGoogle(data.info); //need try catch finally
    if (userData == null) {
        console.log("google FAIL")
        return {code:401, json:{
            success: false,
            body: 'google Failed'
            }
        };
    }
    const disableAt = (Date.now() + ((data.tokens.expires_in - 200) * 1000));

    console.log("userData =", JSON.stringify(userData));

    var userToken = userData.json.token;

/*
    if (userData.json.token != undefined) {
        var userToken = userData.json.token;
    }
    else if (userData.json.registerUser.token != undefined) {
        var userToken = userData.json.registerUser.token;
        //var userToken = userData.json.registerUser;
    }
*/
    if (userData.code == 200) {
        try {
            var user = await api_access.updateApiToken(userToken, token, "GOOGLE", disableAt, data.tokens.access_token, data.tokens.refresh_token, is_mobile)
        }
        catch (error) {
            console.log(error);
            is_failed = true
        }
        finally {
            if (!is_failed) {
                console.log('updateApiToken GOOGLE SUCESSFUL');
                console.log('user =', JSON.stringify(user));
                return userData;
/*
                return {code:200, json:{
                    success: true,
                    body: 'googleAuthentication done!',
                    user
                    }
                };
*/
            }
            else {
                console.log('updateApiToken GOOGLE FAIL');
                return {code:401, json:{
                    success: false,
                    body: 'google Failed'
                    }
                };
            }
        }




        //api_access.updateApiToken(userData.json.token, token, "GOOGLE", disableAt, data.tokens.access_token, data.tokens.refresh_token, is_mobile)

/*
        api_access.updateApiToken(userToken, token, "GOOGLE", disableAt, data.tokens.access_token, data.tokens.refresh_token, is_mobile)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((user) => {
            if (isSuccess == true){
                console.log('updateApiToken GOOGLE SUCESSFUL');
                return userData;
            }
            else {
                console.log('updateApiToken GOOGLE FAIL');
                return {code:401, json:{
                    success: false,
                    body: 'updateApiToken GOOGLE Failed'
                    }
                };
            }
        });*/
    }
    else {
        console.log('connectGoogle, userData.code != 200');
        return userData;
    }

    //return userData;
}

module.exports.getGoogleAccessToken = getGoogleAccessToken;
module.exports.getGoogleUserInfo = getGoogleUserInfo;
module.exports.getGoogle = getGoogle;
module.exports.connectGoogle = connectGoogle;
module.exports.google = google;