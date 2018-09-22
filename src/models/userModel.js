"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.comparePassword = (requestedPassword, password) => {
    return bcrypt.compareSync(requestedPassword, password);
};

module.exports = UserSchema;
