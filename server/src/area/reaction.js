const test = require('./reaction/test');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);

module.exports.reaction = reaction;