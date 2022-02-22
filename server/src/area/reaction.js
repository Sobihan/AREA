const test = require('./reaction/test');
const mail = require('./reaction/mail');
const reddit = require('./reaction/reddit');

const reaction = new Map();

reaction.set("testReaction", test.testReaction);
reaction.set("sendMail", mail.sendMailReaction);
reaction.set("redditPost", reddit.submitRedditPost);

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("testReaction", test.checkTestReaction);
checkReaction.set("sendMail", mail.checkSendMail);
checkReaction.set("sendMail", reddit.checkSubmitRedditPost);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

infoReaction.set("testInfo", {name: "testInfo", reactions: test.testInfo});
infoReaction.set("mailInfo", {name: "mailInfo", reactions: mail.mailInfo});
infoReaction.set("redditInfo", {name: "mailInfo", reactions: reddit.redditInfo});

module.exports.infoReaction = infoReaction;