function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	


	//Find the earleast and lastest Tweet
	var earlestTweet = tweet_array[0]
	var lastestTweet = tweet_array[(tweet_array.length)-1]
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	$('#firstDate').text(earlestTweet.time.toLocaleDateString('en-US', options));
	$('#lastDate').text(lastestTweet.time.toLocaleDateString('en-US', options));

	//Find the categories 
	var completementCount = 0, liveCount = 0, achievementCount = 0, miscellaneousCount = 0;
	tweet_array.forEach(element => {
		if(element.source === 'completed_event') {completementCount++;}
		else if(element.source === 'live_event') {liveCount++;}
		else if(element.source === 'achievement') {achievementCount++;}
		else if(element.source === 'miscellaneous') {miscellaneousCount++;}
	});

	$('.completedEvents').text(completementCount);
	$('.liveEvents').text(liveCount);
	$('.achievements').text(achievementCount);
	$('.miscellaneous').text(miscellaneousCount);

	var tweetLength = tweet_array.length;
	var complementPct = ((completementCount/tweetLength)*100).toFixed(2);
	var livetPct = ((liveCount/tweetLength)*100).toFixed(2);
	var achivementPct = ((achievementCount/tweetLength)*100).toFixed(2);
	var miscellaneousPct = ((miscellaneousCount/tweetLength)*100).toFixed(2);

	$('.completedEventsPct').text(`${complementPct}%`);
	$('.liveEventsPct').text(`${livetPct}%`);
	$('.achievementsPct').text(`${achivementPct}%`);
	$('.miscellaneousPct').text(`${miscellaneousPct}%`);

	var userText = 0;
	tweet_array.forEach(element =>{
		if(element.written) userText++;
	});

	var userTextPct = ((userText/tweetLength)*100).toFixed(2);
	$(".written").text(userText);
	$('.writtenPct').text(`${userTextPct}%`);
}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});