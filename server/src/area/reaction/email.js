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
/*
    let email = await transporter.sendMail({
        from: '"Great Area YEEPEE 👻" <great_area_yeepee@fastmail.com>', // sender address
        //to: "harutomicmic@gmail.com, harutomicmic@gmail.com", // list of receivers
        to: recvEmail, // list of receivers
        subject: "Response from your area", // Subject line
        //text: "Hello world?", // plain text body
        text: text, // plain text body
        //html: "<b>Hello world?</b>", // html body
    });
*/
    try {
        var email = await transporter.sendMail({
            from: '"Great Area YEEPEE 👻" <great_area_yeepee@fastmail.com>', // sender address
            //to: "harutomicmic@gmail.com, harutomicmic@gmail.com", // list of receivers
            to: recvEmail, // list of receivers
            subject: "Response from your area", // Subject line
            //text: "Hello world?", // plain text body
            text: text, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });
    }
    catch (error) {
        console.log(error);
        is_failed = true
    }
    finally {
        if (!is_failed && email.messageId != undefined) {
            console.log("sendEmail SUCESSFUL")
            //apiTokens.set(userToken, {[type]: data});
            //return data;
        }
        else {
            console.log("sendEmail FAIL")
        }
    }


    //console.log("Message sent: %s", email.messageId);
}

module.exports.sendEmail = sendEmail;



function checkSendEmail(userToken, reactionArgs)
{
    search.initializeArgs(reactionArgs);
    // search.AddArgs(reactionArgs, "userToken", userToken);
    if (search.args(reactionArgs, "recvEmail") == null)
        return false;
    return true;
}

module.exports.checkSendEmail = checkSendEmail;



const emailInfo = new Map();

emailInfo.set("sendEmail", {
    name:"sendEmail",
    description:"Send an email as a reaction.",
    args: [
        {recvEmail: "The email adress that will receive the message we send."}
    ]
});

module.exports.emailInfo = emailInfo;