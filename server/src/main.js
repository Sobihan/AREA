// Import dependencies
const { PrismaClient } = require('@prisma/client')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const api = require('./routes/routes');
const about = require('./controllers/about')

// const Twitch = require('./area/action/twitch');
// Twitch.getStream("Sardoche");

//const utf8 = require('utf8');
//const http_r = require('./http_requester');
//const controllers = require('./controllers/controllers');
const prisma = new PrismaClient()

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const hostname = 'backend';
const port = 8080;

BigInt.prototype.toJSON = function() { return this.toString()  }

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.get('/about', about.about);
app.get('/about.json', about.about);

// Catch any bad requests
app.get('*', (req, res) => {
    console.log('Catch All');
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/*
async function findUniqueToken(token) {
    const user = await prisma.user.findMany({
        where: {
            token: token,
            exApi: {
                some: {
                    type: 'REDDIT',
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

async function updateRedditToken(authToken, redditToken) {
    const user = await prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            exApi: {
                upsert: {
                    create: {
                        type: 'REDDIT',
                        token: redditToken,
                    },
                    update: {
                        type: 'REDDIT',
                        token: redditToken,
                        disableAt: null,
                        acstoken: null,
                        rfstoken: null,
                    },
                    where: {
                        type_userToken: {
                            type: 'REDDIT',
                            userToken: authToken,
                        }
                    },
                }
            }
        }
    })
    return user;
}

async function updateRedditAccessToken(token, acstoken, rfstoken, disableAt) {
    const user = await prisma.eX_API.update({
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

module.exports.findUniqueToken = findUniqueToken;
module.exports.updateRedditToken = updateRedditToken;
module.exports.updateRedditAccessToken = updateRedditAccessToken;
module.exports.redditGetAcessToken = redditGetAcessToken;
module.exports.redditRefreshAcessToken = redditRefreshAcessToken;
*/
module.exports.prisma = prisma;


//docker run --rm --name postgres-quotes -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres:14.1-alpine
//npx prisma migrate dev --name init
//docker exec -it dashboard_bend sh
//sudo chmod -R 777 db
//systemctl stop apache2.service
//sudo docker-compose rm
//docker rmi b-dev-500-par-5-1-dashboard-alexandre1berthomier_dbpostgres
//docker stop $(docker ps -aq)
//docker rm $(docker ps -aq)
//docker rmi $(docker images -q)
//docker rmi dashboard/fend:latest
//git reset HEAD^

//sudo docker-compose up --build backend