const job = require('../../db_management/job/db_job');
const actions = require('../../area/action');
const reactions = require('../../area/reaction');
const { Task, AsyncTask } = require('toad-scheduler')

async function updateJob_extra(jobToken, actionArgJson, reactionArgJson) {
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

function checkGetJob(action, actionArgs, reaction, reactionArgs)
{
    if (actions.checkAction.get(action)(actionArgs) == false || reactions.checkReaction(reaction)(reactionArgs) == false)
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

module.exports.updateJob_extra = updateJob_extra;
module.exports.checkGetJob = checkGetJob;
module.exports.getJob = getJob;