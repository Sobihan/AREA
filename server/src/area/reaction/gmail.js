import googleapis from 'googleapis'

const {google} = googleapis
const gmail = google.gmail({version: 'v1', auth});

function sendMessage(auth, from, to, subjet, msg) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');
    var raw = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    }, function(err, response) {
        res.send(err || response)
    });
}