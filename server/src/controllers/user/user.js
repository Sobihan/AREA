const user_prisma = require('../../db_management/user/db_user');

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

    user_prisma.findUniqueAuthenticate(req.body.email, req.body.password)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true && req.body.password == user.password){
            console.log('Register SUCESSFUL');
            res.status(200).json({
                success: true,
                body: 'Registration done!',
                token: user.token,
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

    console.log('authenticate');
    console.log('Got body:', req.body);
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
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;