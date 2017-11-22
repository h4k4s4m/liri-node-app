//Twitter stuff
const Twitter = require('twitter');
const twitterKeys = require('./keys.js');
const client = new Twitter(twitterKeys);
const params = {
    screen_name: 'NotABot27847869'
};

//Spotify stuff
const Spotify = require('node-spotify-api');
const spotify = new Spotify({
    id: "45e2b37138de4e858e457168edd7584e",
    secret: "073901c2915a474fbcdd79a99784a140"
});

//Used for OMDB
const request = require('request');

//General Vars
var command = process.argv[2];

switch (command) {
    case "my-tweets":
        tweet();
        break;

    case "spotify-this-song":
        //the 4th arguement is the song name inputed by the user
        spot(process.argv[3]);
        break;

    case "movie-this":
        //the 4th arguement is the movie title to be searched
        muvies(process.argv[3]);
        break;
}

function tweet() {
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
}

function spot(song) {
    if (!song) {
        song = 'The Sign';
    }

    spotify
        .search({
            type: 'track',
            query: song
        })
        .then(function (response) {
            console.log("Artist: ")
            console.log(response.tracks.items[0].album.artists[0].name + '\n');
            console.log("Song: ")
            console.log(response.tracks.items[0].album.artists[0].external_urls.spotify + '\n');
            console.log("Album: ")
            console.log(response.tracks.items[0].album.artists[0].album.name + '\n');
        });
}

function muvies(title) {

    if (!title) {
        title = "Mr. Nobody";
    }

    title = title.split(' ').join('+').replace('.', '');

    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title, function (error, data, body) {
        body = JSON.parse(body);
        console.log("Title:", body.Title);
        console.log("----------------------");
        console.log("Year: ", body.Year);
        console.log("----------------------");
        console.log("IMDB Rating: ", body.Ratings[0].Value);
        console.log("----------------------");
        console.log("RT Rating: ", body.Ratings[1].Value);
        console.log("----------------------");
        console.log("Country: ", body.Country);
        console.log("----------------------");
        console.log("Language: ", body.Language);
        console.log("----------------------");
        console.log("Plot: ", body.Plot);
        console.log("----------------------");
        console.log("Actors: ", body.Actors);

    });
}