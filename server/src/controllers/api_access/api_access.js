const api_access = require('../../db_management/api_access/db_api_access');

const ApiAuth = (req, res, next) => {
    let isSuccess = true;
    let isSuccess_2 = true;

    if (req.body.type == 'REDDIT') {

        api_access.redditGetAcessToken(req.body.token)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((data) => {
            if (isSuccess == true){
                console.log('redditGetAcessToken SUCESS');
                const disableAt = (Date.now() + ((data.expires_in - 200) * 1000));

                api_access.updateApiToken(req.header('authtoken'), req.body.token, req.body.type, disableAt, data.access_token, data.refresh_token)
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

        api_access.updateApiToken(req.header('authtoken'), 'req.body.token', req.body.type, 0, 'data.access_token', 'data.refresh_token')
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

/*
    let isSuccess = true;
    api_access.updateApiToken(req.header('authtoken'), req.body.token, req.body.type)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
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
    console.log('Register');
    console.log('Got body:', req.body);
*/
};
/*
const getApiToken = (req, res, next) => {
    let isSuccess = true;

    api_access.findUniqueApiToken(req.header('authtoken'), req.body.type)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
        //console.logTEST ' + isSuccess);
    })
    .then((user) => {
        //console.logTEST22 ' + isSuccess);
        if (isSuccess == true){
            console.log('getApiToken SUCESS');
            res.status(200).json({
                body: 'getApiToken done!',
                user
            });
        }
        else {
            console.log('getApiToken FAIL');
            res.status(401).json({
                body: 'getApiToken Failed'
            });
        }
    });
    console.log('getApiToken');
    console.log('Got body:', req.body);
};
*/
module.exports.ApiAuth = ApiAuth;
//module.exports.getApiToken = getApiToken;