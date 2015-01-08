var register = require("../handlers/register.js"),
    request = require('request');

describe("The register handler", function() {
    it("should exist", function() {
        expect(register).toBeDefined();
    });

    it("should register a director", function() {
        var body = {
            "url": "https://api.new.livestream.com/accounts/6488855"
        };

        request({
                method: 'POST',
                uri: 'http://localhost:1436/register',
                json: true,
                body: body
            },
            function(error, response, body) {
                expect(response.statusCode).toEqual(201);
                expect(response.body).toEqual("You've registered Alblegard Gjoni");
                asyncSpecDone();
            }
        );
        asyncSpecWait();
    });

});