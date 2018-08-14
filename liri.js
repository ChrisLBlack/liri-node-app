//configures .env file for keys
require("dotenv").config();
//requires fs npm
const fs = require("fs");
//where key data is stored (not actual API keys)
const keys = require("./keys");
//requires Twitter keys
const Twitter = require("twitter");
//requires Spotify npm
const Spotify = require('node-spotify-api');
//npm for sending API requests
const request = require("request");

let nodeCommand = process.argv[3];
let userCommand = process.argv[2];


let spotifySong = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let omdbKey = (keys.omdb.api);


//get tweets from Twitter account and prints them to the console. command "my-tweets"
getTweets = () => {
    client.get('statuses/user_timeline', "ChrisBl79265149", function (error, tweets, response) {
        if (!error) {
            for (let tweet of tweets) {
                console.log("---------------------------------")
                console.log(tweet.user.screen_name, tweet.text)
                console.log("---------------------------------")
            };
        }
    });

};
//gets spotify song and prints info to the console.  command "spotify-this-song"
getSpotify = (song) => {
  
    spotifySong.search({
        type: "track",
        query: song
    }, (err, data) => {
        if (err) {
            console.log(err);
        }
        let song = data.tracks.items[0];
        console.log(
            `Artist: ${song.artists[0].name}
        Song: ${song.name}
        Preview URL: ${song.preview_url}
        Album: ${song.album.name}`
        );
        console.log("---------------------------------------")


    });
};
// gets movie data and prints info to the console.  command "movie-this"
getMovie = () => {

    if (nodeCommand === undefined) {
        nodeCommand = "Mr. Nobody";
    }

    let URL = `https://www.omdbapi.com/?t=${nodeCommand}&y=&plot=short&apikey=${omdbKey}`;
    request(URL, function (err, response, ) {
        if (err) {
            console.log(err);
        };
        movieInfo = JSON.parse(response.body);
        console.log("==================================")
        console.log(`Title: ${movieInfo.Title}`);
        console.log(`Year: ${movieInfo.Year}`);
        console.log(`IMDB Rating: ${movieInfo.imdbRating}`);
        console.log(`Country Produced: ${movieInfo.Country}`);
        console.log(`Language: ${movieInfo.Language}`);
        console.log(`Plot: ${movieInfo.Plot}`);
        console.log(`Actors: ${movieInfo.Actors}`);
        console.log(`===================================`);
    });
};
//fucntion to feed info from random.txt file to spotify function. command "do-what-it-says";
doIt = () => {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataArr = data.split(",");
        getSpotify(dataArr[1]);

    });
};

getCommands = (command, nodeCommand) => {
    switch (command) {
        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            if (nodeCommand === undefined) {
                nodeCommand = "The Sign, Ace of Base";
            };

            getSpotify(nodeCommand);
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doIt();
            break;

    };
};



getCommands(userCommand, nodeCommand);