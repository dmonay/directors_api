function getAll(req, res, directors) {
    console.log("\x1b[32;1mListAll Request received\x1b[0m");
    directors.find(callback);

    function callback(err, directors) {
        if (err) return console.log(err);
        console.log(typeof(err), typeof(directors));
        var copy = [];

        for (var i = 0; i < directors.length; i++) {
            copy[i] = {};
            copy[i].full_name = directors[i].full_name;
            copy[i].dob = directors[i].dob;
            if (directors[i].favorite_camera) copy[i].favorite_camera = directors[i].favorite_camera;
            copy[i].favorite_movies = directors[i].favorite_movies;
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(copy);
    }
}

module.exports = getAll;