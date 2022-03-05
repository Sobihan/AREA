import getVideoId from "get-video-id";
import Innertube from "youtubei.js";

const youtube = await new Innertube();


export default class NewLike {
    constructor({url, interval, reaction}) {
        this.url = url;
        this.videoID = getVideoId(this.url);
        this.likes = 0;
        this.interval = interval;
        this.reaction = reaction;
        this.isStop = false;
    }

    sleep() {
        return new Promise((resolve) => {
          setTimeout(resolve, this.interval);
        });
      }

    async start(){
        while (!this.isStop) {
            const video = await youtube.getDetails(this.videoID.id);
            const currentLike = video.metadata.likes;
            if (currentLike > this.likes) {
                this.likes = currentLike;
                this.reaction();
                await this.sleep();
            }

        }
    }
    stop(){
        this.isStop = true
    }
}