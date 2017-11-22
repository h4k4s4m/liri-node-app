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
const fs = require('fs');
fourth = process.argv[3];
command = process.argv[2];



console.log(command);
main();

function main() {
    switch (command) {
        case "my-tweets":
            tweet();
            break;

        case "spotify-this-song":
            //the 4th arguement is the song name inputed by the user
            spot(fourth);
            break;

        case "movie-this":
            //the 4th arguement is the movie title to be searched
            muvies(fourth);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Unrecognized Command");
    }
}

function tweet() {
    console.log("Here are your Tweets: \n");
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            let counter = 0;
            for (x in tweets) {
                console.log(tweets[x].created_at.split(' +')[0]);
                console.log(tweets[x].text);
                console.log("----------------------");
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
        song = 'The Sign Ace of Base';
    }

    spotify
        .search({
            type: 'track',
            query: song
        })
        .then(function (response) {
            console.log("Artist: ")
            console.log(response.tracks.items[0].album.artists[0].name);
            console.log("----------------------");
            console.log("Song: ")
            console.log(response.tracks.items[0].name);
            console.log("----------------------");
            console.log("Link: ")
            console.log(response.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("----------------------");
            console.log("Album: ")
            console.log(response.tracks.items[0].album.name);
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

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, fd) {
        if (err) {
            console.log(err);
        }
        command = fd.split(',')[0];
        fourth = fd.split(',')[1];
        main();
    });
}