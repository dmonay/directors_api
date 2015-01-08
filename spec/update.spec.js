var update = require("../handlers/update.js"),
    request = require('request'),
    md5 = require("crypto-js/md5"),
    crypto = require("crypto-js");

describe("The update handler", function() {
    it("should exist", function() {
        expect(update).toBeDefined();
    });

    function hash(name) {
        var md5_hash = md5(name);
        return md5_hash.toString(crypto.enc.Hex)
    }

    function testEndpoint(body, exp_code, exp_resp, name) {
        request({
                method: 'POST',
                uri: 'http://localhost:1436/update',
                json: true,
                body: body,
                headers: {
                    'Authorization': 'bearer ' + hash(name)
                }
            },
            function(error, response, body) {
                expect(response.statusCode).toEqual(exp_code);
                expect(response.body).toEqual(exp_resp);
                asyncSpecDone();
            }
        );
        asyncSpecWait();
    }

    it("should update a director's favorite movies and camera", function() {
        var body = {
                "name": "Martin Scorsese",
                "favorite_camera": "Leica M7",
                "favorite_movies": ["Casablanca"]
            },
            code = 200,
            resp = "You've updated Martin Scorsese's profile!";

        testEndpoint(body, code, resp, "Martin Scorsese");

    });

    it("should return the proper error message if director's name is not provided", function() {
        var body = {
                "favorite_camera": "Leica M9P"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "Please provide the director's name!"
                }
            };

        testEndpoint(body, code, resp);
    });

    it("should return the proper error message if proper Authorization header is not provided", function() {
        var body = {
                "name": "Martin Scorsese",
                "favorite_camera": "Leica M9P"
            },
            code = 401,
            resp = {
                error: {
                    type: 'Unauthorized',
                    message: "Please provide the proper Authorization header"
                }
            };

        testEndpoint(body, code, resp);
    });

    it("should return the www-authenticate header if proper Authorization header is not provided", function() {
        var body = {
                "name": "Martin Scorsese",
                "favorite_camera": "Leica M9P"
            },
            resp = {
                error: {
                    type: 'Unauthorized',
                    message: "Please provide the proper Authorization header"
                }
            };

        request({
                method: 'POST',
                uri: 'http://localhost:1436/update',
                json: true,
                body: body
            },
            function(error, response, body) {
                expect(response.headers['www-authenticate']).toEqual('Bearer realm=name');
                asyncSpecDone();
            }
        );
        asyncSpecWait();
    });

    it("should return the proper error message if provided director is not registered", function() {
        var body = {
                "name": "Dmitry Pavluk",
                "favorite_movies": "The Grand Budapest Hotel"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "This director is not yet registered!"
                }
            };

        testEndpoint(body, code, resp, "Dmitry Pavluk");
    });

    it("should return the proper error message if neither favorite_camera nor favorite_movies is provided", function() {
        var body = {
                "name": "Martin Scorsese"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "Please provide favorite_camera, favorite_movies, or both."
                }
            };

        testEndpoint(body, code, resp, "Martin Scorsese");
    });

    it("should return the proper error message if favorite_movies is not an array", function() {
        var body = {
                "name": "Martin Scorsese",
                "favorite_movies": "Casablanca"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "favorite_movies must be an array"
                }
            };

        testEndpoint(body, code, resp, "Martin Scorsese");
    });

});