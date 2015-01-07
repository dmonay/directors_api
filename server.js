var app = require('express')(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    request = require('request');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/directors_api');



app.get('/getall', listAll);
app.post('/register', register);
app.post('/update', update);
app.listen(1436);
console.log('\x1b[32;1mServer running at http://localhost:1436/\x1b[0m');


var Schema = mongoose.Schema;
var directorsSchema = new Schema({
    full_name: String,
    dob: String,
    favorite_camera: String,
    favorite_movies: Array
});
var directors = mongoose.model('Directors', directorsSchema);

function listAll(req, res) {
    console.log("\x1b[32;1mListAll Request received\x1b[0m");
    directors.find(function(err, directors) {
        if (err) return console.log(err);

        var copy = [];

        for (var i = 0; i < directors.length; i++) {
            copy[i] = {};
            copy[i].full_name = directors[i].full_name;
            copy[i].dob = directors[i].dob;
            if (directors[i].favorite_camera) copy[i].favorite_camera = directors[i].favorite_camera;
            if (directors[i].favorite_movies) copy[i].favorite_movies = directors[i].favorite_movies;
        };


        res.setHeader('Content-Type', 'application/json');
        res.send(copy);
    });
}

function register(req, res) {
    console.log("\x1b[32;1mRegister Request received\x1b[0m");
    var name, dob, url = req.body.url;
    var saveDir = new directors();

    request(url, function(err, resp, html) {
        if (!err) {
            body = JSON.parse(resp.body);
            name = body.full_name;
            dob = body.dob;

            saveDir.full_name = name;
            saveDir.dob = dob;
            saveDir.save(function() {
                res.setHeader('Content-Type', 'application/json');
                res.send("You've registered " + name);
            });
        }
    });

}

function update(req, res) {
    console.log("\x1b[32;1mUpdate Request received\x1b[0m");
    var name = req.body.name,
        find_dir = new RegExp(name);

    directors.find({
        full_name: find_dir
    }, callback);

    function callback(err, director) {
        if (err) return console.log(err);
        var camera = req.body.favorite_camera,
            fave_movies = req.body.favorite_movies,
            dir = director[0];

        if (camera) dir.favorite_camera = camera;
        if (fave_movies) {
            for (var i = 0; i < fave_movies.length; i++) {
                dir.favorite_movies.push(fave_movies[i])
            };
        }
        dir.save(function() {
            res.setHeader('Content-Type', 'application/json');
            res.send("You've updated " + name + "'s profile!");
        });
    }

}

