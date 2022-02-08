const job = require('../../db_management/job/db_job');
const actions = require('../../area/action');
const reactions = require('../../area/reaction');
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require('toad-scheduler')

const scheduler = new ToadScheduler()

async function updateJobAddArgs(jobToken, actionArgJson, reactionArgJson) {
    for (const actionArg in actionArgJson) {
        console.log(actionArgJson[actionArg]);
        for (const arg in actionArgJson[actionArg]) {
            let argJob = await job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg]); //good
            //let argJob = await job.updateActionArg("nop", arg, actionArgJson[actionArg][arg]); //crash test
            if (!argJob.id) {
                console.log('updateActionArg FAIL');
                throw new Error(argJob);
            }
            else {
                console.log('updateActionArg SUCESSFUL');
            }
        }
    }

    for (const reactionArg in reactionArgJson) {
        console.log(reactionArgJson[reactionArg]);
        for (const arg in reactionArgJson[reactionArg]) {
            let argJob_2 = await job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg]); //good
            //let argJob_2 = await job.updateReactionArg("nop", arg, reactionArgJson[reactionArg][arg]); //crash test
            if (!argJob_2.id) {
                console.log('updateReactionArg FAIL');
                throw new Error(argJob_2);
            }
            else {
                console.log('updateReactionArg SUCESSFUL');
            }
        }
    }

    return true;
}

async function updateJob_extra_3(jobToken, actionArgJson, reactionArgJson, req)
{
    let is_failed = false;

    try {
        var is_updateJobAddArgs = await updateJobAddArgs(jobToken, actionArgJson, reactionArgJson);
    }
    catch (error) {
        is_failed = true
    }
    finally {
        if (is_failed) {
            let deletedJob = await job.deleteJob(req.header('authtoken'), jobToken);
            if (deletedJob.id) {
                console.log('TRY updateJobAddArgs FAILED deleteJob SUCESSFUL');
                return {code:401, json:{
                    success: false,
                    body: 'updateJobAddArgs deletion of job done!'
                    }
                };
            }
            else {
                return {code:401, json:{
                    success: false,
                    body: 'updateJobAddArgs deletion of job Failed'
                    }
                };
            }

            /*return {code:401, json:{
                success: false,
                body: 'Try updateJobAddArgs Failed',
                }
            };*/
        }
        else {

            if (is_updateJobAddArgs) {
                console.log("TRUE TRUE TRUE TRUE TRUE.");
                let good_job = await job.findUniqueJob(jobToken);
                if (good_job.jobToken) {
                    console.log('updateJob and findUniqueJob SUCESSFUL');

                    scheduler.removeById(good_job.jobToken);

                    const jobToLaunch = getJob(req.body.action, actionArgJson, req.body.reaction, reactionArgJson);
                    const job1 = new SimpleIntervalJob(
                        { seconds: req.body.interval, runImmediately: req.body.runNow },
                        jobToLaunch,
                        good_job.jobToken
                    );
                    scheduler.addSimpleIntervalJob(job1);

                    return {code:200, json:{
                        success: true,
                        body: 'Update of job done!',
                        good_job
                        }
                    };

                }
                else {
                    console.log('good_job deleteJob FULL FAIL');
                    scheduler.removeById(good_job.jobToken);
                    return {code:401, json:{
                        success: false,
                        body: 'Update of job Failed'
                        }
                    };
                }
            }
            else {
                console.log('updateJobAddArgs FAIL');
                scheduler.removeById(jobToken);
                let deletedJob = await job.deleteJob(req.header('authtoken'), jobToken);
                if (deletedJob.id) {
                    console.log('updateJobAddArgs FAIL deleteJob SUCESSFUL');
                    return {code:401, json:{
                        success: false,
                        body: 'updateJobAddArgs deletion of job done!'
                        }
                    };
                }
                else {
                    return {code:401, json:{
                        success: false,
                        body: 'updateJobAddArgs deletion of job Failed'
                        }
                    };
                }
            }
        }
    }
}

async function updateJob_extra_2(jobToken, actionArgJson, reactionArgJson, req)
{
    let is_updateJobAddArgs = await updateJobAddArgs(jobToken, actionArgJson, reactionArgJson);

    if (is_updateJobAddArgs) {
        console.log("TRUE TRUE TRUE TRUE TRUE.");
        let good_job = await job.findUniqueJob(jobToken);
        if (good_job.jobToken && checkGetJob(req.body.action, actionArgJson, req.body.reaction, reactionArgJson)) {
            console.log('updateJob and findUniqueJob SUCESSFUL');
            scheduler.removeById(good_job.jobToken);

            const jobToLaunch = getJob(req.body.action, actionArgJson, req.body.reaction, reactionArgJson);
            const job1 = new SimpleIntervalJob(
                { seconds: req.body.interval, runImmediately: req.body.runNow },
                jobToLaunch,
                good_job.jobToken
            );
            scheduler.addSimpleIntervalJob(job1);

            return {code:200, json:{
                success: true,
                body: 'Update of job done!',
                good_job
                }
            };

        }
        else if (good_job.jobToken) {
            console.log('updateJob, checkGetJob FAIL');
            scheduler.removeById(good_job.jobToken);
            let deletedJob = await job.deleteJob(req.header('authtoken'), good_job.jobToken);
            if (deletedJob.id) {
                console.log('good_job deleteJob SUCESSFUL');
                return {code:401, json:{
                    success: false,
                    body: 'good_job deletion of job done!'
                    }
                };
            }
            else {
                return {code:401, json:{
                    success: false,
                    body: 'good_job deletion of job Failed'
                    }
                };
            }
        }
        else {
            console.log('good_job deleteJob FULL FAIL');
            scheduler.removeById(good_job.jobToken);
            return {code:401, json:{
                success: false,
                body: 'Update of job Failed'
                }
            };
        }
    }
    /*else if (true) {
        console.log("ok o ok ok ok ok.");
    }*/
    else {
        console.log('updateJobAddArgs FAIL');
        scheduler.removeById(jobToken);
        let deletedJob = await job.deleteJob(req.header('authtoken'), jobToken);
            if (deletedJob.id) {
                console.log('updateJobAddArgs FAIL deleteJob SUCESSFUL');
                return {code:401, json:{
                    success: false,
                    body: 'updateJobAddArgs deletion of job done!'
                    }
                };
            }
            else {
                return {code:401, json:{
                    success: false,
                    body: 'updateJobAddArgs deletion of job Failed'
                    }
                };
            }
    }


    // return {code:200, json:{
    //     success: true,
    //     body: 'Update of job done!'
    //     }
    // };
}

async function updateJob_extra(jobToken, actionArgJson, reactionArgJson, req)
{
    let isSuccess = true;
    let isSuccess_2 = true;

    updateJobAddArgs(jobToken, actionArgJson, reactionArgJson)
    .catch((e) => {
        console.log(e);
    })
    .then((arg_job) => {
        //console.log('updateJob_extra Done Confirmed =', arg_job);
        if (arg_job == true) {

            job.findUniqueJob(jobToken)
            .catch((e) => {
                isSuccess = false;
                console.log(e);
            })
            .then((good_job) => {
                if (isSuccess == true && checkGetJob(req.body.action, actionArgJson, req.body.reaction, reactionArgJson)) {
                    console.log('updateJob and findUniqueJob SUCESSFUL');


/*
                    res.status(200).json({
                        success: true,
                        body: 'Update of job done!',
                        good_job
                    });*/

                    scheduler.removeById(good_job.jobToken);

                    const jobToLaunch = getJob(req.body.action, actionArgJson, req.body.reaction, reactionArgJson);
                    const job1 = new SimpleIntervalJob(
                        { seconds: req.body.interval, runImmediately: req.body.runNow },
                        jobToLaunch,
                        good_job.jobToken
                    );
                    scheduler.addSimpleIntervalJob(job1);

                    return 200, {
                        success: true,
                        body: 'Update of job done!',
                        good_job
                    };

                }
                else if (isSuccess == true) {
                    console.log('updateJob, checkGetJob FAIL');

                    scheduler.removeById(good_job.jobToken);

                    job.deleteJob(req.header('authtoken'), good_job.jobToken)
                    .catch((e) => {
                        isSuccess_2 = false;
                        console.log(e);
                    })
                    .then((user) => {
                        if (isSuccess_2 == true) {
                            console.log('good_job deleteJob SUCESSFUL');

                            // res.status(401).json({
                            //     success: true,
                            //     body: 'good_job deletion of job done!'
                            // });

                            return 401, {
                                success: true,
                                body: 'Update of job failed, deletion of job done!'
                            };

                        }
                        else {
                            console.log('good_job deleteJob FAIL');
                            // res.status(401).json({
                            //     success: false,
                            //     body: 'good_job deletion of job Failed'
                            // });

                            return 401, {
                                success: false,
                                body: 'good_job deletion of job Failed'
                            };

                        }
                    });

                }
                else {
                    console.log('good_job deleteJob FULL FAIL');

                    scheduler.removeById(good_job.jobToken);

                    // res.status(401).json({
                    //     success: false,
                    //     body: 'Update of job Failed'
                    // });

                    return 401, {
                        success: false,
                        body: 'Update of job Failed'
                    };

                }
            });
        }


        //--//


        else {
            console.log('updateJobAddArgs FAIL');

            scheduler.removeById(jobToken);


            job.deleteJob(req.header('authtoken'), jobToken)
            .catch((e) => {
                isSuccess_2 = false;
                console.log(e);
            })
            .then((user) => {
                if (isSuccess_2 == true) {
                    console.log('updateJobAddArgs FAIL deleteJob SUCESSFUL');

                    // res.status(200).json({
                    //     success: true,
                    //     body: 'updateJobAddArgs deletion of job done!'
                    // });

                    return 200, {
                        success: true,
                        body: 'updateJobAddArgs deletion of job done!'
                    };

                }
                else {
                    console.log('updateJobAddArgs FAIL deleteJob FAIL');
                    // res.status(401).json({
                    //     success: false,
                    //     body: 'updateJobAddArgs deletion of job Failed'
                    // });

                    return 401, {
                        success: false,
                        body: 'updateJobAddArgs deletion of job Failed'
                    };

                }
            });
        }
    });

}

function checkGetJob(action, actionArgs, reaction, reactionArgs)
{
    if (actions.checkAction.get(action)(actionArgs) == false || reactions.checkReaction.get(reaction)(reactionArgs) == false)
        return false;
    return true;
}

function getJob(action, actionArgs, reaction, reactionArgs)
{
/*
    actions.action.get(action)(actionArgs, reactions.reaction.get(reaction), reactionArgs);

    var job = new SimpleIntervalJob(
        { seconds: 20, runImmediately: true },
        task,
        'id_1'
    );
*/
    /*const test = actions.action.get(action)(actionArgs, reactions.reaction.get(reaction), reactionArgs);*/
    //return test;

    return new Task('test', () => {actions.action.get(action)(actionArgs, reactions.reaction.get(reaction), reactionArgs)});

    //return actions.action.get(action)(actionArgs, reactions.reaction.get(reaction), reactionArgs);
}

//module.exports.updateJob_extra = updateJob_extra;
//module.exports.updateJob_extra_2 = updateJob_extra_2;
module.exports.updateJob_extra_3 = updateJob_extra_3;
module.exports.checkGetJob = checkGetJob;
//module.exports.getJob = getJob;