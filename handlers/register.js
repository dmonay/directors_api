var request = require('request');

function register(req, res, directors) {
    console.log("\x1b[32;1mRegister Request received\x1b[0m");
    var name, dob, url = req.body.url;
    var registerDir = new directors();

    request(url, function(err, resp, html) {
        if (!err) {
            body = JSON.parse(resp.body);
            name = body.full_name;
            dob = body.dob;

            registerDir.full_name = name;
            registerDir.dob = dob;
            registerDir.save(function() {
                res.setHeader('Content-Type', 'application/json');
                res.send("You've registered " + name);
            });
        }
    });
}

module.exports = register;