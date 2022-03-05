const user_prisma = require('../../db_management/user/db_user');
const api_access = require('../../db_management/api_access/db_api_access');
const user_extra = require('./user_extra');

const register = (req, res, next) => {
    let isSuccess = true;

    user_prisma.createUser(req.body.username, req.body.email, req.body.password, req.body.name, req.body.lstName)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('Register SUCESSFUL');
            res.status(200).json({
                success: true,
                body: 'Registration done!',
                user
            });
        }
        else {
            console.log('Register FAIL');
            res.status(401).json({
                success: false,
                body: 'Registration Failed'
            });
        }
    });
    console.log('Register');
    console.log('Got body:', req.body);
};

const authenticate = (req, res, next) => {
    let isSuccess = true;

    user_prisma.findUniqueAuthenticate(req.body.email)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true && user != null && req.body.password == user.password){
            console.log('Authenticate SUCESSFUL');
            res.status(200).json({
                success: true,
                body: 'Authentication done!',
                token: user.token,
            });
        }
        else {
            console.log('Authenticate FAIL');
            res.status(401).json({
                success: false,
                body: 'Authentication Failed'
            });
        }
    });

    console.log('authenticate');
    console.log('Got body:', req.body);
};

const googleRegisterOrAuthenticate = (req, res, next) => { //google here//
    let isSuccess = true;
    let isSuccess_2 = true;
    console.log('SOSOBI... req.body =', JSON.stringify(req.body));
    //console.log(req.body);

    if (!req.body.is_mobile) { //c'est le WEB
        user_extra.getGoogle(req.body.response.code)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((data) => {
            if (isSuccess == true && data.info != undefined && data.tokens != undefined) {
                console.log('getGoogle SUCESSFUL');

                user_extra.google(data, req.body.response.code, req.body.is_mobile)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((responce) => {
                    if (isSuccess_2 == true){
                        console.log('google SUCESSFUL');
                        //console.log("responce =", JSON.stringify(responce))
                        res.status(responce.code).json(responce.json);
                    }
                    else {
                        console.log('google FAIL');
                        res.status(responce.code).json(responce.json);
                    }
                });
            }
            else {
                console.log('getGoogle FAIL');
                res.status(401).json({
                    success: false,
                    body: 'getGoogle Failed'
                });
            }
        });

    }
    else { //c'est le MOBILE
        console.log('getGoogle MOBILE NOT IMPLEMENTED FAIL');
        user_extra.connectGoogleMobile(req.body)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((user) => {
            if (isSuccess == true) {
                console.log('connectGoogleMobile SUCESSFUL');
                const disableAt = (Date.now() + ((2000 - 200) * 1000));
                api_access.updateApiToken(user.json.token, "", "GOOGLE", disableAt, req.body.accessToken, req.body.refreshToken, req.body.is_mobile)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((job) => {
                    if (isSuccess_2 == true){
                        console.log('updateApiToken SUCESSFUL');
                        res.status(200).json({
                            success: true,
                            body: 'updateApiToken done!',
                            token: job.token
                        });
                    }
                    else {
                        console.log('updateApiToken FAIL');
                        res.status(401).json({
                            success: false,
                            body: 'updateApiToken Failed'
                        });
                    }
                });
            }
            else {
                console.log('connectGoogleMobile FAIL');
                res.status(401).json({
                    success: false,
                    body: 'getGoogle Failed'
                });
            }
        });
    }

    console.log('authenticate');
    console.log(req.body);
};

const updateUserData = (req, res, next) => {
    let isSuccess = true;

    user_prisma.updateUserData(req.header('authtoken'), req.body.name, req.body.lstName, req.body.avatar)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('updateUserData SUCESSFUL');
            res.status(200).json({
                success: true,
                body: "Update user's data done!",
                user,
            });
        }
        else {
            console.log('updateUserData FAIL');
            res.status(401).json({
                success: false,
                body: "Update user's data Failed!"
            });
        }
    });

    //console.log('update-user-data');
    console.log('Got body:', req.body);
};

const getUserData = (req, res, next) => {
    let isSuccess = true;

    user_prisma.getUserData(req.header('authtoken'))
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('getUserData SUCESSFUL');
            res.status(200).json({
                success: true,
                body: "Get user's data done!",
                user,
            });
        }
        else {
            console.log('getUserData FAIL');
            res.status(401).json({
                success: false,
                body: "Get user's data Failed!"
            });
        }
    });
    console.log('get-user-data');
    console.log('Got body:', req.body);
};

module.exports.register = register;
module.exports.authenticate = authenticate;
module.exports.googleRegisterOrAuthenticate = googleRegisterOrAuthenticate;
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;