var tweetSearchList = [];
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	tweet_array.forEach(element => {
		if(element.written)
		{
			tweetSearchList.push(element);
		}
	});
	// console.log(tweetSearchList[0])
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$('#searchText').text($('#textFilter').val().toLowerCase());
	var search = $('#searchText').text();
	// console.log(search)
	
	var tweetSearchArray = []
	tweetSearchArray = tweetSearchList.filter(element =>{
		if(element.text.includes(search))
		{
			return element;
		}
	});

	// console.log(tweetSearchArray);

	$('#tweetTable').empty();
	var index = 1;
	tweetSearchArray.forEach(element => {
		if(element.text.includes(search))
		{
			console.log(element.getHTMLTableRow(index));
			$('#tweetTable').append(element.getHTMLTableRow(index));
			index++;
		}
		
	});

	var numberResults = tweetSearchArray.length;
	$('#searchCount').text(numberResults);
	
	console.log(tweetSearchArray.length)
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});



