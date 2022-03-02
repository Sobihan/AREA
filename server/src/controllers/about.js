const {getReAction} = require("../controllers/job/job_extra")
const {infoAction} = require('../area/action');
const {infoReaction} = require('../area/reaction');

const about = (req, res, next) => {
    var jsonArr = [];
    let infoActionKeys = Array.from(infoAction.keys());
    let infoReactionKeys = Array.from(infoReaction.keys());
    const ip = (req.ip.substr(0, 7) == "::ffff:") ? req.ip.substr(7) : req.ip;

    for (let i = 0; i < infoActionKeys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = infoAction.get(infoActionKeys[i]).name;
        tmpJsonData["actions"] = getReAction(infoAction.get(infoActionKeys[i]).actions);
        jsonArr.push(tmpJsonData);
    }
/*
    for (let i = 0; i < infoReactionKeys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = infoReaction.get(infoReactionKeys[i]).name;
        tmpJsonData["reactions"] = getReAction(infoReaction.get(infoReactionKeys[i]).reactions);
        jsonArr.push(tmpJsonData);
    }
*/

    for (let i = 0; i < infoReactionKeys.length; i++) {
        let tmpJsonData = {}
        let isAdded = false;
        const lenght = jsonArr.length;
        for (let j = 0; j < lenght; j++) {
            if (jsonArr[j].name == infoReaction.get(infoReactionKeys[i]).name) {
                jsonArr[j]["reactions"] = getReAction(infoReaction.get(infoReactionKeys[i]).reactions);
                isAdded = true;
            }
        }
        if (!isAdded) {
            tmpJsonData["name"] = infoReaction.get(infoReactionKeys[i]).name;
            tmpJsonData["reactions"] = getReAction(infoReaction.get(infoReactionKeys[i]).reactions);
            jsonArr.push(tmpJsonData);
        }
    }

    res.status(200).json({
        client: {
            host: ip
        },
        server: {
            current_time: Date.now(),
            services: jsonArr
        }
    });
}

module.exports.about = about