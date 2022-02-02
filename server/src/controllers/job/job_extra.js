const job = require('../../db_management/job/db_job');

// function updateJob_extra(jobToken, actionArgJson, reactionArgJson) {
//     let isSuccess_actionArg = true;
//     let isSuccess_reactionArg = true;

//     for (const actionArg in actionArgJson) {
//         console.log(actionArgJson[actionArg]);
//         for (const arg in actionArgJson[actionArg]) {
//             //console.log("key =", arg);
//             //console.log("value =", actionArgJson[actionArg][arg]);
//             job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg])
//             .catch((e) => {
//                 isSuccess_actionArg = false;
//                 console.log(e);
//             })
//             .then((job) => {
//                 if (isSuccess_actionArg == true){
//                     console.log('updateActionArg SUCESSFUL');
//                 }
//                 else {
//                     console.log('updateActionArg FAIL');
//                     return false;
//                 }
//             });
//         }
//     }

//     for (const reactionArg in reactionArgJson) {
//         console.log(reactionArgJson[reactionArg]);
//         for (const arg in reactionArgJson[reactionArg]) {
//             //console.log("key =", arg);
//             //console.log("value =", reactionArgJson[actionArg][arg]);
//             job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg])
//             .catch((e) => {
//                 isSuccess_reactionArg = false;
//                 console.log(e);
//             })
//             .then((job) => {
//                 /*if (isSuccess_actionArg && isSuccess_reactionArg && reactionArg == (reactionArgJson.length - 1)) {
//                     console.log('SUPER SUPER updateReactionArg SUCESSFUL');
//                 }
//                 else */if (isSuccess_reactionArg == true){
//                     console.log('updateReactionArg SUCESSFUL');
//                     //console.log('reactionArg =', reactionArg, "and reactionArgJson.length =", reactionArgJson.length);
//                 }
//                 else {
//                     console.log('updateReactionArg FAIL');
//                     //console.log('reactionArg =', reactionArg, "and reactionArgJson.length =", reactionArgJson.length);
//                     return false;
//                 }
//             });
//         }
//     }

//     console.log('updateJob_extra Done');
//     return (isSuccess_actionArg && isSuccess_reactionArg)
// }



async function updateJob_extra_2(jobToken, actionArgJson, reactionArgJson) {
    let isSuccess_actionArg = true;
    let isSuccess_reactionArg = true;

    for (const actionArg in actionArgJson) {
        console.log(actionArgJson[actionArg]);
        for (const arg in actionArgJson[actionArg]) {
            let joba = await job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg]); //test
            //let joba = await job.updateActionArg("nop", arg, actionArgJson[actionArg][arg]); /crash test
            if (!joba.id) {
                //throw new Error(`Error, ${joba.status}`);
                //console.log(Object.keys(joba));
                //console.log("\nStart\n");
                /*joba.catch((e) => {
                    console.log(e);
                })
                console.log("\nEnd\n");
                */
                //throw new Error(`Error Test, ${joba.status}`);
                throw new Error(joba);
            }
            //return await joba.blob();
            //return false;
        }
    }

    for (const reactionArg in reactionArgJson) {
        console.log(reactionArgJson[reactionArg]);
        for (const arg in reactionArgJson[reactionArg]) {
            let job_2 = await job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg]); //good
            //let job_2 = await job.updateReactionArg("nop", arg, reactionArgJson[reactionArg][arg]); //crash test
            if (!job_2.id) {
                throw new Error(job_2);
            }
        }
    }

    return true;
}



async function updateJob_extra(jobToken, actionArgJson, reactionArgJson) {
    let isSuccess_actionArg = true;
    let isSuccess_reactionArg = true;

    for (const actionArg in actionArgJson) {
        console.log(actionArgJson[actionArg]);
        for (const arg in actionArgJson[actionArg]) {

            try {

                //let joba = await job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg]);
                let joba = await job.updateActionArg("nop", arg, actionArgJson[actionArg][arg]);
                //await job.updateActionArg("nop", arg, actionArgJson[actionArg][arg]);

                // console.log("joba =", joba);
                // console.log();
                // console.log();
                // console.log();

                /*if (!joba.ok) {
                    console.log("ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR");
                }*/

                // joba.catch((e) => {
                //     console.log(e);
                // })

                if (!joba.id) {
                    //throw new Error(`Error, ${joba.status}`);
                    console.log(Object.keys(joba));
                    console.log("\nStart\n");
                    /*joba.catch((e) => {
                        console.log(e);
                    })
                    console.log("\nEnd\n");
                    */
                    //throw new Error(`Error Test, ${joba.status}`);
                    throw new Error(joba);
                }
                return await joba.blob();

            }
            catch(e) {
                //console.log("ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR, ERROR",e)
                console.log("Check HERE")
                //console.log(e);
            }
/*
            job.updateActionArg(jobToken, arg, actionArgJson[actionArg][arg])
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
                    return false;
                }
            });
*/
        }
    }

    for (const reactionArg in reactionArgJson) {
        console.log(reactionArgJson[reactionArg]);
        for (const arg in reactionArgJson[reactionArg]) {

            let job_2 = await job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg]);

            /*if (!job_2.ok) {
                //throw new Error(job_2.status);
                throw new Error(`Error, ${job_2.status}`);
            }*/

            //console.log("job_2 =", job_2);

/*
            job.updateReactionArg(jobToken, arg, reactionArgJson[reactionArg][arg])
            .catch((e) => {
                isSuccess_reactionArg = false;
                console.log(e);
            })
            .then((job) => {
                /-*if (isSuccess_actionArg && isSuccess_reactionArg && reactionArg == (reactionArgJson.length - 1)) {
                    console.log('SUPER SUPER updateReactionArg SUCESSFUL');
                }
                else *-/if (isSuccess_reactionArg == true){
                    console.log('updateReactionArg SUCESSFUL');
                    //console.log('reactionArg =', reactionArg, "and reactionArgJson.length =", reactionArgJson.length);
                }
                else {
                    console.log('updateReactionArg FAIL');
                    //console.log('reactionArg =', reactionArg, "and reactionArgJson.length =", reactionArgJson.length);
                    return false;
                }
            });
*/
        }
    }

    console.log('updateJob_extra Done');
//    return (isSuccess_actionArg && isSuccess_reactionArg)
    return true;
}

module.exports.updateJob_extra = updateJob_extra;
module.exports.updateJob_extra_2 = updateJob_extra_2;