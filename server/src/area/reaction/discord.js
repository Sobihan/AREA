const search = require('../search');
const {Client, Intents, MessageEmbed} = require('discord.js');

let bot = new Client({intents : [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ],  partials: ["CHANNEL"]});

bot.login("ODMyNTkwMzUzNzk3NDgwNDQ4.YHmAMQ.bMOLEFu6b2dBZF1oecxw2xxO-R4")

function sendServerMessages(reactionArgs)
{
    const text = search.args(reactionArgs, "text");
    const server = search.args(reactionArgs, "serverID");

    bot.channels.fetch(server).then(chan => {
        chan.send(text);
    })
    .catch(console.error);
}

function sendPrivateMessages(reactionArgs)
{
    const text = search.args(reactionArgs, "text");
    const user = search.args(reactionArgs, "userID");

    bot.users.fetch(user).then(chan => {
        chan.send(text);
    })
    .catch(console.error);
}

module.exports.sendServerMessages = sendServerMessages;
module.exports.sendPrivateMessages = sendPrivateMessages;



function checkSendServerMessages(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    // search.AddArgs(reactionArgs, "userToken", userToken);
    if (search.args(reactionArgs, "serverID") == null)
        return false;
    return true;
}

function checkSendPrivateMessages(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    // search.AddArgs(reactionArgs, "userToken", userToken);
    if (search.args(reactionArgs, "userID") == null)
        return false;
    return true;
}

module.exports.checkSendServerMessages = checkSendServerMessages;
module.exports.checkSendPrivateMessages = checkSendPrivateMessages;



const discordInfo = new Map();

discordInfo.set("sendServerMessages", {
    name:"sendServerMessages",
    description:"Use a discord bot to display a message in you server.",
    args: [
        {serverID: "Channel on wich our bot will communicate."}
    ]
});

discordInfo.set("sendPrivateMessages", {
    name:"sendPrivateMessages",
    description:"Use a discord bot to send a private message to a user.",
    args: [
        {userID: "The user who will receive a private message."}
    ]
});

module.exports.discordInfo = discordInfo;