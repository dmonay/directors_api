function update(req, res, directors) {
    console.log("\x1b[32;1mUpdate Request received\x1b[0m");
    var name, find_dir = new RegExp(name);
    
    if (req.body.name) {
        name = req.body.name;
        directors.find({
            full_name: find_dir
        }, callback);
    } else {
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send("Please provide the director's name!");
    }

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

module.exports = update;