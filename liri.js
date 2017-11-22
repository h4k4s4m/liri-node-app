const Twitter = require('twitter');
const twitterKeys = require('./keys.js');
var client = new Twitter(twitterKeys);
var params = {
    screen_name: 'NotABot27847869'
};

var command = process.argv[2];

switch (command) {
    case "my-tweets":
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            } else {
                throw error
            }
        });
        break;
}