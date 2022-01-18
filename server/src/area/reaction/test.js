function testReaction(text)
{
    if (text != null)
        console.log("\nHello world" + text + "\n");
    else
        console.log("\nHello world\n");
}

module.exports.testReaction = testReaction;

