import NewVideo from "./NewVideo.js";
import NewLike from "./NewLike.js";

export {NewLike, NewVideo};


/*
@NewLike
const url = "https://www.youtube.com/watch?v=QHmDEFLosSA&t=415s";
const nl = new NewLike({url: url, interval:1000, reaction: reac});
nl.start()
nl.stop()
*/

/*
@NewVideo
function reac() {
    console.log("New Videoo")
}
const nv = new NewVideo({url: "https://www.youtube.com/channel/UCPF-oYb2-xN5FbCXy0167Gg", interval: 1000, reaction: reac})
nv.start();
nv.stop();
*/
