var app = require('express')(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    register_logic = require('./handlers/register.js');
    getall_logic = require('./handlers/getall.js');
    update_logic = require('./handlers/update.js');

app.use(bodyParser.json());


// --- Set up mongo -----
var directors, env = process.argv[2];
mongoose.connect('mongodb://localhost/directors_api');
var Schema = mongoose.Schema;
var directorsSchema = new Schema({
    full_name: String,
    dob: String,
    favorite_camera: String,
    favorite_movies: Array
});

// create collection depending on cli argument
if (env === "test") {
	directors = mongoose.model('Test', directorsSchema);
} else if(env === "dev") {
	directors = mongoose.model('Directors', directorsSchema);
} else {
	console.log('\x1b[31;1mPlease enter a third argument!\x1b[0m');
	process.exit(1);
}

// --------------------------


// register handlers and start server
app.get('/getall', getAll);
app.post('/register', register);
app.post('/update', update);
app.listen(1436);
console.log('\x1b[32;1mServer running at http://localhost:1436/\x1b[0m');

function register(req, res) {
	register_logic(req, res, directors);
}

function getAll(req, res) {
	getall_logic(req, res, directors);
}

function update(req, res) {
	update_logic(req, res, directors);
}
