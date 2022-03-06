const discord = require('./reaction/discord'); //--//
const email = require('./reaction/email'); //--//

const reaction = new Map();

reaction.set("[Discord] sendServerMessages", discord.sendServerMessages); //--//
reaction.set("[Discord] sendPrivateMessages", discord.sendPrivateMessages); //--//
reaction.set("[Email] sendEmail", email.sendEmail); //--//

module.exports.reaction = reaction;



const checkReaction = new Map();

checkReaction.set("[Discord] sendServerMessages", discord.checkSendServerMessages);
checkReaction.set("[Discord] sendPrivateMessages", discord.checkSendPrivateMessages);
checkReaction.set("[Email] sendEmail", email.checkSendEmail);

module.exports.checkReaction = checkReaction;



const infoReaction = new Map();

infoReaction.set("discord", {name: "discord", reactions: discord.discordInfo});
infoReaction.set("email", {name: "email", reactions: email.emailInfo});

module.exports.infoReaction = infoReaction;