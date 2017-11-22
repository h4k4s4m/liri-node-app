const Twitter = require('twitter');
const twitterKeys = require('./keys.js');
var client = new Twitter(twitterKeys);
var params = {
    screen_name: 'NotABot27847869'
};

var command = process.argv[2];

switch (command) {
    case "my-tweets":
        console.log("Here are your Tweets: \n");
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                let counter = 0;
                for (x in tweets) {
                    console.log(tweets[x].created_at.split(' +')[0]);
                    console.log(tweets[x].text);
                    console.log('\n')
                    if (counter == 19) {
                        return;
                    }
                    counter++;
                }
            } else {
                throw error;
            }
        });
        break;
}