const search = require('../search');
const {Client, Intents, MessageEmbed, Util} = require('discord.js');

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

    if (text.length >= 2000){
        const splitText = text.match(/[\s\S]{1,1950}/g) || [];

        for (const pos in splitText) {
            bot.channels.fetch(server).then(chan => {
                chan.send(splitText[pos]);
            })
            .catch(console.error);
        }
    }
    else if (text.length != 0) {
        bot.channels.fetch(server).then(chan => {
            chan.send(text);
        })
        .catch(console.error);
    }
}

function sendPrivateMessages(reactionArgs)
{
    const text = search.args(reactionArgs, "text");
    const user = search.args(reactionArgs, "userID");

    if (text.length >= 2000) {
        const splitText = text.match(/[\s\S]{1,1950}/g) || [];

        for (const pos in splitText) {
            bot.users.fetch(user).then(chan => {
                chan.send(splitText[pos]);
            })
            .catch(console.error);
        }
    }
    else if (text.length != 0) {
        bot.users.fetch(user).then(chan => {
            chan.send(text);
        })
        .catch(console.error);
    }
}

module.exports.sendServerMessages = sendServerMessages;
module.exports.sendPrivateMessages = sendPrivateMessages;



function checkSendServerMessages(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    // search.AddArgs(reactionArgs, "userToken", userToken);

    if (Number.isInteger(search.args(reactionArgs, "serverID")))
        return false;
        //search.changeArgs(reactionArgs, "serverID", search.args(reactionArgs, "serverID").toString())

    if (search.args(reactionArgs, "serverID") == null)
        return false;
    search.AddArgs(reactionArgs, "text", "");
    return true;
}

function checkSendPrivateMessages(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    // search.AddArgs(reactionArgs, "userToken", userToken);

    // if (Number.isInteger(search.args(reactionArgs, "userID"))) {
    //     console.log("INSIDE");
    //     search.changeArgs(reactionArgs, "userID", search.args(reactionArgs, "userID").toString())
    // }

    if (Number.isInteger(search.args(reactionArgs, "userID")))
        return false;

    if (search.args(reactionArgs, "userID") == null)
        return false;
    search.AddArgs(reactionArgs, "text", "");
    return true;
}

module.exports.checkSendServerMessages = checkSendServerMessages;
module.exports.checkSendPrivateMessages = checkSendPrivateMessages;



const discordInfo = new Map();

discordInfo.set("[Discord] sendServerMessages", {
    name:"[Discord] sendServerMessages",
    description:"Use a discord bot to display a message in you server.",
    args: [
        {serverID: "Channel on wich our bot will communicate."}
    ]
});

discordInfo.set("[Discord] sendPrivateMessages", {
    name:"[Discord] sendPrivateMessages",
    description:"Use a discord bot to send a private message to a user.",
    args: [
        {userID: "The user who will receive a private message."}
    ]
});

module.exports.discordInfo = discordInfo;