
import ytch from 'yt-channel-info'

export default class NewVideo {
     constructor({url, interval, reaction}) {
        this.channeldID = url.split('/')[4]
        this.url = url;
        this.isStop = false;
        this.interval = interval;
        this.reaction = reaction;
    }

    stop(){
        this.isStop = true;
    }

    sleep() {
        return new Promise((resolve) => {
          setTimeout(resolve, this.interval);
        });
      }
    async start() {
        this.payload = {
            channelId : this.channeldID,
            sortBy: 'newest',
            channelIdType: 0
        }
        var response = await ytch.getChannelVideos(this.payload);
        this.lastVideo = response.items[0];
        while (!this.isStop) {
            var response = await ytch.getChannelVideos(this.payload);
            if (response.items[0].videoId != this.lastVideo.videoId) {
                this.lastVideo = response.items[0];
                this.reaction();
            }
            await this.sleep();  
        }
    }

}