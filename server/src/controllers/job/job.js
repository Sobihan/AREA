//const main = require('../../main');
const job = require('../../db_management/job/db_job');
const job_extra = require('./job_extra');
const {infoAction} = require('../../area/action');

// const actions = require('../../area/action');
// const reactions = require('../../area/reaction');

// const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

// const scheduler = new ToadScheduler()

function convertInt(x, base) {
    const parsed = parseInt(x, base);

    if (isNaN(parsed)) {
        return 600;
    }
    return parsed;
}

function isValidJson(data){
    try {
        JSON.parse(data);
        return true;
    } catch {
        return false;
    }
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
            && req.body.actionArg != '' && req.body.reactionArg != ''
            && isValidJson(req.body.actionArg) && isValidJson(req.body.reactionArg)) {
            const actionArgs = JSON.parse(req.body.actionArg);
            const reactionArgs = JSON.parse(req.body.reactionArg);

            try {
                var isJobChecked = job_extra.checkGetJob(req.body.action, actionArgs, req.body.reaction, reactionArgs);
            }
            catch (error) {
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
                    job_extra.updateJob_extra(jobToken, actionArgs, reactionArgs, req)
                    .then((data) => {
                        res.status(data.code).json(data.json);
                    });
                }
            }
        }
        else if (isSuccess == true && user != null && jobToken != '') {
            console.log('else if updateJob FAIL');
            scheduler.removeById(jobToken);
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



// const testActionInfo = (req, res, next) => {
//     let keys = Array.from(infoAction.keys());

//     for(let i = 0; i < keys.length; i++) {
//         console.log("i =", i, ", keys =", keys[i]);
//         //console.log(infoAction.get(keys[i]));
//         console.log(infoAction.get(keys[i]).name);
//         console.log(infoAction.get(keys[i]).actions);
//         console.log();

//         let keys_2 = Array.from(infoAction.get(keys[i]).actions.keys());
//         for(let j = 0; j < keys_2.length; j++) {
//             console.log("j =", j, ", keys =", keys_2[j]);
//             //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]));
//             console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).name);
//             console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).description);
//             console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).args);
//             console.log();
//             for(let k = 0; k < infoAction.get(keys[i]).actions.get(keys_2[j]).args.length; k++) {
//                 //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]);
//                 //console.log();
//                 //console.log(Object.keys(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]));
//                 const key = Object.keys(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]);
//                 console.log(key[0], " = ", infoAction.get(keys[i]).actions.get(keys_2[j]).args[k][key]);
//                 //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k][key]);
//                 console.log();

//             }
//         }
//     }

//     res.status(200).json({
//         success: true,
//         body: 'Stop job done!'
//     });
// }


const testActionInfo = (req, res, next) => {
    let keys = Array.from(infoAction.keys());

    for(let i = 0; i < keys.length; i++) {
        console.log("i =", i, ", keys =", keys[i]);
        //console.log(infoAction.get(keys[i]));
        //console.log(keys[i], "=");
        console.log("name =", infoAction.get(keys[i]).name);
        console.log("actions =", infoAction.get(keys[i]).actions);
        console.log();

        let keys_2 = Array.from(infoAction.get(keys[i]).actions.keys());
        for(let j = 0; j < keys_2.length; j++) {
            console.log("j =", j, ", keys =", keys_2[j]);
            //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]));
            //console.log(keys_2[j], "=");
            console.log("name =", infoAction.get(keys[i]).actions.get(keys_2[j]).name);
            console.log("description =", infoAction.get(keys[i]).actions.get(keys_2[j]).description);
            console.log("args =", infoAction.get(keys[i]).actions.get(keys_2[j]).args);
            console.log();

            for(let k = 0; k < infoAction.get(keys[i]).actions.get(keys_2[j]).args.length; k++) {
                //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]);
                //console.log();
                //console.log(Object.keys(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]));
                const key = Object.keys(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k]);
                console.log(key[0], " = ", infoAction.get(keys[i]).actions.get(keys_2[j]).args[k][key]);
                //console.log(infoAction.get(keys[i]).actions.get(keys_2[j]).args[k][key]);
                console.log();

            }
        }
    }

    res.status(200).json({
        success: true,
        body: 'Stop job done!'
    });
}

module.exports.updateJob = updateJob;
module.exports.deleteJob = deleteJob;
module.exports.searchJob = searchJob;
module.exports.stopJob = stopJob;

module.exports.testActionInfo = testActionInfo;