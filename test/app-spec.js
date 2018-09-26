var request = require("supertest");
var rewire = require('rewire');
var app = rewire('../app');
var routes = rewire('../src/routes/appRoutes');

describe("NodeJS RESTFUL API", function () {
    it("respond server running status", function (done) {
        request(app).get("/").expect(200).end(done);
    });
});

describe("POST /register", function () {
    it("will register new user", function (done) {
        request(routes(app)).post("/register")
            .send({ "username": "ankita@gmail.com", "password": "ankita@123" })
            .expect(200).end(done);
    });
});

describe("POST /login", function () {
    it("will login in to system", function () {
        request(routes(app)).post("/login")
            .send({ "username": "ankita@gmail.com", "password": "ankita@123" })
            .expect(200).end();
    });
});

describe("POST /customer", function () {
    var token = null;
    before(function (done) {
        request(routes(app)).post("/login")
            .send({ "username": "ankita@gmail.com", "password": "ankita@123" })
            .end(function (error, response) {
                token = response.body.token;
                done();
            });
    });

    it("will create new customer", function (done) {
        request(routes(app)).post("/customer")
            .send({
                "firstName": "balaji",
                "lastName": "hambeere",
                "email": "balaji@gmail.com",
                "phone": "9877654"
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'JWT ' + token)
            .expect(200, done);
    });
});

describe("GET /customers", function () {
    it("will get all customers", function (done) {
        request(routes(app)).get("/customers")
            .expect(200, done);
    });
});

