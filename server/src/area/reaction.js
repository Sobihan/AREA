const test = require('./reaction/test');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("testReaction", test.checkTestReaction);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

infoReaction.set("testInfo", {name: "testInfo", reactions: test.testInfo});

module.exports.infoReaction = infoReaction;