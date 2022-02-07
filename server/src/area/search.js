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

module.exports.args = args;