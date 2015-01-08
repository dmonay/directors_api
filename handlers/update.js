function update(req, res, directors) {
    console.log("\x1b[32;1mUpdate Request received\x1b[0m");
    var name, find_dir = new RegExp(name);

    function sendError(msg) {
        var err_msg = {
            error: {
                type: "Malformed syntax",
                message: msg
            }
        };
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(err_msg);
    }

    // Validate the incoming JSON
    if (req.body.name) {
        name = req.body.name;
        directors.find({
            full_name: find_dir
        }, callback);
    } else {
        sendError("Please provide the director's name!");
    }

    // update the favorite_camera and favorite_movies attributes
    // of the Director document in mongo, if they are provided
    function callback(err, director) {
        if (err) return console.log(err);
        var camera = req.body.favorite_camera,
            fave_movies = req.body.favorite_movies,
            dir = director[0];

        if (!camera && !fave_movies) {
            sendError("Please provide favorite_camera, favorite_movies, or both.");
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
            sendError("favorite_movies must be an array");
            return;
        }

        dir.save(function() {
            res.setHeader('Content-Type', 'application/json');
            res.send("You've updated " + name + "'s profile!");
        });
    }
}

module.exports = update;