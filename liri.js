
//configures .env file for keys
require("dotenv").config();
//requires fs npm
const fs = require("fs");
//requires Twitter npm
const Twitter = require("twitter");

//questions for node to take from the user
const inquirer = require("inquirer");
//npm for sending API requests
const request = require("request");
//where key data is stored (not actual API keys)
const keys = require("./keys");


// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

//get tweets from Twitter accound and prints them to the console
client.get('statuses/user_timeline', "ChrisBl79265149", function (error, tweets) {
    if (!error) {
        for (let tweet of tweets) {
          console.log(tweet.user.screen_name, tweet.text)
        };
    }
});

// console.log(client);

// inquirer.prompt({
//     type: "input",
//     name: "tweet",
//     message: "Do you want to see my tweets?"
// });