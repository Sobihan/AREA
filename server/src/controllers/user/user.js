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
    console.log(req.body);

    if (!req.body.is_mobile/* && req.body.test != undefined*/) { //c'est le WEB
        user_extra.getGoogle(req.body.response.code)
        .catch((e) => {
            isSuccess = false;
            console.log(e);
        })
        .then((data) => {
            if (isSuccess == true && data.info != undefined && data.tokens != undefined) {
                console.log('getGoogle SUCESSFUL');
                //const is_mobile = JSON.parse(req.body.is_mobile)
                //const mobile = Boolean(is_mobile);

                //console.log('req.body.is_mobile =', req.body.is_mobile);
                //console.log('JSON.stringify(req.body.is_mobile) =', JSON.stringify(req.body.is_mobile));

                user_extra.google(data, req.body.response.code, req.body.is_mobile)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((responce) => {
                    if (isSuccess_2 == true){
                        console.log('Register SUCESSFUL');
                        console.log("responce =", JSON.stringify(responce))
                        res.status(responce.code).json(responce.json);
                    }
                    else {
                        console.log('Register FAIL');
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
        res.status(401).json({
            success: false,
            body: 'getGoogle Failed'
        });
    }





/*
    api_access.getGoogle(req.body.token)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('getGoogleAccessToken SUCESSFUL');
/-*
            res.status(200).json({
                data: req.body.response,
                data: req.body.response.tokenObj.session_state,
                success: true,
                body: 'googleAuthentication done!',
                token: user.token,
            });
*-/
        }
        else {
            console.log('getGoogleAccessToken FAIL');
/-*
            user_prisma.createUser(req.body.response.profileObj.email, req.body.response.profileObj.email, req.body.response.profileObj.googleId, req.body.response.profileObj.givenName, req.body.response.profileObj.familyName)
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_2 == true){
                    console.log('googleRegister SUCESSFUL');
                    res.status(200).json({
                        success: true,
                        body: 'googleRegistration done!',
                        user
                    });
                }
                else {
                    console.log('googleRegisterOrAuthenticate FAIL');
                    res.status(401).json({
                        success: false,
                        body: 'googleRegisterOrAuthenticate Failed'
                    });
                }
            });
*-/
        }
    });
*/




/*
    user_prisma.findUniqueAuthenticate(req.body.response.profileObj.email)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true && user != null && req.body.response.profileObj.googleId == user.password){
            console.log('googleAuthenticate SUCESSFUL');
            res.status(200).json({
                data: req.body.response,
                data: req.body.response.tokenObj.session_state,
                success: true,
                body: 'googleAuthentication done!',
                token: user.token,
            });
        }
        else {
            user_prisma.createUser(req.body.response.profileObj.email, req.body.response.profileObj.email, req.body.response.profileObj.googleId, req.body.response.profileObj.givenName, req.body.response.profileObj.familyName)
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_2 == true){
                    console.log('googleRegister SUCESSFUL');
                    res.status(200).json({
                        success: true,
                        body: 'googleRegistration done!',
                        user
                    });
                }
                else {
                    console.log('googleRegisterOrAuthenticate FAIL');
                    res.status(401).json({
                        success: false,
                        body: 'googleRegisterOrAuthenticate Failed'
                    });
                }
            });
        }
    });
*/
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