const api_access = require('../../db_management/api_access/db_api_access');

const ApiAuth = (req, res, next) => {
    let isSuccess = true;
    let isSuccess_2 = true;
    const mobile = JSON.parse(req.body.mobile)
    const is_mobile = Boolean(mobile);

    if (req.body.type == 'REDDIT' && !is_mobile) {

        api_access.redditGetAcessTokenWeb(req.body.token)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((data) => {
            if (isSuccess == true){
                console.log('redditGetAcessTokenWeb SUCESS');
                const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));

                api_access.updateApiToken(req.header('authtoken'), req.body.token, req.body.type, disableAt, data.access_token, data.refresh_token, is_mobile)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((user) => {
                    if (isSuccess_2 == true){
                        console.log('ApiAuth SUCESS');
                        res.status(200).json({
                            body: 'ApiAuth done!',
                            user
                        });
                    }
                    else {
                        console.log('ApiAuth FAIL');
                        res.status(401).json({
                            body: 'ApiAuth Failed'
                        });
                    }
                });

            }
            else {
                console.log('redditGetAcessToken FAIL');
                res.status(401).json({
                    body: 'ApiAuth Failed'
                });
            }
        });

    }
    else if (req.body.type == 'REDDIT' && is_mobile) {
        api_access.redditGetAcessTokenMobile(req.body.token)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((data) => {
            if (isSuccess == true){
                console.log('redditGetAcessToken SUCESS');
                const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));

                api_access.updateApiToken(req.header('authtoken'), req.body.token, req.body.type, disableAt, data.access_token, data.refresh_token, is_mobile)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((user) => {
                    if (isSuccess_2 == true){
                        console.log('ApiAuth SUCESS');
                        res.status(200).json({
                            body: 'ApiAuth done!',
                            user
                        });
                    }
                    else {
                        console.log('ApiAuth FAIL');
                        res.status(401).json({
                            body: 'ApiAuth Failed'
                        });
                    }
                });

            }
            else {
                console.log('redditGetAcessToken FAIL');
                res.status(401).json({
                    body: 'ApiAuth Failed'
                });
            }
        });

    }

    else if (req.body.type == 'GOOGLE') {
        console.log('ApiAuth GOOGLE side in progresse');

        api_access.updateApiToken(req.header('authtoken'), 'req.body.token', req.body.type, 0, 'data.access_token', 'data.refresh_token', is_mobile)
        .catch((e) => {
            isSuccess_2 = false;
            console.log(e);
        })
        .then((user) => {
            if (isSuccess_2 == true){
                console.log('ApiAuth GOOGLE SUCESS');
                res.status(200).json({
                    body: 'ApiAuth google done!',
                    user
                });
            }
            else {
                console.log('ApiAuth GOOGLE FAIL');
                res.status(401).json({
                    body: 'ApiAuth google Failed'
                });
            }
        });
    }
};

const getLogedIn = (req, res, next) => {
    let isSuccess = true;

    api_access.getUserApiToken(req.header('authtoken'))
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((user) => {
            if (isSuccess == true && user != null) {
                console.log('getUserApiToken SUCESS');
                let is_reddit_logedin = false;
                let is_google_logedin = false;

                for (const APIs in user.exApi) {
                    if (user.exApi[APIs].type == 'REDDIT')
                        is_reddit_logedin = true;
                    else if (user.exApi[APIs].type == 'GOOGLE')
                        is_google_logedin = true;
                }

                res.status(200).json({
                    body: 'getLogedIn done!',
                    reddit: is_reddit_logedin,
                    google: is_google_logedin,
                });
            }
            else {
                console.log('getUserApiToken FAIL');
                res.status(401).json({
                    body: 'getLogedIn Failed'
                });
            }
        });
}

module.exports.ApiAuth = ApiAuth;
module.exports.getLogedIn = getLogedIn;