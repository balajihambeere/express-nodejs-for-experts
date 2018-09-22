"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    phone: {
        type: Number,
        required: 'Enter a phone number'
    },
    email: {
        type: String,
        required: 'Enter a email address'
    }
});

module.exports = CustomerSchema;