"use strict";
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./src/routes/appRoutes');
var jsonwebtoken = require('jsonwebtoken');
var app = new express();

app.use(cors());

const PORT = 3000;

mongoose.Promise = global.Promise;

const options = { useNewUrlParser: true };

//change connection string
mongoose.connect('mongodb://oorja:oorja123@ds161312.mlab.com:61312/hambeeredb', options,
    function (error) {
        if (error) { console.log(error); }
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// //JWT middleware setup
app.use((request, response, next) => {
    if (request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'SIGNIN', (error, user) => {
            if (error) {
                request.user = undefined;
            }
            request.user = user;
            next();
        });
    } else {
        request.user = undefined;
        next();
    }
});

routes(app);

app.get('/', (req, res) =>
    res.send(`Server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);

module.exports = app;