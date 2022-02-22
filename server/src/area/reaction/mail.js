var nodemailer = require('nodemailer');

//Ex tmp
// transporter
/*
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
    });
*/
function sendMail(transporter, to, subject, text) {
    var opt = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(opt, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

function sendMailReaction(token, args) {
    sendMail(nodemailer.createTransport({
        service: args[0],
        auth: {
            user: args[1],
            pass: args[2]
        }
        }), args[3], arsg[4], args[5]);
}

function checkSendMail(token, args) {
    return args.length == 6;
}

const mailInfo = new Map();

mailInfo.set("sendMail", {
    name:"sendMail",
    description:"Send a mail on trigger",
    args: [
        {text: "service", text: "user_mail", text: "user_password", text: "to", text: "subject", text: "text"}
    ]
});

module.exports.mailInfo = mailInfo;
module.exports.sendMailReaction = sendMailReaction;
module.exports.checkSendMail = checkSendMail;