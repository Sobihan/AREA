const twitch = require('./action/twitch'); //--//
const poem = require('./action/poem');
const nasa = require('./action/nasa');
const youtube = require('./action/youtube'); //--//
const doggo = require('./action/doggo');
const chuckNorris = require('./action/chuck_norris_facts');
const cat = require('./action/cat');
const fox = require('./action/fox');
const shibaInu = require('./action/shiba_inu');
const some_random_api = require('./action/some_random_api');
const waifu = require('./action/waifu');
const weather = require('./action/weather'); //--//

const action = new Map();

action.set("getStream", twitch.getStream); //--//
action.set("overXViewer", twitch.overXViewer); //--//
//action.set("getStreamsIfPlayingX", twitch.getStreamsIfPlayingX); //--//


action.set("getRandomPoem", poem.getRandomPoem);


action.set("getAPOD", nasa.getAPOD);


action.set("NewLike", youtube.NewLike); //--//
action.set("overXLike", youtube.overXLike); //--//
action.set("overXLikeAddY", youtube.overXLikeAddY); //--//
action.set("overXLikeTimesY", youtube.overXLikeTimesY); //--//

action.set("newView", youtube.newView); //--//
action.set("overXView", youtube.overXView); //--//
action.set("overXViewAddY", youtube.overXViewAddY); //--//
action.set("overXViewTimesY", youtube.overXViewTimesY); //--//

action.set("newVideos", youtube.newVideos); //--//
action.set("overXVideos", youtube.overXVideos); //--//
action.set("overXVideosAddY", youtube.overXVideosAddY); //--//
action.set("overXVideosTimesY", youtube.overXVideosTimesY); //--//


action.set("getRandomDog", doggo.getRandomDog);


action.set("getRandomChuckNorrisFacts", chuckNorris.getRandomChuckNorrisFacts);


action.set("getRandomCat", cat.getRandomCat);


action.set("getRandomFox", fox.getRandomFox);


action.set("getRandomShibaInu", shibaInu.getRandomShibaInu);


action.set("getSomeRandomRedPanda", some_random_api.getSomeRandomRedPanda);
action.set("getSomeRandomRaccoon", some_random_api.getSomeRandomRaccoon);
action.set("getSomeRandomKangaroo", some_random_api.getSomeRandomKangaroo);
action.set("getSomeRandomKoala", some_random_api.getSomeRandomKoala);
action.set("getSomeRandomJoke", some_random_api.getSomeRandomJoke);
action.set("getSomeRandomAnimePat", some_random_api.getSomeRandomAnimePat);
action.set("getSomeRandomAnimeWink", some_random_api.getSomeRandomAnimeWink);
action.set("getSomeRandomAnimeHug", some_random_api.getSomeRandomAnimeHug);
action.set("getSomeRandomMeme", some_random_api.getSomeRandomMeme);


action.set("getRandomWaifu", waifu.getRandomWaifu);


action.set("overXTemperature", weather.overXTemperature); //--//
action.set("belowXTemperature", weather.belowXTemperature); //--//
action.set("overXHumidity", weather.overXHumidity); //--//
action.set("belowXHumidity", weather.belowXHumidity); //--//
action.set("overXVisibility", weather.overXVisibility); //--//
action.set("belowXVisibility", weather.belowXVisibility); //--//
action.set("overXWindSpeed", weather.overXWindSpeed); //--//
action.set("belowXWindSpeed", weather.belowXWindSpeed); //--//

module.exports.action = action;



const checkAction = new Map();

checkAction.set("getStream", twitch.checkGetStream);
checkAction.set("overXViewer", twitch.checkOverXViewer);
//checkAction.set("getStreamsIfPlayingX", twitch.checkGetStreamsIfPlayingX);


checkAction.set("getRandomPoem", poem.checkGetRandomPoem);


checkAction.set("getAPOD", nasa.checkGetAPOD);


checkAction.set("NewLike", youtube.checkNewLike);
checkAction.set("overXLike", youtube.checkOverXLike);
checkAction.set("overXLikeAddY", youtube.checkOverXLikeY);
checkAction.set("overXLikeTimesY", youtube.checkOverXLikeY);

checkAction.set("newView", youtube.checkNewView);
checkAction.set("overXView", youtube.checkOverXView);
checkAction.set("overXViewAddY", youtube.checkOverXViewY);
checkAction.set("overXViewTimesY", youtube.checkOverXViewY);

checkAction.set("newVideos", youtube.checkNewVideos);
checkAction.set("overXVideos", youtube.checkOverXVideos);
checkAction.set("overXVideosAddY", youtube.checkOverXVideosY);
checkAction.set("overXVideosTimesY", youtube.checkOverXVideosY);


checkAction.set("getRandomDog", doggo.checkGetRandomDog);


checkAction.set("getRandomChuckNorrisFacts", chuckNorris.checkGetRandomChuckNorrisFacts);


checkAction.set("getRandomCat", cat.checkGetRandomCat);


checkAction.set("getRandomFox", fox.checkGetRandomFox);


checkAction.set("getRandomShibaInu", shibaInu.checkGetRandomShibaInu);


checkAction.set("getSomeRandomRedPanda", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomRaccoon", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomKangaroo", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomKoala", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomJoke", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomAnimePat", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomAnimeWink", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomAnimeHug", some_random_api.checkGetSomeRandom);
checkAction.set("getSomeRandomMeme", some_random_api.checkGetSomeRandom);


checkAction.set("getRandomWaifu", waifu.checkGetRandomWaifu);


checkAction.set("overXTemperature", weather.checkXTemperature);
checkAction.set("belowXTemperature", weather.checkXTemperature);
checkAction.set("overXHumidity", weather.checkXHumidity);
checkAction.set("belowXHumidity", weather.checkXHumidity);
checkAction.set("overXVisibility", weather.checkXVisibility);
checkAction.set("belowXVisibility", weather.checkXVisibility);
checkAction.set("overXWindSpeed", weather.checkXWindSpeed);
checkAction.set("belowXWindSpeed", weather.checkXWindSpeed);

module.exports.checkAction = checkAction;



const infoAction = new Map();

infoAction.set("twitch", {name: "twitch", actions: twitch.twitchInfo});
infoAction.set("poem", {name: "poem", actions: poem.poemInfo});
infoAction.set("nasa", {name: "nasa", actions: nasa.nasaInfo});
infoAction.set("youtube", {name: "youtube", actions: youtube.youtubeInfo});
infoAction.set("doggo", {name: "doggo", actions: doggo.doggoInfo});
infoAction.set("chuckNorris", {name: "chuckNorris", actions: chuckNorris.chuckNorrisFactsInfo});
infoAction.set("cat", {name: "cat", actions: cat.catInfo});
infoAction.set("fox", {name: "fox", actions: fox.foxInfo});
infoAction.set("shibaInu", {name: "shibaInu", actions: shibaInu.shibaInuInfo});
infoAction.set("someRandomApi", {name: "someRandomApi", actions: some_random_api.someRandomInfo});
infoAction.set("waifu", {name: "waifu", actions: waifu.waifuInfo});
infoAction.set("weather", {name: "weather", actions: weather.weatherInfo});

module.exports.infoAction = infoAction;