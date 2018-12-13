let dotenv = require("dotenv").config();
let keys = require('./keys')
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
let fs = require('fs');

let commands = process.argv[2];
let cliArgument = process.argv[3];



if (commands === "concert-this") {
    concert()
} else if (commands === "spotify-this-song") {
    spotifyFunc(cliArgument)
} else if (commands === "movie-this") {
    omdb();
} else if (commands === "do-what-it-says") {
    doWhat();
} else {
    console.log("Not a recognized LIRI command, please try again!")
};

function omdb() {
    axios.get("https://www.omdbapi.com/?t=" + cliArgument + "&y=&plot=short&apikey=trilogy")
        .then(function (something) {
            console.log("Movie title:  ", something.data.Title);
            console.log("Year released:  ", something.data.Year);
            console.log("IMDB Rating: ", something.data.imdbRating);
            console.log("Rotten Tomatoes rating: ", something.data.Ratings[1].Value);
            console.log("Country of origin: ", something.data.Country);
            console.log("Language: ", something.data.Language);
            console.log("Plot synopsis: ", something.data.Plot);
            console.log("Cast: ", something.data.Actors)
        })
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + cliArgument + "/events?app_id=codingbootcamp")
        .then(function (something) {

            for (i = 0; i < 5; i++) {
                c
                onsole.log("Venue name: ", something.data[i].venue.name);  
                console.log("City: ", something.data[i].venue.city); 
                console.log("Date: ", something.data[i].datetime); 
            }

        })
}


function spotifyFunc(cliArgument) {

    if (!cliArgument) {
        cliArgument = 'The Sign';
    };

    spotify.search({ type: 'track', query: cliArgument, limit: 5}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        } else {
            spotifyFunc(data);
        }});
        
}