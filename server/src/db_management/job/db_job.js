const main = require('../../main');

async function updateJob(authToken, jobToken, name, action, reaction, interval) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            job: {
                upsert: {
                    create: {
                        name: name,
                        action: action,
                        reaction: reaction,
                        interval: interval != 0 ? interval : 600,
                    },
                    update: {
                        name: name != '' ? name : undefined,
                        action: action != '' ? action : undefined,
                        reaction: reaction != '' ? reaction : undefined,
                        interval: interval != -1 ? interval : undefined,
                    },
                    where: {
                        jobToken_userToken: {
                            jobToken: jobToken,
                            userToken: authToken,
                        }
                    },
                }
            }
        },
        select: {
            job: {
                select: {
                    jobToken: true,
                    name: true,
                    action: true,
                    reaction: true,
                    interval: true,
                }
            }
        }
    })
    return user;
}

async function updateActionArg(jobToken, key, value) {
    const user = await main.prisma.job.update({
        where: {
            jobToken: jobToken,
        },
        data: {
            /*actionArg: {
                create: {
                    key: key,
                    value: value
                }
            }*/

            actionArg: {
                upsert: {
                    create: {
                        key: key,
                        value: value
                    },
                    update: {
                        value: value
                    },
                    where: {
                        key_jobToken: {
                            key: key,
                            jobToken: jobToken,
                        }
                    },
                }
            }
        },
        /*select: {
            job: {
                select: {
                    jobToken: true,
                    name: true,
                    action: true,
                    reaction: true,
                    interval: true,
                }
            }*/
        //}
    })
    return user;
}

async function updateReactionArg(jobToken, key, value) {
    const user = await main.prisma.job.update({
        where: {
            jobToken: jobToken,
        },
        data: {
            reactionArg: {
                upsert: {
                    create: {
                        key: key,
                        value: value
                    },
                    update: {
                        value: value
                    },
                    where: {
                        key_jobToken: {
                            key: key,
                            jobToken: jobToken,
                        }
                    },
                }
            }
        },
    })
    return user;
}

async function deleteJob(authToken, jobToken) {
    const user = await main.prisma.user.update({
        where: {
            token: authToken,
        },
        data: {
            job: {
                delete: {
                    jobToken_userToken: {
                        jobToken: jobToken,
                        userToken: authToken,
                    }
                }
            }
        }
    })
    return user;
}

function findJobChoosePath(name, action, reaction) {
    if (name == '' && action == '' && reaction == '')
        return 0; //search without any constrains.
    else if (name != '' && action == '' && reaction == '')
        return 1; //search by name.
    else if (name == '' && action != '' && reaction == '')
        return 2; //search by action.
    else if (name != '' && action != '' && reaction == '')
        return 3; //search by name and action.
    else if (name == '' && action == '' && reaction != '')
        return 4; //search by reaction.
    else if (name != '' && action == '' && reaction != '')
        return 5; //search by name and reaction.
    else if (name == '' && action != '' && reaction != '')
        return 6; //search by action and reaction.
    else if (name != '' && action != '' && reaction != '')
        return 7; //search by name, action and reaction.
}

//async function findUniqueJob(authToken, jobToken) {}


async function findJob(authToken, name, action, reaction) {
    //console.log('authToken = ' + authToken);

    switch(findJobChoosePath(name, action, reaction)) {
        case 0: //search without any constrains.
            const user0 = await main.prisma.user.findMany({
                where: {
                    token: authToken,
                },
                select: {
                    job: {
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                }
            })
            console.log("user0");
            return user0;
            case 1: //search by name.
            const user1 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            name: {
                                contains: name
                            },
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                }
            })
            console.log("user1");
            return user1;
        case 2: //search by action.
            const user2 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            action: {
                                contains: action,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user2");
            return user2;
        case 3: //search by name and action.
            const user3 = await main.prisma.user.findMany({
                where: {
                    token: authToken,
                },
                select: {
                    job: {
                        where: {
                            name: {
                                contains: name,
                            },
                            action: {
                                contains: action,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user3");
            return user3;
        case 4: //search by reaction.
            const user4 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            reaction: {
                                contains: reaction,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user4");
            return user4;
        case 5: //search by name and reaction.
            const user5 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            name: {
                                contains: name,
                            },
                            reaction: {
                                contains: reaction,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user5");
            return user5;
        case 6: //search by action and reaction.
            const user6 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            action: {
                                contains: action,
                            },
                            reaction: {
                                contains: reaction,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user6");
            return user6;
        case 7: //search by name, action and reaction.
            const user7 = await main.prisma.user.findMany({
                where: {
                    token: authToken
                },
                select: {
                    job: {
                        where: {
                            name: {
                                contains: name,
                            },
                            action: {
                                contains: action,
                            },
                            reaction: {
                                contains: reaction,
                            }
                        },
                        select: {
                            jobToken: true,
                            name: true,
                            action: true,
                            reaction: true,
                            interval: true,
                        }
                    }
                },
            })
            console.log("user7");
            return user7;
        default:
            console.log('Unknow case please report');
            return null;
    }
}

module.exports.updateJob = updateJob;
module.exports.updateActionArg = updateActionArg;
module.exports.updateReactionArg = updateReactionArg;
module.exports.deleteJob = deleteJob;
module.exports.findJob = findJob;