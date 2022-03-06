function args(argList, search)
{
    for (const args in argList) {
        console.log(argList[args]);
        for (const arg in argList[args]) {
            if (arg == search)
                return argList[args][arg];
        }
    }
    return null;
}

function AddArgs(argList, newDataName, newData)
{
    //console.log(argList[0]);
    // if (argList[0] == undefined)
    //     argList.push({});
    console.log(argList[0]);
    argList[0][newDataName] = newData;
}

function changeArgs(argList, search, newData)
{
    for (const args in argList) {
        console.log(argList[args]);
        for (const arg in argList[args]) {
            if (arg == search) {
                argList[args][arg] = newData;
            }
        }
    }
    return null;
}

function initializeArgs(argList)
{
    if (argList[0] == undefined)
        argList.push({});
}

function cleanArgs(argList)
{
    for (let i = 0; i < argList.length; i++) {
        if (argList[i].key == "updated" || argList[i].key == "live" || argList[i].key == "done" || argList[i].key == "lastVideoID" ||
            argList[i].key == "s_views" || argList[i].key == "s_likes" || argList[i].key == "text" || argList[i].key == "userToken") {
                console.log("i =", i)
                argList.splice(i, 1);
                i = 0;
            }
    }
    return null;
}

module.exports.args = args;
module.exports.AddArgs = AddArgs;
module.exports.changeArgs = changeArgs;
module.exports.initializeArgs = initializeArgs;
module.exports.cleanArgs = cleanArgs;