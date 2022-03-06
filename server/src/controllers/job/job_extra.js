const job = require('../../db_management/job/db_job');
const actions = require('../../area/action');
const reactions = require('../../area/reaction');
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require('toad-scheduler');
const { cleanArgs } = require('../../area/search');

const scheduler = new ToadScheduler()

async function updateJobAddArgs(jobToken, actionArgJson, reactionArgJson) {
    let deleteActionArg = await job.deleteActionArgs(jobToken);
    if (deleteActionArg.count == undefined) {
        console.log("deleteActionArg =", JSON.stringify(deleteActionArg))
        console.log('deleteActionArgs FAIL');
        throw new Error(deleteActionArg);
    }
    else {
        console.log('deleteActionArgs SUCESSFUL');
    }

    let deleteReactionArg = await job.deleteReactionArgs(jobToken);
    if (deleteActionArg.count == undefined) {
        console.log('deleteReactionArgs FAIL');
        throw new Error(deleteReactionArg);
    }
    else {
        console.log('deleteReactionArgs SUCESSFUL');
    }

    for (const actionArg in actionArgJson) {
        console.log(actionArgJson[actionArg]);
        for (const arg in actionArgJson[actionArg]) {
            let argJob = await job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg].toString()); //good
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
            let argJob_2 = await job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg].toString()); //good
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
        console.log(error);
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

                    cleanArgs(good_job.actionArg);
                    cleanArgs(good_job.reactionArg);

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

function checkGetJob(userToken, action, actionArgs, reaction, reactionArgs)
{
    if (actions.checkAction.get(action)(userToken, actionArgs) == false || reactions.checkReaction.get(reaction)(userToken, reactionArgs) == false)
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

function getReAction(re_actions)
{
    let keys = Array.from(re_actions.keys());
    var rslData = [];

    for (let i = 0; i < keys.length; i++) {
        let tmpJsonData = {}
        tmpJsonData["name"] = re_actions.get(keys[i]).name;
        tmpJsonData["description"] = re_actions.get(keys[i]).description;
        tmpJsonData["args"] = re_actions.get(keys[i]).args;
        rslData.push(tmpJsonData);
    }
    return rslData;
}

function removeJob(jobToken)
{
    scheduler.removeById(jobToken);
}

function launchJobOnStart()
{
    let isSuccess = true;

    job.getRelaunchJob()
    .catch((e) => {
        isSuccess = false;
        console.log(e);
    })
    .then((job) => {
        if (isSuccess == true && job != null && job != undefined){
            console.log('getRelaunchJob SUCESSFUL');
            const lenght = job.length;
            var actionArg = [];
            var reactionArg = [];

            for (let i = 0; i < lenght; i++) {
                const actionArgLenght = job[i].actionArg.length;
                const reactionArgLenght = job[i].reactionArg.length;

                for (let j = 0; j < actionArgLenght; j++) {
                    var actionArgObject = {};
                    actionArgObject[job[i].actionArg[j].key] = job[i].actionArg[j].value;
                    actionArg.push(actionArgObject);
                }
                for (let j = 0; j < reactionArgLenght; j++) {
                    var reactionArgObject = {};
                    reactionArgObject[job[i].reactionArg[j].key] = job[i].reactionArg[j].value;
                    reactionArg.push(reactionArgObject);
                }

                const jobToLaunch = getJob(job[i].action, actionArg, job[i].reaction, reactionArg);
                const job1 = new SimpleIntervalJob(
                    { seconds: job[i].interval, runImmediately: true },
                    jobToLaunch,
                    job[i].jobToken
                );
                scheduler.addSimpleIntervalJob(job1);
            }
        }
        else {
            console.log('getRelaunchJob FAIL');
        }
    });
}

module.exports.updateJob_extra = updateJob_extra;
module.exports.checkGetJob = checkGetJob;
module.exports.stopJob = stopJob;
module.exports.getReAction = getReAction;
module.exports.removeJob = removeJob;
module.exports.launchJobOnStart = launchJobOnStart;