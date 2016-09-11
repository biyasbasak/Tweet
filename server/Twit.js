import Twit from 'twit';
import _ from 'underscore';
import config_twit from '../config.js';

const T = new Twit(config_twit);

const options = {
	screen_name: 'kamaalrkhan',
	trim_user: true,
	exclude_replies: false,
	include_rts: true
};

// Gets the tweets
const getTweetService = function (cb) {
	T.get('statuses/user_timeline', options, function (err, data) {
		if (err) return cb(err, null);
		return cb(null, data);
	});
};

// Inserting the tweets to the databse
const insertTweet = function (tweet) {
	Tweets.insert({
		twit_id: tweet.id_str,
		tweet: tweet.text,
		retweet_count: tweet.retweet_count,
		favorite_count: tweet.favorite_count,
		createdAt: tweet.created_at
	});
	return;
}

// variable options.since_id is added to keep track of the last tweet that was fetched. it prevents duplicacy
Meteor.methods({
	newTweets: function () {
		let temp;
		let lastElement;
		getTweetService(Meteor.bindEnvironment(function (err, arr) {
			if (arr.length < 1) return console.log('no new tweets to show');
			temp = _.sortBy(arr, 'id_str');
			lastElement = _.last(temp);
			options.since_id = lastElement.id_str;
			arr.forEach(function (tweet) {
				insertTweet(tweet);
			});
		}));
	}
});
