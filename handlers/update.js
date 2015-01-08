var md5 = require("crypto-js/md5"),
    crypto = require("crypto-js");

function update(req, res, directors) {
    console.log("\x1b[32;1mUpdate Request received\x1b[0m");
    var name;

    function sendError(type, msg, status) {
        var err_msg = {
            error: {
                type: type,
                message: msg
            }
        };
        res.status(status);
        res.setHeader('Content-Type', 'application/json');
        res.send(err_msg);
    }

    function hash(name) {
        var md5_hash = md5(name);
        return md5_hash.toString(crypto.enc.Hex)
    }

    // Validate the incoming JSON
    if (req.body.name) {
        name = req.body.name;

        if (req.headers.authorization === "bearer " + hash(name)) {
            directors.find({
                full_name: new RegExp(name)
            }, callback);
        } else {
            res.setHeader('WWW-Authenticate', 'Bearer realm=name');
            sendError("Unauthorized", "Please provide the proper Authorization header", 401);
        }
    } else {
        sendError("Malformed syntax", "Please provide the director's name!", 400);
    }

    // update the favorite_camera and favorite_movies attributes
    // of the Director document in mongo, if they are provided
    function callback(err, director) {
        if (err) return console.log(err);
        var dir = director[0]

        if (dir) {
            var camera = req.body.favorite_camera,
                fave_movies = req.body.favorite_movies;

            if (!camera && !fave_movies) {
                sendError("Malformed syntax", "Please provide favorite_camera, favorite_movies, or both.", 400);
                return;
            }

            if (camera) dir.favorite_camera = camera;

            // if favorite_movies is properly formatter, add every provided movie to
            // the favorite_movies of the Director document in mongo
            if (fave_movies && fave_movies.constructor === Array) {
                for (var i = 0; i < fave_movies.length; i++) {
                    dir.favorite_movies.push(fave_movies[i])
                };
            } else {
                sendError("Malformed syntax", "favorite_movies must be an array", 400);
                return;
            }

            dir.save(function() {
                res.setHeader('Content-Type', 'application/json');
                res.send("You've updated " + name + "'s profile!");
            });
        } else {
            sendError("Malformed syntax", "This director is not yet registered!", 400);
        }
    }
}

module.exports = update;