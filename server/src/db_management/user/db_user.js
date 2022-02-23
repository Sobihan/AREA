const main = require('../../main');

/*
function convertInt(x, base) {
    const parsed = parseInt(x, base);

    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
}
*/

async function createUser(username, email, password, name, lstName) {
    const user = await main.prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password,
            name: name != '' ? name : undefined,
            lstName: lstName != '' ? lstName : undefined,
        },
    });
    return user;
}

async function findUniqueAuthenticate(email) {
    const user = await main.prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            username: true,
            password: true,
            token: true,
        },
    });
    return user;
}

async function updateUserData(authToken, name, lstName, avatar) {
    console.log('authToken = ' + authToken);
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            name: name != '' ? name : undefined,
            lstName: lstName != '' ? lstName : undefined,
            avatar: avatar != '' ? avatar : undefined,
        },
    });
    return user;
}

async function getUserData(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            username: true,
            email: true,
            name: true,
            lstName: true,
            avatar: true,
        },
    });
    return user;
}

// async function getGoogleAccessToken(token)
// {
//     console.log("INSIDE getGoogleAccessToken only for the web");
//     const basicAuth = "Basic " + Buffer.from(utf8.encode('789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com: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')).toString('base64');
//     var myHeaders = new fetch.Headers();
//     var urlencoded = new URLSearchParams();
//     let is_failed = false;

//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//     myHeaders.append("Authorization", basicAuth);
//     urlencoded.append("grant_type", "authorization_code");
//     urlencoded.append("code", token);
//     urlencoded.append("redirect_uri", "http://localhost:8081");
//     urlencoded.append("client_id", "789963154068-jq4283e019useue1vfa8d8a19go9istp.apps.googleusercontent.com");
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: 'follow'
//     };
//     var URL = "https://oauth2.googleapis.com/token"

//     try {
//         var data = await http_r.apiCaller(requestOptions, URL);
//     }
//     catch (error) {
//         console.log(error);
//         is_failed = true
//     }
//     finally {
//         if (!is_failed)
//             return data;
//         else {
//             console.log("getGoogleAccessToken FAIL");
//             return null;
//         }
//     }
// }

// async function getGoogleUserInfo(access_token)
// {
//     console.log("INSIDE getGoogleUserInfo only for the web");
//     var myHeaders = new fetch.Headers();
//     myHeaders.append("Authorization", "Bearer " + access_token);
//     let is_failed = false;

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };
//     var URL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

//     try {
//         var data = await http_r.apiCaller(requestOptions, URL);
//     }
//     catch (error) {
//         console.log(error);
//         is_failed = true
//     }
//     finally {
//         if (!is_failed)
//             return data;
//         else {
//             console.log("getGoogleUserInfo FAIL");
//             return null;
//         }
//     }
// }

// async function getGoogle(token)
// {
//     var tokens = await getGoogleAccessToken(token);
//     var info = await getGoogleUserInfo(tokens.access_token);

//     if (tokens == null || info == null) {
//         const message = `An error has occured in getGoogle.`;
//         throw new Error(message);
//     }
//     else
//         return {tokens: tokens, info: info};
//     //const googleData = {tokens: tokens, info: info};
// }

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
//                     //user
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
//                 }
//                 else {
//                     console.log('googleRegisterOrAuthenticate FAIL');
//                     return {code:401, json:{
//                         success: false,
//                         body: 'googleRegisterOrAuthenticate Failed'
//                         }
//                     };
//                 }
//             });
//         }
//     });
//     return {code:401, json:{
//         success: false,
//         body: 'googleRegisterOrAuthenticate Failed'
//         }
//     };
// }

// function google(data, token, is_mobile)
// {
//     let isSuccess = true;
//     var userData = connectGoogle(data.info);
//     const disableAt = (Date.now() + ((data.token.expires_in - 200) * 1000));

//     if (userData.code == 200) {
//         updateApiToken(userData.token, token, "GOOGLE", disableAt, data.token.access_token, data.token.refresh_token, is_mobile)
//         .catch((e) => {
//             isSuccess = false;
//             console.log(e);
//         })
//         .then((user) => {
//             if (isSuccess == true){
//                 console.log('updateApiToken GOOGLE SUCESSFUL');
//                 return userData;
//             }
//             else {
//                 console.log('updateApiToken GOOGLE FAIL');
//                 return {code:401, json:{
//                     success: false,
//                     body: 'updateApiToken GOOGLE Failed'
//                     }
//                 };
//             }
//         });
//     }
//     else {
//         return userData;
//     }

//     return userData;

//     var info = await getGoogleUserInfo(tokens.access_token);

//     if (tokens == null || info == null) {
//         const message = `An error has occured in getGoogle.`;
//         throw new Error(message);
//     }
//     else
//         return {tokens: tokens, info: info};
//     //const googleData = {tokens: tokens, info: info};
// }

//module.exports.convertInt = convertInt;
module.exports.createUser = createUser;
module.exports.findUniqueAuthenticate = findUniqueAuthenticate;
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;


// module.exports.getGoogleAccessToken = getGoogleAccessToken;
// module.exports.getGoogleUserInfo = getGoogleUserInfo;
// module.exports.getGoogle = getGoogle;
// module.exports.connectGoogle = connectGoogle;
// module.exports.google = google;