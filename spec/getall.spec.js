var getall = require("../handlers/getall.js"),
    request = require('request');

describe("The getall handler", function() {

    it("should exist", function() {
        expect(getall).toBeDefined();
    });

    it("should find all entries in mongo", function() {

        // set up mocks
        var directors = {},
            req = {},
            res = {};
        directors.find = function() {};

        // set up spies
        spyOn(directors, 'find');

        getall(req, res, directors);
        expect(directors.find).toHaveBeenCalled();
    });

    it("should respond with all of the directors' profiles", function(done) {

        var mock_resp = [{
            "full_name": "Martin Scorsese",
            "dob": "1942-11-17T00:00:00.000Z",
            "favorite_camera": "Leica M9",
            "favorite_movies": ["Gladiator", "Argo"]
        }, {
            "full_name": "James Cameron",
            "dob": "1954-08-16T00:00:00.000Z",
            "favorite_camera": "RED Epic",
            "favorite_movies": []
        }, {
            "full_name": "Steven Spielberg",
            "dob": "1946-12-18T00:00:00.000Z",
            "favorite_movies": ["Titanic"]
        }, {
            "full_name": "John Simmons",
            "dob": "1967-07-28T00:00:00.000Z",
            "favorite_movies": []
        }];

        request("http://localhost:1436/getall", function(error, response, body) {
        	// request returns a string representation of the object,
        	// so we convert it back to an object
            var body_objectified = JSON.parse(body);
            expect(body_objectified).toEqual(mock_resp);
            done();
        });
    });



});