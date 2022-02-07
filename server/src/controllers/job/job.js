//const main = require('../../main');
const job = require('../../db_management/job/db_job');
const job_extra = require('./job_extra');

// const actions = require('../../area/action');
// const reactions = require('../../area/reaction');

const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const scheduler = new ToadScheduler()

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
    let isSuccess_3 = true;
    var interval = convertInt(req.body.interval, 10)

    job.updateJob(req.header('authtoken'), req.body.jobToken, req.body.name, req.body.action, req.body.reaction, interval)
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((user) => {
        //console.log("test =", user.job);
        //console.log("test =", user.job[(user.job.length - 1)].jobToken);
        if (user != null && (user.job.length - 1) >= 0) {
            var jobToken = user.job[(user.job.length - 1)].jobToken;
        }

        if (isSuccess == true && user != null && jobToken != ''
            && req.body.actionArg != '' && req.body.reactionArg != ''
            && isValidJson(req.body.actionArg) && isValidJson(req.body.reactionArg)) {
            const actionArgs = JSON.parse(req.body.actionArg);
            const reactionArgs = JSON.parse(req.body.reactionArg);

            job_extra.updateJob_extra(jobToken, actionArgs, reactionArgs)
            .catch((e) => {
                console.log(e);
            })
            .then((arg_job) => {
                //console.log('updateJob_extra Done Confirmed =', arg_job);
                if (arg_job == true) {

                    job.findUniqueJob(jobToken)
                    .catch((e) => {
                        isSuccess_2 = false;
                        console.log(e);
                    })
                    .then((good_job) => {
                        if (isSuccess_2 == true && job_extra.checkGetJob(req.body.action, actionArgs, req.body.reaction, reactionArgs)) {
                            console.log('updateJob SUCESSFUL');
                            res.status(200).json({
                                success: true,
                                body: 'Update of job done!',
                                good_job
                            });

                            scheduler.removeById(good_job.jobToken);

                            const jobToLaunch = job_extra.getJob(req.body.action, actionArgs, req.body.reaction, reactionArgs);
                            const job1 = new SimpleIntervalJob(
                                { seconds: req.body.interval, runImmediately: req.body.runNow },
                                jobToLaunch,
                                good_job.jobToken
                            );
                            scheduler.addSimpleIntervalJob(job1);


                        }
                        else if (isSuccess_2 == true) {
                            console.log('updateJob FAIL');
                            scheduler.removeById(good_job.jobToken);
                            job.deleteJob(req.header('authtoken'), good_job.jobToken)
                            .catch((e) => {
                                isSuccess_3 = false;
                                console.log(e);
                            })
                            .then((user) => {
                                if (isSuccess_3 == true) {
                                    console.log('good_job deleteJob SUCESSFUL');
                                    res.status(200).json({
                                        success: true,
                                        body: 'good_job deletion of job done!'
                                    });
                                }
                                else {
                                    console.log('good_job deleteJob FAIL');
                                    res.status(401).json({
                                        success: false,
                                        body: 'good_job deletion of job Failed'
                                    });
                                }
                            });

                        }
                        else {

                            res.status(401).json({
                                success: false,
                                body: 'Update of job Failed'
                            });

                        }
                    });
                }
                else {
                    console.log('updateJob_extra FAIL');
                    scheduler.removeById(jobToken);
                    job.deleteJob(req.header('authtoken'), jobToken)
                    .catch((e) => {
                        isSuccess_3 = false;
                        console.log(e);
                    })
                    .then((user) => {
                        if (isSuccess_3 == true) {
                            console.log('updateJob_extra deleteJob SUCESSFUL');
                            res.status(200).json({
                                success: true,
                                body: 'updateJob_extra deletion of job done!'
                            });
                        }
                        else {
                            console.log('updateJob_extra deleteJob FAIL');
                            res.status(401).json({
                                success: false,
                                body: 'updateJob_extra deletion of job Failed'
                            });
                        }
                    });
                }
            });
        }
        else if (isSuccess == true && user != null && jobToken != '') {
            console.log('else if updateJob FAIL');
            scheduler.removeById(jobToken);
            job.deleteJob(req.header('authtoken'), jobToken)
            .catch((e) => {
                isSuccess_3 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_3 == true) {
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
/*
const actions = require('../../area/action');
const reactions = require('../../area/reaction');

const testJob = (req, res, next) => {
    const actionArgs = JSON.parse(req.body.actionArg);
    const reactionArgs = JSON.parse(req.body.reactionArg);

    actions.action.get(req.body.action)(actionArgs, reactions.reaction.get(req.body.reaction), reactionArgs)

    res.status(401).json({
        //success: false,
        body: 'test job'
    });

    console.log('test-job');
    console.log('Got body:', req.body);
};
*/
module.exports.updateJob = updateJob;
module.exports.deleteJob = deleteJob;
module.exports.searchJob = searchJob;

//module.exports.testJob = testJob;