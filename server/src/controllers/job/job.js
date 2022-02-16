//const main = require('../../main');
const job = require('../../db_management/job/db_job');
const job_extra = require('./job_extra');
const {infoAction} = require('../../area/action');
const {infoReaction} = require('../../area/reaction');

function convertInt(x, base) {
    const parsed = parseInt(x, base);

    if (isNaN(parsed)) {
        return 600;
    }
    return parsed;
}

const updateJob = (req, res, next) => {
    let isSuccess = true;
    let isSuccess_2 = true;
    let is_failed = false;
    var interval = convertInt(req.body.interval, 10)

    job.updateJob(req.header('authtoken'), req.body.jobToken, req.body.name, req.body.action, req.body.reaction, interval)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (user != null && (user.job.length - 1) >= 0) {
            var jobToken = user.job[(user.job.length - 1)].jobToken;
        }

        if (isSuccess == true && user != null && jobToken != ''
            && req.body.actionArg != '' && req.body.reactionArg != '') {

            try {
                var isJobChecked = job_extra.checkGetJob(req.header('authtoken'), req.body.action, req.body.actionArg, req.body.reaction, req.body.reactionArg);
            }
            catch (error) {
                console.log(error);
                is_failed = true
                var rslData = {code:401, json:{
                    success: false,
                    body: 'Full Fail 1'
                    }
                };
            }
            finally {
                if (is_failed)
                    res.status(rslData.code).json(rslData.json);
                else if (!isJobChecked) {
                    res.status(401).json({
                        success: false,
                        body: 'Full Fail 2'
                    });
                }
                else {
                    job_extra.updateJob_extra(jobToken, req.body.actionArg, req.body.reactionArg, req)
                    .then((data) => {
                        res.status(data.code).json(data.json);
                    });
                }
            }
        }
        else if (isSuccess == true && user != null && jobToken != '') {
            console.log('else if updateJob FAIL');
            job_extra.removeJob(jobToken)
            //scheduler.removeById(jobToken);
            job.deleteJob(req.header('authtoken'), jobToken)
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_2 == true) {
                    console.log('else if deleteJob SUCESSFUL');
                    res.status(200).json({
                        success: true,
                        body: 'else if deletion of job done!'
                    });
                }
                else {
                    console.log('else if deleteJob FAIL');
                    res.status(401).json({
                        success: false,
                        body: 'else if deletion of job Failed'
                    });
                }
            });
        }
        else {
            console.log('updateJob FAIL');
            res.status(401).json({
                success: false,
                body: 'Update of job Failed'
            });
        }
    });

    console.log('update-job');
    console.log('Got body:', req.body);
};

const deleteJob = (req, res, next) => {
    let isSuccess = true;
    let isSuccess_2 = true;
    let isSuccess_3 = true;

    job_extra.removeJob(req.body.jobToken);
    //scheduler.removeById(req.body.jobToken);
    job.deleteActionArgs(req.body.jobToken)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
            console.log('deleteActionArgs SUCESSFUL');

            job.deleteReactionArgs(req.body.jobToken)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((user) => {
                    if (isSuccess_2 == true){
                        console.log('deleteReactionArgs SUCESSFUL');

                        job.deleteJob(req.header('authtoken'), req.body.jobToken)
                        .catch((e) => {
                            isSuccess_3 = false;
                            console.log(e);
                        })
                        .then((user) => {
                            if (isSuccess_3 == true){
                                console.log('deleteJob SUCESSFUL');
                                res.status(200).json({
                                    success: true,
                                    body: 'deletion of job done!'
                                });
                            }
                            else {
                                console.log('deleteJob FAIL');
                                res.status(401).json({
                                    success: false,
                                    body: 'deletion of job Failed'
                                });
                            }
                        });
                    }
                    else {
                        console.log('deleteReactionArgs FAIL');
                        res.status(401).json({
                            success: false,
                            body: "deletion of job's reaction args Failed!"
                        });
                    }
                });
        }
        else {
            console.log('deleteActionArgs FAIL');
            res.status(401).json({
                success: false,
                body: "deletion of job's action args Failed!"
            });
        }
    });

    console.log('delete-job');
    console.log('Got body:', req.body);
};

const searchJob = (req, res, next) => {
    let isSuccess = true;

    job.findJob(req.header('authtoken'), req.body.name, req.body.action, req.body.reaction)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((job) => {
        if (isSuccess == true && job != null){
            console.log('findJob SUCESSFUL');
            res.status(200).json({
                success: true,
                body: 'Find job done!',
                job: job[0].job,
            });
        }
        else {
            console.log('findJob FAIL');
            res.status(401).json({
                success: false,
                body: 'Find job Failed'
            });
        }
    });

    console.log('search-job');
    console.log('Got body:', req.body);
};

const stopJob = (req, res, next) => {
    let isSuccess = true;
    const stop = JSON.parse(req.body.stop)
    const is_stop = Boolean(stop);

    job_extra.stopJob(req.body.jobToken, is_stop);

    job.stopJob(req.body.jobToken, is_stop)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((job) => {
        if (isSuccess == true){
            console.log('stopJob SUCESSFUL');
            res.status(200).json({
                success: true,
                body: 'Stop job done!'
            });
        }
        else {
            console.log('stopJob FAIL');
            res.status(401).json({
                success: false,
                body: 'Stop job Failed'
            });
        }
    });

    console.log('stop-job');
    console.log('Got body:', req.body);
};

const getReActionInfo = (req, res, next) => {
    var jsonArr = [];
    let infoActionKeys = Array.from(infoAction.keys());
    let infoReactionKeys = Array.from(infoReaction.keys());

    for (let i = 0; i < infoActionKeys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = infoAction.get(infoActionKeys[i]).name;
        tmpJsonData["actions"] = job_extra.getReAction(infoAction.get(infoActionKeys[i]).actions);
        jsonArr.push(tmpJsonData);
    }

    for (let i = 0; i < infoReactionKeys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = infoReaction.get(infoReactionKeys[i]).name;
        tmpJsonData["reactions"] = job_extra.getReAction(infoReaction.get(infoReactionKeys[i]).reactions);
        jsonArr.push(tmpJsonData);
    }

    res.status(200).json({
        success: true,
        body: 'Stop job done!',
        jsonArr
    });
}

const api_getter = require('../api_access/api_getter');

const testTokenApi = (req, res, next) => {
    let isSuccess = true;

    api_getter.apiGetter(req.header('authtoken'), req.body.type)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((resul) => {
        if (isSuccess == true){
            console.log('testTokenApi SUCESSFUL');
            //console.log("api_getter.apiTokens.get(req.header('authtoken')) =", api_getter.apiTokens.get(req.header('authtoken')));
            //api_getter.apiTokens.get(req.header('authtoken'));
            console.log("resul =", resul);
            res.status(200).json({
                success: true,
                body: 'testTokenApi done'
            });
        }
        else {
            console.log('testTokenApi FAIL');
            res.status(401).json({
                success: false,
                body: 'testTokenApi failed'
            });
        }
    });
}


module.exports.updateJob = updateJob;
module.exports.deleteJob = deleteJob;
module.exports.searchJob = searchJob;
module.exports.stopJob = stopJob;
module.exports.getReActionInfo = getReActionInfo;



module.exports.testTokenApi = testTokenApi;