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
function sendMail(transporter, from, to, subject, text) {
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

const mailInfo = new Map();

mailInfo.set("sendMail", {
    name:"sendMail",
    description:"Send a mail on trigger",
    args: [
        {text: "user_mail", text: "user_password", text: "to", text: "subject", text: "text"}
    ]
});