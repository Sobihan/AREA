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

module.exports.args = args;
module.exports.AddArgs = AddArgs;
module.exports.changeArgs = changeArgs;