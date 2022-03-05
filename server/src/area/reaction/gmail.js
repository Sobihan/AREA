// import googleapis from 'googleapis'

// const {google} = googleapis
// const gmail = google.gmail({version: 'v1', auth});

// function sendMessage(auth, from, to, subject, body) {
//     var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
//         "MIME-Version: 1.0\n",
//         "Content-Transfer-Encoding: 7bit\n",
//         "to: ", to, "\n",
//         "from: ", from, "\n",
//         "subject: ", subject, "\n\n",
//         body
//     ].join('');
//     var raw = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
//     gmail.users.messages.send({
//         auth: auth,
//         userId: 'me',
//         resource: {
//             raw: raw
//         }
//     }, function(err, response) {
//         res.send(err || response)
//     });
// }

// const messageInfo = new Map();

// testInfo.set("testReaction", {
//     name:"testReaction",
//     description:"I am a reaction description",
//     args: [
//         {text: "Text to display after the Hello World :)"}
//     ]
// });