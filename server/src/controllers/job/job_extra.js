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

async function updateJob_extra(jobToken, actionArgJson, reactionArgJson, req)
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

function checkGetJob(action, actionArgs, reaction, reactionArgs)
{
    if (actions.checkAction.get(action)(actionArgs) == false || reactions.checkReaction.get(reaction)(reactionArgs) == false)
        return false;
    return true;
}

function getJob(action, actionArgs, reaction, reactionArgs)
{
    return new Task('test', () => {actions.action.get(action)(actionArgs, reactions.reaction.get(reaction), reactionArgs)});
}

function stopJob(jobToken, stop)
{
    if (stop) {
        console.log("Stop");
        scheduler.stopById(jobToken);
    }
    else if (!stop) {
        console.log("Go");
        scheduler.startById(jobToken);
    }
}

function getAction(actions)
{
    let keys = Array.from(actions.keys());
    var rslData = [];

    for(let i = 0; i < keys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = actions.get(keys[i]).name;
        tmpJsonData["description"] = actions.get(keys[i]).description;
        tmpJsonData["args"] = actions.get(keys[i]).args;
        rslData.push(tmpJsonData);
    }
    return rslData;
}


module.exports.updateJob_extra = updateJob_extra;
module.exports.checkGetJob = checkGetJob;
module.exports.stopJob = stopJob;
module.exports.getAction = getAction;
//module.exports.getJob = getJob;