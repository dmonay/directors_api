var register = require("../handlers/register.js"),
    request = require('request');

describe("The /register handler", function() {

    it("should exist", function() {
        expect(register).toBeDefined();
    });

    function testEndpoint(body, exp_code, exp_resp) {
        request({
                method: 'POST',
                uri: 'http://localhost:1436/register',
                json: true,
                body: body
            },
            function(error, response, body) {
                expect(response.statusCode).toEqual(exp_code);
                expect(response.body).toEqual(exp_resp);
                asyncSpecDone();
            }
        );
        asyncSpecWait();
    }

    it("should register a director", function() {
        var body = {
                "url": "https://api.new.livestream.com/accounts/6488855"
            },
            code = 201,
            resp = "You've registered Alblegard Gjoni";

        testEndpoint(body, code, resp);
    });

    it("should return the proper error message if the director is already registered", function() {
        var body = {
                "url": "https://api.new.livestream.com/accounts/6488855"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: 'This director is already registered!'
                }
            };

        testEndpoint(body, code, resp);
    });

    it("should return the proper error message if the provided URL is not correct", function() {
        var body = {
                "url": "https://api.new.livestream.com/accou"
            },
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "Please provide the correct url for the director you wish to register!"
                }
            };

        testEndpoint(body, code, resp);
    });

    it("should return the proper error message if no URL provided", function() {
        var body = {},
            code = 400,
            resp = {
                error: {
                    type: 'Malformed syntax',
                    message: "Please provide a url for the director you wish to register!"
                }
            };

        testEndpoint(body, code, resp);
    });

});