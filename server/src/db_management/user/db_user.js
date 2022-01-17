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

async function createUser(username, email, password, name, lstName) {
    const user = await main.prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password,
            name: name != '' ? name : undefined,
            lstName: lstName != '' ? lstName : undefined,
        },
    });
    return user;
}

async function findUniqueAuthenticate(email) {
    const user = await main.prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            username: true,
            password: true,
            token: true,
        },
    });
    return user;
}

async function updateUserData(authToken, name, lstName, avatar) {
    console.log('authToken = ' + authToken);
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            name: name != '' ? name : undefined,
            lstName: lstName != '' ? lstName : undefined,
            avatar: avatar != '' ? avatar : undefined,
        },
    });
    return user;
}

async function getUserData(authToken) {
    const user = await main.prisma.user.findUnique({
        where: {
            token: authToken,
        },
        select: {
            username: true,
            email: true,
            name: true,
            lstName: true,
            avatar: true,
        },
    });
    return user;
}

//module.exports.convertInt = convertInt;
module.exports.createUser = createUser;
module.exports.findUniqueAuthenticate = findUniqueAuthenticate;
module.exports.updateUserData = updateUserData;
module.exports.getUserData = getUserData;