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
//requires omdb npm 
const Omdb = require('omdb');
//questions for node to take from the user
const inquirer = require("inquirer");
//npm for sending API requests
const request = require("request");



let spotifySong = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
// let movie = new Omdb(keys.omdb);

let nodeCommand = process.argv[3];
let userCommand = process.argv[2];


//get tweets from Twitter accound and prints them to the console when user runs progam and asks for "my-tweets"
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

getSpotify = (song) => {
    if (song === "") {
        song = "The Sign";
    }
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

// getMovie = () => {

//     // if (movie === undefined){
//     //     movie = "Mr. Nobody";
//     // }
//     movie.search(movieName,(err, body) => {
//         if(err){
//             console.log(err);
//         };
//         console.log(movieName);
//     });

// };

doIt = () => {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if(err){
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
            if (nodeCommand === undefined){
                nodeCommand = "The Sign, Ace of Base"
            }
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