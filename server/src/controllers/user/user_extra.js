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
    console.log("inside getGoogle")
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
            console.log('connectGoogle findUniqueAuthenticate SUCESSFUL');
            return {code:200, json:{
                //data: req.body.response,
                //data: req.body.response.tokenObj.session_state,
                success: true,
                body: 'connectGoogle googleAuthentication done!',
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
                    console.log('connectGoogle googleRegister SUCESSFUL');
                    //console.log('registerUser =', JSON.stringify(registerUser));
                    return {code:200, json:{
                        success: true,
                        body: 'googleRegister done!',
                        token: registerUser.token
                        }
                    };
                }
                else {
                    console.log('connectGoogle googleRegister FAIL');
                    return null;
                }
            }
        }
    }
}

async function connectGoogleMobile(info)
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
        if (!is_failed && user != null && info.googleId == user.password) {
            console.log('connectGoogle findUniqueAuthenticate SUCESSFUL');
            return {code:200, json:{
                success: true,
                body: 'connectGoogle googleAuthentication done!',
                token: user.token,
                }
            };
        }
        else {
            try {
                var registerUser = await user_prisma.createUser(info.email, info.email, info.googleId, info.givenName, info.familyName)
            }
            catch (error) {
                console.log(error);
                is_failed_2 = true
            }
            finally {
                if (!is_failed_2) {
                    console.log('connectGoogle googleRegister SUCESSFUL');
                    return {code:200, json:{
                        success: true,
                        body: 'googleRegister done!',
                        token: registerUser.token
                        }
                    };
                }
                else {
                    console.log('connectGoogle googleRegister FAIL');
                    return null;
                }
            }
        }
    }
}

async function google(data, token, is_mobile)
{
    console.log("inside google")
    let is_failed = false;
    var userData = await connectGoogle(data.info);

    if (userData == null) {
        console.log("google from inside FAIL")
        return {code:401, json:{
            success: false,
            body: 'google Failed'
            }
        };
    }

    const disableAt = (Date.now() + ((data.tokens.expires_in - 200) * 1000));
    //console.log("userData =", JSON.stringify(userData));
    var userToken = userData.json.token;

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
                //console.log('user =', JSON.stringify(user));
                return userData;
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
    }
    else {
        console.log('connectGoogle, userData.code != 200');
        //return userData;
        return {code:401, json:{
            success: false,
            body: 'google Failed'
            }
        };
    }
}

module.exports.getGoogleAccessToken = getGoogleAccessToken;
module.exports.getGoogleUserInfo = getGoogleUserInfo;
module.exports.getGoogle = getGoogle;
module.exports.connectGoogle = connectGoogle;
module.exports.connectGoogleMobile = connectGoogleMobile;
module.exports.google = google;