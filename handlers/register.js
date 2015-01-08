var request = require('request');

function register(req, res, directors) {
    console.log("\x1b[32;1mRegister Request received\x1b[0m");

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
    if (req.body.url) {
        var name, dob, url = req.body.url,
            registerDir = new directors();
        request(url, callback);
    } else {
        sendError("Please provide a url for the director you wish to register!");
    }

    // Hit the relevant endpoint on the Livestream API, extract the needed info,
    // and create a new Director document in mongo
    function callback(err, resp, html) {
        if (!err && resp.statusCode == 200) {
            body = JSON.parse(resp.body);
            name = body.full_name;
            dob = body.dob;

            alreadyRegistered(name, function(resp) {
                if (resp) {
                    sendError("This director is already registered!");
                } else {
                    registerDir.full_name = name;
                    registerDir.dob = dob;
                    registerDir.save(function() {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(201);
                        res.send("You've registered " + name);
                    });
                }
            });
        } else {
            sendError("Please provide the correct url for the director you wish to register!");
        }
    }

    function alreadyRegistered(name, callback) {
        directors.find({
            full_name: name
        }, checkIfReg);

        function checkIfReg(err, director) {
            if (err) return console.log(err);
            return director[0] ? callback(true) : callback(false);
        }
    }
}

module.exports = register;