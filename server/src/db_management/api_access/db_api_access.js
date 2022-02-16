const main = require('../../main');
const http_r = require('../../api/http_requester');
const utf8 = require('utf8');

/*
function convertInt(x, base) {
    const parsed = parseInt(x, base);

    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
}
*/

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
        }
    })
    return user;
}

async function updateApiToken(authToken, token, type) {
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
                    },
                    update: {
                        type: type,
                        token: token,
                        disableAt: null,
                        acstoken: null,
                        rfstoken: null,
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
        /*where: {
            token: token,
        },*/
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

// function redditRefreshAcessToken(refreshToken, callback, type, userToken, returnCallback) {
//     const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');

//     var options = {
//         'method': 'POST',
//         'hostname': 'www.reddit.com',
//         'path': '/api/v1/access_token?grant_type=refresh_token&refresh_token=' + refreshToken + '&redirect_uri=http://localhost/oauth2_callback',
//         'headers': {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': basicAuth
//         },
//         'maxRedirects': 20
//     };

//     http_r.http_reqRefresh(options, callback, type, userToken, returnCallback);
// };

const fetch = require('node-fetch');

async function redditRefreshAcessToken(refreshToken/*, callback, type, userToken, returnCallback*/)
{
    const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');


    var myHeaders = new fetch.Headers();//Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=" + refreshToken + "&redirect_uri=http://localhost/oauth2_callback"

    var data = await http_r.apiCaller(requestOptions, URL);
    return data;

/*
    var options = {
        'method': 'POST',
        'hostname': 'www.reddit.com',
        'path': '/api/v1/access_token?grant_type=refresh_token&refresh_token=' + refreshToken + '&redirect_uri=http://localhost/oauth2_callback',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': basicAuth
        },
        'maxRedirects': 20
    };

    http_r.http_reqRefresh(options, callback, type, userToken, returnCallback);
*/
};

/*
function redditGetAcessToken(token, callback) {
    const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');

    const options = {
        'method': 'POST',
        'hostname': 'www.reddit.com',
        'path': '/api/v1/access_token?grant_type=authorization_code&code=' + token + '&redirect_uri=http://localhost/oauth2_callback',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': basicAuth
        },
        'maxRedirects': 20
    };
    http_r.http_req(options, callback)
};

function redditRefreshAcessToken(token, callback) {
    const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');

    var options = {
        'method': 'POST',
        'hostname': 'www.reddit.com',
        'path': '/api/v1/access_token?grant_type=refresh_token&refresh_token=' + token + '&redirect_uri=http://localhost/oauth2_callback',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': basicAuth
        },
        'maxRedirects': 20
    };

    http_r.http_req(options, callback)
};
*/

module.exports.findUniqueApiTokenSimple = findUniqueApiTokenSimple;
module.exports.findUniqueApiToken = findUniqueApiToken;
module.exports.updateApiToken = updateApiToken;
module.exports.updateApiAccessToken = updateApiAccessToken;
module.exports.redditRefreshAcessToken = redditRefreshAcessToken;