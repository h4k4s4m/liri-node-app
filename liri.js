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

//Logger Crap
var log4js = require('log4js');
log4js.configure({
    appenders: {
        output: {
            type: 'file',
            filename: 'output.log'
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['output', 'console'],
            level: 'info'
        }
    }
});
var logger = log4js.getLogger('output');

//General Vars
const fs = require('fs');
fourth = process.argv[3];
command = process.argv[2];



logger.info(command);
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
            logger.info("Unrecognized Command");
    }
}

function tweet() {
    logger.info("Here are your Tweets: \n");
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            let counter = 0;
            for (x in tweets) {
                logger.info(tweets[x].created_at.split(' +')[0]);
                logger.info(tweets[x].text);
                logger.info("----------------------");
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
            logger.info("Artist: ")
            logger.info(response.tracks.items[0].album.artists[0].name);
            logger.info("----------------------");
            logger.info("Song: ")
            logger.info(response.tracks.items[0].name);
            logger.info("----------------------");
            logger.info("Link: ")
            logger.info(response.tracks.items[0].album.artists[0].external_urls.spotify);
            logger.info("----------------------");
            logger.info("Album: ")
            logger.info(response.tracks.items[0].album.name);
        });
}

function muvies(title) {

    if (!title) {
        title = "Mr. Nobody";
    }

    title = title.split(' ').join('+').replace('.', '');

    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title, function (error, data, body) {
        body = JSON.parse(body);
        logger.info("Title:", body.Title);
        logger.info("----------------------");
        logger.info("Year: ", body.Year);
        logger.info("----------------------");
        logger.info("IMDB Rating: ", body.Ratings[0].Value);
        logger.info("----------------------");
        logger.info("RT Rating: ", body.Ratings[1].Value);
        logger.info("----------------------");
        logger.info("Country: ", body.Country);
        logger.info("----------------------");
        logger.info("Language: ", body.Language);
        logger.info("----------------------");
        logger.info("Plot: ", body.Plot);
        logger.info("----------------------");
        logger.info("Actors: ", body.Actors);

    });
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, fd) {
        if (err) {
            logger.info(err);
        }
        command = fd.split(',')[0];
        fourth = fd.split(',')[1];
        main();
    });
}