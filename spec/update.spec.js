var update = require("../handlers/update.js"),
    request = require('request');

describe("The update handler", function() {
    it("should exist", function() {
        expect(update).toBeDefined();
    });

    it("should update a director's favorite movies and camera", function() {
        var body = {
            "name": "Martin Scorsese",
            "favorite_camera": "Leica M7",
            "favorite_movies": ["Casablanca"]
        };

        request({
                method: 'POST',
                uri: 'http://localhost:1436/update',
                json: true,
                body: body
            },
            function(error, response, body) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toEqual("You've updated Martin Scorsese's profile!");
                asyncSpecDone();
            }
        );
        asyncSpecWait();
    });
});