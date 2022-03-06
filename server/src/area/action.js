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
const covid = require('./action/covid'); //--//

const action = new Map();

action.set("[Twitch] getStream", twitch.getStream); //--//
action.set("[Twitch] overXViewer", twitch.overXViewer); //--//
action.set("[Twitch] overXViewerAddY", twitch.overXViewerAddY); //--//
action.set("[Twitch] overXViewerTimesY", twitch.overXViewerTimesY); //--//
//action.set("getStreamsIfPlayingX", twitch.getStreamsIfPlayingX); //--//


action.set("[Poemist] getRandomPoem", poem.getRandomPoem);


action.set("[NASA] getAPOD", nasa.getAPOD);


action.set("[Youtube] NewLike", youtube.NewLike); //--//
action.set("[Youtube] overXLike", youtube.overXLike); //--//
action.set("[Youtube] overXLikeAddY", youtube.overXLikeAddY); //--//
action.set("[Youtube] overXLikeTimesY", youtube.overXLikeTimesY); //--//

action.set("[Youtube] newView", youtube.newView); //--//
action.set("[Youtube] overXView", youtube.overXView); //--//
action.set("[Youtube] overXViewAddY", youtube.overXViewAddY); //--//
action.set("[Youtube] overXViewTimesY", youtube.overXViewTimesY); //--//

action.set("[Youtube] newVideos", youtube.newVideos); //--//
action.set("[Youtube] overXVideos", youtube.overXVideos); //--//
action.set("[Youtube] overXVideosAddY", youtube.overXVideosAddY); //--//
action.set("[Youtube] overXVideosTimesY", youtube.overXVideosTimesY); //--//


action.set("[Dog] getRandomDog", doggo.getRandomDog);


action.set("[Chuck Norris] getRandomChuckNorrisFacts", chuckNorris.getRandomChuckNorrisFacts);


action.set("[Cat] getRandomCat", cat.getRandomCat);


action.set("[Fox] getRandomFox", fox.getRandomFox);


action.set("[Shiba Inu] getRandomShibaInu", shibaInu.getRandomShibaInu);


action.set("[Some Random] getSomeRandomRedPanda", some_random_api.getSomeRandomRedPanda);
action.set("[Some Random] getSomeRandomRaccoon", some_random_api.getSomeRandomRaccoon);
action.set("[Some Random] getSomeRandomKangaroo", some_random_api.getSomeRandomKangaroo);
action.set("[Some Random] getSomeRandomKoala", some_random_api.getSomeRandomKoala);
action.set("[Some Random] getSomeRandomJoke", some_random_api.getSomeRandomJoke);
action.set("[Some Random] getSomeRandomAnimePat", some_random_api.getSomeRandomAnimePat);
action.set("[Some Random] getSomeRandomAnimeWink", some_random_api.getSomeRandomAnimeWink);
action.set("[Some Random] getSomeRandomAnimeHug", some_random_api.getSomeRandomAnimeHug);
action.set("[Some Random] getSomeRandomMeme", some_random_api.getSomeRandomMeme);


action.set("[Waifu] getRandomWaifu", waifu.getRandomWaifu);


action.set("[Weather] overXTemperature", weather.overXTemperature); //--//
action.set("[Weather] belowXTemperature", weather.belowXTemperature); //--//
action.set("[Weather] overXHumidity", weather.overXHumidity); //--//
action.set("[Weather] belowXHumidity", weather.belowXHumidity); //--//
action.set("[Weather] overXVisibility", weather.overXVisibility); //--//
action.set("[Weather] belowXVisibility", weather.belowXVisibility); //--//
action.set("[Weather] overXWindSpeed", weather.overXWindSpeed); //--//
action.set("[Weather] belowXWindSpeed", weather.belowXWindSpeed); //--//


action.set("[Covid] getUpdatedInfo", covid.getUpdatedInfo); //--//
action.set("[Covid] getOverXActive", covid.getOverXActive); //--//
action.set("[Covid] getOverXCritical", covid.getOverXCritical); //--//

module.exports.action = action;



const checkAction = new Map();

checkAction.set("[Twitch] getStream", twitch.checkGetStream);
checkAction.set("[Twitch] overXViewer", twitch.checkOverXViewer);
checkAction.set("[Twitch] overXViewerAddY", twitch.checkOverXViewerY);
checkAction.set("[Twitch] overXViewerTimesY", twitch.checkOverXViewerY);
//checkAction.set("getStreamsIfPlayingX", twitch.checkGetStreamsIfPlayingX);


checkAction.set("[Poemist] getRandomPoem", poem.checkGetRandomPoem);


checkAction.set("[NASA] getAPOD", nasa.checkGetAPOD);


checkAction.set("[Youtube] NewLike", youtube.checkNewLike);
checkAction.set("[Youtube] overXLike", youtube.checkOverXLike);
checkAction.set("[Youtube] overXLikeAddY", youtube.checkOverXLikeY);
checkAction.set("[Youtube] overXLikeTimesY", youtube.checkOverXLikeY);

checkAction.set("[Youtube] newView", youtube.checkNewView);
checkAction.set("[Youtube] overXView", youtube.checkOverXView);
checkAction.set("[Youtube] overXViewAddY", youtube.checkOverXViewY);
checkAction.set("[Youtube] overXViewTimesY", youtube.checkOverXViewY);

checkAction.set("[Youtube] newVideos", youtube.checkNewVideos);
checkAction.set("[Youtube] overXVideos", youtube.checkOverXVideos);
checkAction.set("[Youtube] overXVideosAddY", youtube.checkOverXVideosY);
checkAction.set("[Youtube] overXVideosTimesY", youtube.checkOverXVideosY);


checkAction.set("[Dog] getRandomDog", doggo.checkGetRandomDog);


checkAction.set("[Chuck Norris] getRandomChuckNorrisFacts", chuckNorris.checkGetRandomChuckNorrisFacts);


checkAction.set("[Cat] getRandomCat", cat.checkGetRandomCat);


checkAction.set("[Fox] getRandomFox", fox.checkGetRandomFox);


checkAction.set("[Shiba Inu] getRandomShibaInu", shibaInu.checkGetRandomShibaInu);


checkAction.set("[Some Random] getSomeRandomRedPanda", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomRaccoon", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomKangaroo", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomKoala", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomJoke", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomAnimePat", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomAnimeWink", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomAnimeHug", some_random_api.checkGetSomeRandom);
checkAction.set("[Some Random] getSomeRandomMeme", some_random_api.checkGetSomeRandom);


checkAction.set("[Waifu] getRandomWaifu", waifu.checkGetRandomWaifu);


checkAction.set("[Weather] overXTemperature", weather.checkXTemperature);
checkAction.set("[Weather] belowXTemperature", weather.checkXTemperature);
checkAction.set("[Weather] overXHumidity", weather.checkXHumidity);
checkAction.set("[Weather] belowXHumidity", weather.checkXHumidity);
checkAction.set("[Weather] overXVisibility", weather.checkXVisibility);
checkAction.set("[Weather] belowXVisibility", weather.checkXVisibility);
checkAction.set("[Weather] overXWindSpeed", weather.checkXWindSpeed);
checkAction.set("[Weather] belowXWindSpeed", weather.checkXWindSpeed);


checkAction.set("[Covid] getUpdatedInfo", covid.checkGetUpdatedInfo);
checkAction.set("[Covid] getOverXActive", covid.checkGetOverX);
checkAction.set("[Covid] getOverXCritical", covid.checkGetOverX);

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
infoAction.set("covid", {name: "covid", actions: covid.covidInfo});

module.exports.infoAction = infoAction;