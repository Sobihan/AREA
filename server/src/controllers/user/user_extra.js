const user_prisma = require('../../db_management/user/db_user');
const http_r = require('../../api/http_requester');
const utf8 = require('utf8');
const fetch = require('node-fetch');
const api_access = require('../../db_management/api_access/db_api_access');

//async function updateApiToken(authToken, token, type, disableAt, acstoken, rfstoken, is_mobile)

// function connectGoogle(info)
// {
//     let isSuccess = true;
//     let isSuccess_2 = true;

//     user_prisma.findUniqueAuthenticate(info.email)
//     .catch((e) => {
//         isSuccess = false;
//         console.log(e);
//     })
//     .then((user) => {
//         if (isSuccess == true && user != null && info.id == user.password) {
//             console.log('googleAuthenticate SUCESSFUL');
//             return {code:200, json:{
//                     //data: req.body.response,
//                     //data: req.body.response.tokenObj.session_state,
//                     success: true,
//                     body: 'googleAuthentication done!',
//                     token: user.token,
//                     }
//             };
//         }
//         else {
//             user_prisma.createUser(info.email, info.email, info.id, info.given_name, info.family_name)
//             .catch((e) => {
//                 isSuccess_2 = false;
//                 console.log(e);
//             })
//             .then((user) => {
//                 if (isSuccess_2 == true) {
//                     console.log('googleRegister SUCESSFUL');
//                     return {code:200, json:{
//                         success: true,
//                         body: 'googleAuthentication done!',
//                         user
//                         }
//                     };
// /*
//                     res.status(200).json({
//                         success: true,
//                         body: 'googleRegistration done!',
//                         user
//                     });
// */
//                 }
//                 else {
//                     console.log('googleRegisterOrAuthenticate FAIL');
//                     return {code:401, json:{
//                         success: false,
//                         body: 'googleRegisterOrAuthenticate Failed',
//                         user
//                         }
//                     };
// /*
//                     res.status(401).json({
//                         success: false,
//                         body: 'googleRegisterOrAuthenticate Failed'
//                     });
// */
//                 }
//             });
//         }
//     });
//     return {code:401, json:{
//         success: false,
//         body: 'googleRegisterOrAuthenticate Failed',
//         user
//         }
//     };
// }



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
                //user
                }
            };
            //return user;
        }
        else {
            try {
                var registerUser = user_prisma.createUser(info.email, info.email, info.id, info.given_name, info.family_name)
            }
            catch (error) {
                console.log(error);
                is_failed_2 = true
            }
            finally {
                if (!is_failed_2) {
                    console.log('googleRegister SUCESSFUL');
                    return {code:200, json:{
                        success: true,
                        body: 'googleAuthentication done!',
                        registerUser
                        }
                    };
                }
                else {
                    console.log('googleRegisterOrAuthenticate FAIL');
                    return {code:401, json:{
                        success: false,
                        body: 'googleRegisterOrAuthenticate Failed'
                        }
                    };
                }
            }

            //console.log("googleAuthenticate FAIL");
            //return null;
        }
    }


/*

    let isSuccess = true;
    let isSuccess_2 = true;

    user_prisma.findUniqueAuthenticate(info.email)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true && user != null && info.id == user.password) {
            console.log('googleAuthenticate SUCESSFUL');
            return {code:200, json:{
                    //data: req.body.response,
                    //data: req.body.response.tokenObj.session_state,
                    success: true,
                    body: 'googleAuthentication done!',
                    token: user.token,
                    //user
                    }
            };
        }
        else {



            user_prisma.createUser(info.email, info.email, info.id, info.given_name, info.family_name)
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_2 == true) {
                    console.log('googleRegister SUCESSFUL');
                    return {code:200, json:{
                        success: true,
                        body: 'googleAuthentication done!',
                        user
                        }
                    };
                }
                else {
                    console.log('googleRegisterOrAuthenticate FAIL');
                    return {code:401, json:{
                        success: false,
                        body: 'googleRegisterOrAuthenticate Failed'
                        }
                    };
                }
            });
        }
    });
*/
    /*return {code:401, json:{
        success: false,
        body: 'googleRegisterOrAuthenticate Failed'
        }
    };*/
}

async function google(data, token, is_mobile)
{
    console.log("inside google")
    let isSuccess = true;
    var userData = await connectGoogle(data.info);
    const disableAt = (Date.now() + ((data.tokens.expires_in - 200) * 1000));

//    console.log("userData =", JSON.stringify(userData));
//    console.log("data.tokens =", JSON.stringify(data.tokens));

    if (userData.code == 200) {
        api_access.updateApiToken(userData.json.token, token, "GOOGLE", disableAt, data.tokens.access_token, data.tokens.refresh_token, is_mobile)
        //api_access.updateApiToken(userData.token, token, "GOOGLE", disableAt, data.tokens.access_token, data.tokens.refresh_token, is_mobile)
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
        });
    }
    else {
        console.log('connectGoogle, userData.code != 200');
        return userData;
    }

    return userData;
/*
    var info = await getGoogleUserInfo(tokens.access_token);

    if (tokens == null || info == null) {
        const message = `An error has occured in getGoogle.`;
        throw new Error(message);
    }
    else
        return {tokens: tokens, info: info};
*/
    //const googleData = {tokens: tokens, info: info};
}

module.exports.getGoogleAccessToken = getGoogleAccessToken;
module.exports.getGoogleUserInfo = getGoogleUserInfo;
module.exports.getGoogle = getGoogle;
module.exports.connectGoogle = connectGoogle;
module.exports.google = google;