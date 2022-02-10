const search = require('../search');

function testReaction(reactionArgs)
{
    const text = search.args(reactionArgs, "text");

    if (text != null)
        console.log("\nHello world " + text + "\n");
    else
        console.log("\nHello world\n");
}

module.exports.testReaction = testReaction;



function checkTestReaction(reactionArgs)
{
    if (search.args(reactionArgs, "text") == null)
        return false;
    return true;
}

module.exports.checkTestReaction = checkTestReaction;



const testInfo = new Map();

testInfo.set("testReaction", {
    name:"testReaction",
    description:"I am a reaction description",
    args: [
        {text: "Text to display after the Hello World :)"}
    ]
});

module.exports.testInfo = testInfo;