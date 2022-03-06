const search = require('../search');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "FastMail", //last 30 days from the 04/03/2022
    auth: {
        user: 'great_area_yeepee@fastmail.com',
        pass: 'vquaepvxhsnvtyye',
    },
});

async function sendEmail(reactionArgs)
{
    let is_failed = false;
    const text = search.args(reactionArgs, "text");
    const recvEmail = search.args(reactionArgs, "recvEmail");

    try {
        var email = await transporter.sendMail({
            from: '"Great Area YEEPEE 👻" <great_area_yeepee@fastmail.com>', // sender address
            to: recvEmail, // list of receivers
            subject: "Response from your area", // Subject line
            text: text, // plain text body
        });
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed && email.messageId != undefined) {
            console.log("sendEmail SUCESSFUL")
        }
        else {
            console.log("sendEmail FAIL")
        }
    }
}

module.exports.sendEmail = sendEmail;



function checkSendEmail(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    if (search.args(reactionArgs, "recvEmail") == null)
        return false;
    search.AddArgs(reactionArgs, "text", "");
    return true;
}

module.exports.checkSendEmail = checkSendEmail;



const emailInfo = new Map();

emailInfo.set("[Email] sendEmail", {
    name:"[Email] sendEmail",
    description:"Send an email as a reaction.",
    args: [
        {recvEmail: "The email adress that will receive the message we send."}
    ]
});

module.exports.emailInfo = emailInfo;