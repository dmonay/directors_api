var request = require('request');

function register(req, res, directors) {
    console.log("\x1b[32;1mRegister Request received\x1b[0m");

    function sendError() {
        var err_msg = {
            error: {
                type: "Malformed syntax",
                message: "Please provide the correct url for the director you wish to register!"
            }
        };
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(err_msg);
    }

    // Validate the incoming JSON
    if (req.body.url) {
        var name, dob, url = req.body.url,
            registerDir = new directors();
        request(url, callback);
    } else {
        sendError();
    }

    // Hit the relevant endpoint on the Livestream API, extract the needed info,
    // and create a new Director document in mongo
    function callback(err, resp, html) {
        if (!err && resp.statusCode == 200) {
            body = JSON.parse(resp.body);
            name = body.full_name;
            dob = body.dob;

            registerDir.full_name = name;
            registerDir.dob = dob;
            registerDir.save(function() {
                res.setHeader('Content-Type', 'application/json');
                res.status(201);
                res.send("You've registered " + name);
            });
        } else {
            sendError();
        }
    }
}

module.exports = register;