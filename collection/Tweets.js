Tweets = new Mongo.Collection('tweets');
Options = new Mongo.Collection('options');

TweetSchema = new SimpleSchema({
	twit_id:{
		type:String,
		index:true,
		unique:true
	},
	tweet: {
		type: String
	},
	createdAt: {
		type: Date
	}
});

SimpleSchema.extendOptions({
  index: Match.Optional(Match.OneOf(Number, String, Boolean)),
  unique: Match.Optional(Boolean)
});
Tweets.attachSchema(TweetSchema);
