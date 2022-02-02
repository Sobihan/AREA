//const main = require('../../main');
const job = require('../../db_management/job/db_job');
const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const scheduler = new ToadScheduler()

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
    var interval = convertInt(req.body.interval, 10)

    job.updateJob(req.header('authtoken'), req.body.jobToken, req.body.name, req.body.action, req.body.reaction, interval)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        const jobToken = user.job[(user.job.length - 1)].jobToken;

        if (isSuccess == true && user != null && jobToken != '') {
            let isSuccess_actionArg = true;
            let isSuccess_reactionArg = true;


            //console.log("test =", user.job);
            //console.log("test =", user.job[(user.job.length - 1)].jobToken);


            const actionArgs = JSON.parse(req.body.actionArg);
            for (const actionArg in actionArgs) {
                console.log(actionArgs[actionArg]);
                for (const arg in actionArgs[actionArg]) {
                    //console.log("key =", arg);
                    //console.log("value =", actionArgs[actionArg][arg]);
                    job.updateActionArg(jobToken, arg, actionArgs[actionArg][arg])
                    .catch((e) => {
                        isSuccess_actionArg = false;
                        console.log(e);
                    })
                    .then((job) => {
                        if (isSuccess_actionArg == true){
                            console.log('updateActionArg SUCESSFUL');
                        }
                        else {
                            console.log('updateActionArg FAIL');
                        }
                    });
                }
            }


            const reactionArgs = JSON.parse(req.body.reactionArg);
            for (const reactionArg in reactionArgs) {
                console.log(reactionArgs[reactionArg]);
                for (const arg in reactionArgs[reactionArg]) {
                    //console.log("key =", arg);
                    //console.log("value =", reactionArgs[actionArg][arg]);
                    job.updateReactionArg(jobToken, arg, reactionArgs[reactionArg][arg])
                    .catch((e) => {
                        isSuccess_reactionArg = false;
                        console.log(e);
                    })
                    .then((job) => {
                        /*if (isSuccess_actionArg && isSuccess_reactionArg && reactionArg == reactionArgs.length) {
                            console.log('SUPER SUPER updateReactionArg SUCESSFUL');
                        }
                        else */if (isSuccess_reactionArg == true){
                            console.log('updateReactionArg SUCESSFUL');
                        }
                        else {
                            console.log('updateReactionArg FAIL');
                        }
                    });
                }
            }

            if (isSuccess_actionArg && isSuccess_reactionArg) {


                job.findUniqueJob(jobToken)
                .catch((e) => {
                    isSuccess_2 = false;
                    console.log(e);
                })
                .then((good_job) => {
                    if (isSuccess_2 == true){

                        console.log('updateJob SUCESSFUL');
                        res.status(200).json({
                            success: true,
                            body: 'Update of job done!',
                            good_job
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


            }
            else {
                console.log('updateJob FAIL');
                res.status(401).json({
                    success: false,
                    body: 'Update of job Failed'
                });
            }

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

    job.deleteJob(req.header('authtoken'), req.body.jobToken)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        if (isSuccess == true){
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

const actions = require('../../area/action');
const reactions = require('../../area/reaction');

const testJob = (req, res, next) => {
    actions.action.get(req.body.action)("skyrroztv", reactions.reaction.get(req.body.reaction))

    res.status(401).json({
        //success: false,
        body: 'test job'
    });

    console.log('test-job');
    console.log('Got body:', req.body);
};

module.exports.updateJob = updateJob;
module.exports.deleteJob = deleteJob;
module.exports.searchJob = searchJob;

module.exports.testJob = testJob;