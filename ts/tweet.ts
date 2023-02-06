class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        let newText = this.text.toLowerCase();
        if(newText.includes('completed') || newText.includes('posted')) {return 'completed_event';}
        else if(newText.includes('watch')) {return 'live_event';}
        else if(newText.includes('achieved') || newText.includes('set a goal')) {return 'achievement';}
        else {return 'miscellaneous'};
        return "unknown";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        let userText = this.text.toLowerCase();
        if (userText.includes('-')) return true;
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        let userTextContent = this.text.substring(this.text.indexOf('-'), this.text.indexOf('https'))
        return userTextContent;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let activitiesType = this.text.toLowerCase()
        
        if(activitiesType.includes(' run ')){
            if(activitiesType.includes(' ski ')) {return 'skiing';}
            else {return 'running'};
        }
        else if(activitiesType.includes(' walk ')) { return 'walking';}
        else if(activitiesType.includes(' hike ')) {return 'hiking';}
        else if(activitiesType.includes(' swim ')) {return 'swimming';}   
        else if(activitiesType.includes(' chair ride ')) {return 'chair riding';}
        else if(activitiesType.includes(' bike ')) {return 'biking';}
        else if(activitiesType.includes(' freestyle') || activitiesType.includes(' activity'))
        {
            return 'freestyle activities';
        }
        else if(activitiesType.includes(' workout ')) {return 'workout';}
        else if(activitiesType.includes(' yoga ')) {return 'yoga';}
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        let distanceArray;
        let distanceString: string ="";
        if(this.text.includes(' mi ')) {
            distanceArray = this.text.match(/(?<= a )(.*?)(?= mi )/g);
            if(distanceArray!=null) {
                distanceArray.forEach(element => {
                    if(element!=null){
                        distanceString += element.toString();
                    }
                });
            }
            let miles = parseFloat(distanceString);
            let milesString: string = miles.toFixed(2);
            let milesDecimal = parseFloat(milesString);
            return milesDecimal;
        } else if (this.text.includes(' km ')) {
            distanceArray = this.text.match(/(?<=a )(.*?)(?= km )/g);
            if(distanceArray!=null) {
                distanceArray.forEach(element => {
                    if(element!=null){
                        distanceString += element.toString();
                    }
                });
            }
            //convert kilometers to miles
            let kilometers = parseFloat(distanceString);
            let miles = kilometers/1.609;
            let milesString: string = miles.toFixed(2);
            let milesDecimal = parseFloat(milesString);
            return milesDecimal;
        }
        return 0;
    }

    get content():string {
        return this.text;
    }

    get link(): string{
        let urlArray;
        let url:string = "";
        urlArray = this.text.match(/(http|https|ftp):\/\/([^\s]+)/g);
        if(urlArray!=null){
            urlArray.forEach(element=> {
                url+=element.toString();
            });
        }
        return url;
    }

    get clickableUrl(): string{
        return '<a href="' +this.link+ '">'  +this.link+'</a>';
    }

    get tweetAndLink(): string{
        let tweetContent = "";
        tweetContent = this.text.replace(this.link, this.clickableUrl);
        return tweetContent;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let index = rowNumber;
        let activity = this.activityType;
        let tweetContent = this.tweetAndLink;
        return `<tr><td>${index}</td><td>${activity}</td><td>${tweetContent}</td></tr>`;
    }
}