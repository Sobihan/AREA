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

async function updateApiToken(authToken, token, type, disableAt, acstoken, rfstoken) {
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
                    },
                    update: {
                        type: type,
                        token: token,
                        disableAt: disableAt,
                        acstoken: acstoken,
                        rfstoken: rfstoken,
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

async function redditGetAcessToken(redditToken)
{
    const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');
    var myHeaders = new fetch.Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Cookie", "edgebucket=NFsC7UQxIKop6Oc1vY");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var URL = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + redditToken + "&redirect_uri=http://localhost/oauth2_callback"
    var data = await http_r.apiCaller(requestOptions, URL);
    return data;
};


async function redditRefreshAcessToken(refreshToken)
{
    const basicAuth = "Basic " + Buffer.from(utf8.encode('qoL2raGY-ElMh7s1jBBAlw:')).toString('base64');
    var myHeaders = new fetch.Headers();

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
};

async function twitchGetAcessToken(client_id, client_secret) {
    var resolver;
    const request = new Promise(resolve => resolver = resolve);
    const params = new URLSearchParams({
      "client_id": client_id,
      "client_secret": client_secret,
      "grant_type": "client_credentials",
    });
    https.request(
      `https://id.twitch.tv/oauth2/token?${params}`, {method: 'POST'}, (twitchRes) => {
        twitch_request(twitchRes, body => {
          accessToken = body.access_token;
          promiseResolver({res: twitchRes, body});
        });
      }).end();
    return request;
}

async function twitchRevokeAcessToken(client_id, token) {
    var resolver;
    const request = new Promise(resolve => resolver = resolve);
    const params = new URLSearchParams({
      "client_id": client_id,
      "token": token
    });
    https.request(
      `https://id.twitch.tv/oauth2/revoke?${params}`, {method: 'POST'}, (twitchRes) => {
        twitch_request(twitchRes, body => {
          accessToken = body.access_token;
          promiseResolver({res: twitchRes, body});
        });
      }).end();
    return request;
}

function twitch_request(req, cb) {
  let body = '';
  req
    .on('data', chunk => body += chunk)
    .on('end', () => {
      if (!body) return cb(null);
      try {
        cb(JSON.parse(body), body)
      } catch (e) {
        console.warn('body could not be parsed', e);
        cb(null);
      }
    });
}

module.exports.findUniqueApiTokenSimple = findUniqueApiTokenSimple;
module.exports.findUniqueApiToken = findUniqueApiToken;
module.exports.updateApiToken = updateApiToken;
module.exports.updateApiAccessToken = updateApiAccessToken;
module.exports.getUserApiToken = getUserApiToken;
module.exports.redditGetAcessToken = redditGetAcessToken;
module.exports.redditRefreshAcessToken = redditRefreshAcessToken;
module.exports.twitchGetAcessToken = redditRefreshAcessToken;
module.exports.twitchRevokeAcessToken = redditRefreshAcessToken;