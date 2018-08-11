//configures .env file for keys
require("dotenv").config();
//requires fs npm
const fs = require("fs");
//where key data is stored (not actual API keys)
const keys = require("./keys");
//requires Twitter keys
const Twitter = require("twitter");
//requirest Spotify npm
const Spotify = require('node-spotify-api');
//questions for node to take from the user
const inquirer = require("inquirer");
//npm for sending API requests
const request = require("request");



let spotifySong = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

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





getCommands = (command, nodeCommand) => {
    switch (command) {
        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            if (nodeCommand === undefined){
                nodeCommand = "The Sign"
            }
            getSpotify(nodeCommand);
            break;
    }
};

// console.log(client);

// inquirer.prompt({
//     type: "input",
//     name: "tweet",
//     message: "Do you want to see my tweets?"
// });

getCommands(userCommand, nodeCommand);