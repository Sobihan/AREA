var mail = require("../area/reaction/mail.js")

function main() {
    console.log("testab");

    mail.sendMailReaction(["smtp.gmail.com", "*redacted*", "*redacted*", "maxime.verrier@epitech.eu", "test", "test body"]);
}
main()