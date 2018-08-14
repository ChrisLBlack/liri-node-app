# liri-node-app

This app is a node.js based app, that the user inputs four simple commands and gets back break downs of songs, movies, and twitter info.  The basic command line is "node liri.js **command-here*** "user-input" ". 

The first command "my-tweets" sends an API request to Twitter and pull all of the tweets off of my Twitter page.  I haven't used Twitter at all up until this point..... So there are just tweets1-20.  Simple enough!

The second command is "spotify-this-song", which sends an API request to Spotify and retrives the artist, album, and a link to a preview of the song.  Currently, the app only accepts one word strings or strings that are wrapped in "" for this function.

The third command is "movie-this" and much like the first three, sends an API request to OMDB and returns the title, year released, IMDB rating, country produced, language, plot, and main actors in the movie.  

The fourth and final command "do-what-it-says", calls the spotify-this-song function.  However, it pulls the data on a .txt file and feeds it to the function.  

All keys for the Twitter, Spotify, and OMDB API's are kept in a .env file to ensure their security.  They are not uploaded via a .gitignore file on my local machine. 
