const main = require('../../main');
const http_r = require('../../api/http_requester');
const utf8 = require('utf8');

async function findUniqueApiTokenSimple(token, type) {
    const user = await main.prisma.eX_API.findUnique({
        where: {
            type_userToken: {
                type: type,
                userToken: token,
            }
        },
        select: {
            //token: true,
            disableAt: true,
            acstoken: true,
            rfstoken: true,
            is_mobile: true,
        }
    })
    return user;
}

async function findUniqueApiToken(token, type) {
    const user = await main.prisma.eX_API.findUnique({
        where: {
            type_userToken: {
                type: type,
                userToken: token,
            }
        },
        select: {
            token: true,
            type: true,
            disableAt: true,
            acstoken: true,
            rfstoken: true,
            is_mobile: true,
        }
    })
    return user;
}

async function updateApiToken(authToken, token, type, disableAt, acstoken, rfstoken, is_mobile) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            exApi: {
                upsert: {
                    create: {
                        type: type,
                        token: token,
                        disableAt: disableAt,
                        acstoken: acstoken,
                        rfstoken: rfstoken,
                        is_mobile: is_mobile,
                    },
                    update: {
                        type: type,
                        token: token,
                        disableAt: disableAt,
                        acstoken: acstoken,
                        rfstoken: rfstoken,
                        is_mobile: is_mobile,
                    },
                    where: {
                        type_userToken: {
                            type: type,
                            userToken: authToken,
                        }
                    },
                }
            }
        }
    })
    return user;
}

async function updateApiAccessToken(type, token, acstoken, rfstoken, disableAt) {
    const user = await main.prisma.eX_API.update({
        where: {
            type_userToken: {
                type: type,
                userToken: token,
            }
        },
        data: {
            acstoken: acstoken,
            rfstoken: rfstoken,
            disableAt: disableAt,
        }
    });
    return user;
}

async function getUserApiToken(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            exApi: true,
        }
    })
    return user;
}

const fetch = require('node-fetch');

async function redditGetAcessTokenWeb(redditToken)
{
    console.log("INSIDE redditGetAcessTokenWeb");
    console.log("redditToken = ", redditToken);
    //const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');
    const basicAuth = "Basic " + Buffer.from(utf8.encode('kwkqREzWGXUd_55yFSG8pg:')).toString('base64'); //alexandre's API key
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + redditToken + "&redirect_uri=http://localhost:8081/oauth2_callback"
    var data = await http_r.apiCaller(requestOptions, URL);

    return data;
};

async function redditGetAcessTokenMobile(redditToken)
{
    console.log("INSIDE redditGetAcessTokenMobile");
    const basicAuth = "Basic " + Buffer.from(utf8.encode('f7gY1o1RsIYnbY6OtwFfVQ:')).toString('base64');
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + redditToken + "&redirect_uri=com.example.area://callback"
    var data = await http_r.apiCaller(requestOptions, URL);
    return data;
};

async function redditRefreshAcessTokenWeb(refreshToken)
{
    console.log("INSIDE redditRefreshAcessTokenWeb");
    //const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');
    const basicAuth = "Basic " + Buffer.from(utf8.encode('kwkqREzWGXUd_55yFSG8pg:')).toString('base64'); //alexandre's API key
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=" + refreshToken + "&redirect_uri=http://localhost:8081/oauth2_callback"
    var data = await http_r.apiCaller(requestOptions, URL);
    return data;
};

async function redditRefreshAcessTokenMobile(refreshToken)
{
    console.log("INSIDE redditRefreshAcessTokenMobile");
    const basicAuth = "Basic " + Buffer.from(utf8.encode('f7gY1o1RsIYnbY6OtwFfVQ:')).toString('base64');
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=" + refreshToken + "&redirect_uri=com.example.area://callback"
    var data = await http_r.apiCaller(requestOptions, URL);
    return data;
};
/*
const {GoogleLogin} = require('react-google-login');

async function googleRefresh()
{
    GoogleLogin.reload
}
*/
module.exports.findUniqueApiTokenSimple = findUniqueApiTokenSimple;
module.exports.findUniqueApiToken = findUniqueApiToken;
module.exports.updateApiToken = updateApiToken;
module.exports.updateApiAccessToken = updateApiAccessToken;
module.exports.getUserApiToken = getUserApiToken;
module.exports.redditGetAcessTokenWeb = redditGetAcessTokenWeb;
module.exports.redditGetAcessTokenMobile = redditGetAcessTokenMobile;
module.exports.redditRefreshAcessTokenWeb = redditRefreshAcessTokenWeb;
module.exports.redditRefreshAcessTokenMobile = redditRefreshAcessTokenMobile;