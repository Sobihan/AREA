const api = require('../api/http_requester');
const prisma = require('../main');
const reddit = require('../api/API_handler');
/*
const About = (req, res, next) => {
    const ip = (req.ip.substr(0, 7) == "::ffff:") ? req.ip.substr(7) : req.ip;
    res.status(200).json({
        client: {
            host: ip
        },
        server: {
            current_time: Date.now(),
            services: [{
                name: 'reddit',
                widgets: [{
                    name: 'reddit-get-me',
                    description: "Gives the user's informations",
                    params: [{
                        name: 'authtoken',
                        type: 'string',
                        description: 'user token (given upon authentication of a valide user)',
                    }]
                }, {
                    name: 'reddit-get-my-subreddits',
                    description: "Gives the user's subscribed subreddits info",
                    params: [{
                        name: 'authtoken',
                        type: 'string',
                        description: 'user token (given upon authentication of a valide user)',
                    }]
                }]
            }, {
                name: 'news',
                widgets: [{
                    name: 'news-get-country',
                    description: "Gives the last news from the asked country",
                    params: [{
                        name: 'country',
                        type: 'string',
                        description: '2-letter ISO 3166-1 code of the country',
                    }]
                }, {
                    name: 'news-get-category',
                    description: "Gives the last news from the asked category",
                    params: [{
                        name: 'category',
                        type: 'string',
                        description: 'Possible options: business, entertainment, general, health, science, sports, technology',
                    }]
                }]
            }, {
                name: 'weather',
                widgets: [{
                    name: 'weather-get-temperature',
                    description: "Gives the given location's temperature for the last hour.",
                    params: [{
                        name: 'location',
                        type: 'string',
                        description: 'City name, state code and country code divided by comma, Please, refer to ISO 3166 for the state codes or country codes.',
                    }]
                }, {
                    name: 'weather-get-humidity',
                    description: "Gives the given location's humidity for the last hour.",
                    params: [{
                        name: 'location',
                        type: 'string',
                        description: 'City name, state code and country code divided by comma, Please, refer to ISO 3166 for the state codes or country codes.',
                    }]
                }]
            }]
        }
    });
}

const Authenticate = (req, res, next) => {
    let isSuccess = true;
    prisma.findUniqueAuthenticate(req.body.username)
    .catch((e) => {
        isSuccess = false;
    })
    .then((user) => {
        if (!user)
            isSuccess = false;
        if (isSuccess == true && req.body.password == user.password) {
            console.log('Authenticate SUCESS');
            res.status(200).json({
                body: 'Authentication done!',
                token: user.token,
            });
        }
        else {
            console.log('Authenticate FAIL');
            res.status(401).json({
                body: 'Authentication Failed'
            });
        }
    });
    console.log('Authenticate');
    console.log('Got body:', req.body);
};

const Register = (req, res, next) => {
    let isSuccess = true;
    prisma.createUser(req.body.username, req.body.password)
    .catch((e) => {
        isSuccess = false;
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('Register SUCESS');
            res.status(200).json({
                body: 'Registration done!',
                user
            });
        }
        else {
            console.log('Register FAIL');
            res.status(401).json({
                body: 'Registration Failed'
            });
        }
    });
    console.log('Register');
    console.log('Got body:', req.body);
};

const redditAuth = (req, res, next) => {
    let isSuccess = true;
    prisma.updateRedditToken(req.body.authtoken, req.body.reddittoken)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        //console.logTEST ' + isSuccess);
    })
    .then((user) => {
        //console.logTEST22 ' + isSuccess);
        if (isSuccess == true){
            console.log('redditAuth SUCESS');
            res.status(200).json({
                body: 'redditAuth done!',
                user
            });
        }
        else {
            console.log('redditAuth FAIL');
            res.status(401).json({
                body: 'redditAuth Failed'
            });
        }
    });
    console.log('Register');
    console.log('Got body:', req.body);
};

const redditGetMe = (req, res, next) => {
    reddit.redditAcessToken(req.body.authtoken, function(accessToken) {
        const options = {
            'method': 'GET',
            'hostname': 'oauth.reddit.com',
            'path': '/api/me.json',
            'headers': {
                'User-Agent': 'NotePad-Chan_Dashboard by /u/NotePad-Chan',
                'Authorization': 'bearer ' + accessToken
            },
            'maxRedirects': 20
        };
        console.log('Got body:', req.body);
        api.http_req(options, function(response) {
            const json_response = JSON.parse(response);
            res.status(200).json({
                body: 'redditGetMe',
                json_response
            });
        });
        console.log('reddit-get-me');
    });
};

const redditGetSubredditsPost = (req, res, next) => {
    reddit.redditAcessToken(req.body.authtoken, function(accessToken) {
        const options = {
            'method': 'GET',
            'hostname': 'oauth.reddit.com',
            //'path': '/r/$subreddit/$sort.json?limit=$limit&count=$count&after=$after',
            //'path': '/r/memes/new.json?limit=25&count=0&after=',
            'path': '/' + req.body.subreddits + '/new.json?limit=5&count=0&after=',
            'headers': {
                'User-Agent': 'NotePad-Chan_Dashboard by /u/NotePad-Chan',
                'Authorization': 'bearer' + accessToken
            },
            'maxRedirects': 20
        };

        console.log('Got body:', req.body);

        api.http_req(options, function(response) {
            const json_response = JSON.parse(response);
            res.status(200).json({
                body: 'redditGetSubredditsPost',
                json_response
            });
        });
        console.log('reddit-get-subreddits-post');
    });
};

const redditGetMySubreddits = (req, res, next) => {
    reddit.redditAcessToken(req.body.authtoken, function(accessToken) {
        const options = {
            'method': 'GET',
            'hostname': 'oauth.reddit.com',
            'path': '/subreddits/mine/subscriber.json',
            'headers': {
                'User-Agent': 'NotePad-Chan_Dashboard by /u/NotePad-Chan',
                'Authorization': 'bearer ' + accessToken
            },
            'maxRedirects': 20
        };

        console.log('Got body:', req.body);

        api.http_req(options, function(response) {
            const json_response = JSON.parse(response);
            res.status(200).json({
                body: 'redditGetMySubreddits',
                json_response
            });
        });
        console.log('reddit-get-my-subreddits');
    });
};

const redditGetKarma = (req, res, next) => {
    reddit.redditAcessToken(req.body.authtoken, function(accessToken) {
        const options = {
            'method': 'GET',
            'hostname': 'oauth.reddit.com',
            'path': '/api/v1/me/karma.json',
            'headers': {
                'User-Agent': 'NotePad-Chan_Dashboard by /u/NotePad-Chan',
                'Authorization': 'bearer ' + accessToken
            },
            'maxRedirects': 20
        };

        console.log('Got body:', req.body);

        api.http_req(options, function(response) {
            const json_response = JSON.parse(response);
            res.status(200).json({
                body: 'redditGetKarma',
                json_response
            });
        });
        console.log('reddit-get-karma');
    });
};

const newsGetCountry = (req, res, next) => {
    const options = {
        'method': 'GET',
        'hostname': 'newsapi.org',
        'path': '/v2/top-headlines?country=' + req.body.country,
        'headers': {
            'Authorization': 'Bearer b843f6f4fb97465f862f7da9dd78d56b'
        },
        'maxRedirects': 20
    };

    console.log('Got body:', req.body);

    api.http_req(options, function(response) {
        const json_response = JSON.parse(response);
        res.status(200).json({
            body: 'redditGetKarma',
            json_response
        });
    });
    console.log('reddit-get-karma');
};

const newsGetCategory = (req, res, next) => {
    const options = {
        'method': 'GET',
        'hostname': 'newsapi.org',
        'path': '/v2/top-headlines?category=' + req.body.category,
        'headers': {
            'Authorization': 'Bearer b843f6f4fb97465f862f7da9dd78d56b'
        },
        'maxRedirects': 20
    };

    console.log('Got body:', req.body);

    api.http_req(options, function(response) {
        const json_response = JSON.parse(response);
        res.status(200).json({
            body: 'redditGetKarma',
            json_response
        });
    });
    console.log('reddit-get-karma');
};

const weatherGetTemperature = (req, res, next) => {
    var options = {
        'method': 'GET',
        'hostname': 'api.openweathermap.org',
        'path': '/data/2.5/weather?q=' + req.body.location + '&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric&lang=fr',
        'maxRedirects': 20
    };

    console.log('Got body:', req.body);

    api.http_req(options, function(response) {
        const json_response = JSON.parse(response);
        res.status(200).json({
            body: 'redditGetKarma',
            json_response
        });
    });
    console.log('reddit-get-karma');
};

const weatherGetHumidity = (req, res, next) => {
    var options = {
        'method': 'GET',
        'hostname': 'api.openweathermap.org',
        'path': '/data/2.5/weather?q=' + req.body.location + '&appid=4fafe53c81fb82a6c557d25b46e2d2be&units=metric&lang=fr',
        'maxRedirects': 20
    };

    console.log('Got body:', req.body);

    api.http_req(options, function(response) {
        const json_response = JSON.parse(response);
        res.status(200).json({
            body: 'redditGetKarma',
            json_response
        });
    });
    console.log('reddit-get-karma');
};

module.exports.About = About;
module.exports.Authenticate = Authenticate;
module.exports.Register = Register;
module.exports.redditAuth = redditAuth;
module.exports.redditGetMe = redditGetMe;
module.exports.redditGetSubredditsPost = redditGetSubredditsPost;
module.exports.redditGetMySubreddits = redditGetMySubreddits;
module.exports.redditGetKarma = redditGetKarma;
module.exports.newsGetCountry = newsGetCountry;
module.exports.newsGetCategory = newsGetCategory;
module.exports.weatherGetTemperature = weatherGetTemperature;
module.exports.weatherGetHumidity = weatherGetHumidity;
*/