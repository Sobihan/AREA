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

async function findUniqueApiToken(token, type) {
    const user = await main.prisma.user.findMany({
        where: {
            token: token,
            exApi: {
                some: {
                    type: type,
                }
            }
        },
        select: {
            token: true,
            exApi: {
                select: {
                    token: true,
                    type: true,
                    disableAt: true,
                    acstoken: true,
                    rfstoken: true,
                }
            }
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

async function updateApiAccessToken(token, acstoken, rfstoken, disableAt) {
    const user = await main.prisma.eX_API.update({
        where: {
            token: token,
        },
        data: {
            acstoken: acstoken,
            rfstoken: rfstoken,
            disableAt: disableAt,
        }
    });
    return user;
}

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

module.exports.findUniqueApiToken = findUniqueApiToken;
module.exports.updateApiToken = updateApiToken;
module.exports.updateApiAccessToken = updateApiAccessToken;