# **Create Action or Reaction**

## **Authors**

- adrien.moreau@epitech.eu

## **Create services**

Each Services is inside of a specific file, for example youtube is in `youtube.js`.

They all export 3 different type of element needed for the service to work:
- `working function`: each of them do the work need like contacting an API or sending a message.
- `checking function`: each of them check if we have the elements needed by the `working function` and add the server specific.
- `information map`: informs the frontend of the name of the `working function`, and the names of the necessary elements.

### **Create Action**

`working function`:

They all are functions (no async), they all take 3 arguments:
- `actionArgs`: it contains the elements we need to do the work, when we need external elements.
- `callback`: it's the reaction, we will call it when the right triggers are activated.
- `reactionArgs`: it contains elements needed by the reaction (`callback`).

If we take `getUpdatedInfo` as an exemple we have the following
```js
function getUpdatedInfo(actionArgs, callback, reactionArgs) {}
```
All the elements needed are in place.

First, we get the elements we need.
```js
const country = search.args(actionArgs, "country");
const updated = search.args(actionArgs, "updated");
```

When the right triggers are activated, we will do the following (for `getUpdatedInfo`):
- `search.changeArgs(actionArgs, "updated", coronavirus.updated)`: change a server specific element to keep it up to date.
- `search.changeArgs(reactionArgs, "text", [REACTION TEXT HERE]);`: update `reactionArgs` with the required elements.
- `callback(reactionArgs);`: call the reaction so it can do it's job.
That is all for the action.

`checking function`:

They all are functions (no async), they all take 2 arguments:
- `userToken`: it's the user's token, it can be use to get Oauth credentials(W.I.P)
- `actionArgs`: it contains the elements needed by the action.

If we take `checkGetUpdatedInfo` as an exemple we have the following

```js
function checkGetUpdatedInfo(userToken, actionArgs) {}
```

Now we need to check if we got the right elements before letting the action do it's magic.

First we use `search.initializeArgs(actionArgs);` to make sure that we can use `actionArgs` afterwards.
Then we had a server specific element with `search.AddArgs(actionArgs, "updated", 0);`.
Finally we check if we have received the elements we need `if (search.args(actionArgs, "country") == null)` and return false if needed.
And if every thing is good we do `return true;`.

```js
    search.initializeArgs(actionArgs);
    search.AddArgs(actionArgs, "updated", 0);
    if (search.args(actionArgs, "country") == null)
        return false;
    return true;
```

`information map`

Finally we send the needed information down the line by creating the `information map` with `const covidInfo = new Map();`.

Then we add all the neede informations:
```js
covidInfo.set("[Covid] getUpdatedInfo", {
    name: "[Covid] getUpdatedInfo",
    description: "Informs you of the latest covid information for the chosen country.",
    args: [
        {country: "The chosen country."}
    ]
});
```
When everyting is done we simply need to export everything.
```js
module.exports.getUpdatedInfo = getUpdatedInfo;
module.exports.checkGetUpdatedInfo = checkGetUpdatedInfo;
module.exports.covidInfo = covidInfo;
```

### **Create Reaction**

`working function`:

They all are functions (no async), they all take 1 arguments:
- `reactionArgs`: it contains the elements we need to do the work, when we need external elements.

If we take `sendServerMessages` as an exemple we have the following
```js
function sendServerMessages(reactionArgs) {}
```
We simply need to get the elements:
```js
    const text = search.args(reactionArgs, "text");
    const server = search.args(reactionArgs, "serverID");
```

And activate the reaction with them.

`checking function`:

They all are functions (no async), they all take 2 arguments:
- `userToken`: it's the user's token, it can be use to get Oauth credentials(W.I.P)
- `reactionArgs`: it contains the elements needed by the reaction.

If we take `checkSendServerMessages` as an exemple we have the following

```js
function checkSendServerMessages(userToken, reactionArgs) {}
```

Now we need to check if we got the right elements before letting the action do it's magic.

First we use `search.initializeArgs(reactionArgs);` to make sure that we can use `reactionArgs` afterwards.
Then we check if everything is alright.
```js
    if (Number.isInteger(search.args(reactionArgs, "serverID")))
        return false;
    if (search.args(reactionArgs, "serverID") == null)
        return false;
```
Then we had a server specific element with `search.AddArgs(reactionArgs, "text", "");`.
And if every thing is good we do `return true;`.

```js
    search.initializeArgs(reactionArgs);
    if (Number.isInteger(search.args(reactionArgs, "serverID")))
        return false;
    if (search.args(reactionArgs, "serverID") == null)
        return false;
    search.AddArgs(reactionArgs, "text", "");
    return true;
```

`information map`

Finally we send the needed information down the line by creating the `information map` with `const discordInfo = new Map();`.

Then we add all the neede informations:
```js
discordInfo.set("[Discord] sendServerMessages", {
    name:"[Discord] sendServerMessages",
    description:"Use a discord bot to display a message in you server.",
    args: [
        {serverID: "Channel on wich our bot will communicate."}
    ]
});
```
When everyting is done we simply need to export everything.
```js
module.exports.sendServerMessages = sendServerMessages;
module.exports.checkSendServerMessages = checkSendServerMessages;
module.exports.discordInfo = discordInfo;
```

### **implement Action/Reaction**

Actions are implement in `action.js` and reactions a implement in `reaction.js`.

We require the needed file, `const covid = require('./action/covid');` / `const discord = require('./reaction/discord');`.

We set the action / reaction we have just created, `action.set("[Covid] getUpdatedInfo", covid.getUpdatedInfo);` / `reaction.set("[Discord] sendServerMessages", discord.sendServerMessages);`.

Then we set (with the same string) the checkAction / checkReaction we have just created, `checkAction.set("[Covid] getUpdatedInfo", covid.checkGetUpdatedInfo);` / `checkReaction.set("[Discord] sendServerMessages", discord.checkSendServerMessages);`.

Finaly we set (with the service name) the actionInfo / reactionInfo we have just created, `infoAction.set("covid", {name: "covid", actions: covid.covidInfo});` / `infoReaction.set("discord", {name: "discord", reactions: discord.discordInfo});`.