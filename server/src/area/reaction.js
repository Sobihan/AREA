const test = require('./reaction/test');
const mail = require('./reaction/mail');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);
reaction.set("sendMail", mail.sendMailReaction);

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("testReaction", test.checkTestReaction);
checkReaction.set("sendMail", mail.checkSendMail);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

infoReaction.set("testInfo", {name: "testInfo", reactions: test.testInfo});
infoReaction.set("mailInfo", {name: "mailInfo", reactions: mail.mailInfo});

module.exports.infoReaction = infoReaction;