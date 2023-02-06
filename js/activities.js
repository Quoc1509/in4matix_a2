function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	console.log('text-array:', tweet_array.day)
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	var activitiesArray = new Object();
	activitiesArray['running'] = {count: 0, sum_distance: 0};
	activitiesArray['skiing'] = {count: 0, sum_distance: 0};
	activitiesArray['walking'] = {count: 0, sum_distance: 0};
	activitiesArray['hiking'] = {count: 0, sum_distance: 0};
	activitiesArray['swimming'] = {count: 0, sum_distance: 0};
	activitiesArray['yoga'] = {count: 0, sum_distance: 0};
	activitiesArray['workout'] = {count: 0, sum_distance: 0};
	activitiesArray['biking'] = {count: 0, sum_distance: 0};
	activitiesArray['freestyle activities'] = {count: 0, sum_distance: 0};
	activitiesArray['chair riding'] = {count: 0, sum_distance: 0};

	tweet_array.forEach(element => {
		// console.log('---------------------', element.day)
		if(element.activityType==='running')
		{ 
			activitiesArray['running'].count++;
			activitiesArray['running'].sum_distance+=element.distance;
		}
		else if(element.activityType === 'skiing')
		{
			activitiesArray['skiing'].count++;
			activitiesArray['skiing'].sum_distance += element.distance;
		}
		else if(element.activityType === 'walking')
		{
			activitiesArray['walking'].count++;
			activitiesArray['walking'].sum_distance += element.distance;
			// console.log(activitiesArray['walking'].sum_distance)
		}
		else if(element.activityType === 'hiking')
		{
			activitiesArray['hiking'].count++;
			activitiesArray['hiking'].sum_distance += element.distance;
		}
		else if(element.activityType === 'swimming')
		{
			activitiesArray['swimming'].count++;
			activitiesArray['swimming'].sum_distance += element.distance;
		}
		else if(element.activityType === 'yoga')
		{
			activitiesArray['yoga'].count++;
			activitiesArray['yoga'].sum_distance += element.distance;
		}
		else if(element.activityType === 'workout')
		{
			activitiesArray['workout'].count++;
			activitiesArray['workout'].sum_distance += element.distance;
		}
		else if(element.activityType === 'biking')
		{
			activitiesArray['biking'].count++;
			activitiesArray['biking'].sum_distance += element.distance;
		}
		else if(element.activityType === 'chair riding')
		{
			activitiesArray['chair riding'].count++;
			activitiesArray['chair riding'].sum_distance += element.distance;
		}
		else if(element.activityType === 'freestyle activities')
		{
			activitiesArray['freestyle activities'].count++;
			activitiesArray['freestyle activities'].sum_distance += element.distance;
			// const option = { weekday: 'long'};
			// console.log(element.time.toLocaleDateString('en-US', option))
		}
	});

	var activityTypeArray = [];
	for(var key in activitiesArray){
		activityTypeArray.push({
				activity: key,
				count: activitiesArray[key].count,
				totalDistance: activitiesArray[key].sum_distance.toFixed(2)
		});
	}

	var activitiesType = activityTypeArray.sort((a, b) => {
		return b.count - a.count
	});
	console.log(activitiesType);

	$('#numberActivities').text(activitiesType.length);

	var firstActivity = activitiesType[0].activity;
	var secondActivity = activitiesType[1].activity;
	var thirdActivity = activitiesType[2].activity;
	
	$('#firstMost').text(firstActivity);
	$('#secondMost').text(secondActivity);
	$('#thirdMost').text(thirdActivity);

	var firstActivityAver = (activitiesType[0].totalDistance / activitiesType[0].count);
	var secondActivityAver = (activitiesType[1].totalDistance / activitiesType[1].count);
	var thirdActivityAver = (activitiesType[2].totalDistance / activitiesType[2].count);

	var threeAverage = Object();
	threeAverage['firstActivity'] = {activity: firstActivity, averageDistance: firstActivityAver};
	threeAverage['secondActivity'] = {activity: secondActivity, averageDistance: secondActivityAver};
	threeAverage['thirdActivity'] = {activity: thirdActivity, averageDistance: thirdActivityAver};

	var threeAverageArray = [];
	for(key in threeAverage)
	{
		threeAverageArray.push({
			activity: threeAverage[key].activity,
			averageDistance: threeAverage[key].averageDistance.toFixed(2)
		});
	}

	var sortAverageArray = threeAverageArray.sort((a, b) => {
		return b.averageDistance - a.averageDistance;
	})
	console.log(sortAverageArray)

	var logestAverageDistance = sortAverageArray[0].activity;
	var shortestAverageDistance = sortAverageArray[sortAverageArray.length-1].activity;

	$('#longestActivityType').text(logestAverageDistance);
	$('#shortestActivityType').text(shortestAverageDistance);


	var weekday = 0;
	var weekend = 0;
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	tweet_array.forEach(element => {
		var date = element.time.toLocaleDateString('en-US', options);
		// console.log(typeof date);
		if(element.activityType === logestAverageDistance)
		{
			if(date.includes('Monday') || date.includes('Tuesday') || date.includes('Wednesday') 
				|| date.includes('Thursday') || date.includes('Friday'))
			{
				weekday++;
			}
			else if(date.includes('Saturday') || date.includes('Sunday'))
			{
				weekend++;
			}
		}
	}); 
	console.log('weekday: ', weekday);
	console.log('weekend: ',  weekend);

	$('#weekdayOrWeekendLonger').text((weekday > weekend) ? 'weekday' : 'weekend')
	console.log(firstActivity)
	console.log(secondActivity)
	console.log(thirdActivity)
	
	var weekDateArray = []
	tweet_array.forEach(element => {
		if(element.activityType === firstActivity || element.activityType === secondActivity || element.activityType === thirdActivity)
		{
			weekDateArray.push({
				activity: element.activityType,
				day: element.time.toString().substring(0,3),
				distance: element.distance
			});
			// console.log(element.activityType)
		}
	});

	// console.log(weekDateArray)
	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 400,
		"height":400,
		"data": {
		// "values": tweet_array
		"values": activityTypeArray
		},
		
		//TODO: Add mark and encoding
		"selection": {
			"pts": {"type": "single", "on": "mouseover"}
		},
		"mark": "bar",
		"encoding": {
			"x": {"field": "activity", "type": "ordinal"},
			"y": {"field": "count", "type": "quantitative"},
			"color": {
				"condition": {
					"selection": "pts",
					"type": "quantitative"
				},
				"value": "grey"
			}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 700,
		"height": 400, 
		"data": {
			//"values": tweet_array
			"values": weekDateArray
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day (time)"}
			},
			"y": {
				"field": "distance",
				"type": "quantitative"
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 200
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
		"description": "A graph of of the distances by day of the week for all of the three most tweeted-about activities, aggregating the activities by the mean.",
		"width": 700,
		"height": 400, 
		"data": {
			//"values": tweet_array
			"values": weekDateArray
		},
		"selection": {
			"paintbrush": {
				"type": "multi",
				"on": "mouseover", "empty": "all"
			}
		},
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day of the week"}
			},
			"y": {
				"field": "distance",
				"aggregate": "average",
				"type": "quantitative"
			},
			"size": {
				"condition": {
					"selection": "paintbrush", "value": 300
				},
				"value": 50
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#e7ba52", "#c7c7c7", "#aec7e8"]
				},
				"legend": {"title": "Activity Type"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});
}
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	
	$('#distanceVisAggregated').hide();
	$('#aggregate').click(function(event) {
		console.log("click!!!!!!!!!!!")
		var click_on = $(event.target);
		// console.log(click_on.text());
		if(click_on.text() == "Show means")
		{
			click_on.text("Show all activities");
			$('#distanceVis').hide();
			$('#distanceVisAggregated').show();
		}
		else if(click_on.text() === "Show all activities")
		{
			click_on.text("Show means");
			$('#distanceVis').show();
			$('#distanceVisAggregated').hide();
		}
	});
});