"use strict";
var mongoose = require('mongoose');
var CustomerSchema = require('../models/customerModel');

const Customer = mongoose.model('Customer', CustomerSchema);

var validationResult = require('express-validator/check');

const createCustomer = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    let customer = new Customer(request.body);
    customer.save((error, customer) => {
        if (error) {
            response.send(error);
        }
        response.json(customer);
    });
};

const getCustomers = (request, response) => {
    Customer.find({}, (error, customer) => {
        if (error) {
            response.send(error);
        }
        response.json(customer);
    });
};

const getCustomerById = (request, response) => {
    Customer.findById({ _id: request.params.customerId }, (error, customer) => {
        if (error) {
            response.send(error);
        }
        response.json(customer);
    });
};

const updateCustomer = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    Customer.findOneAndUpdate({ _id: request.params.customerId }, request.body, { new: true },
        (error, customer) => {
            if (error) {
                response.send(error);
            }
            response.json(customer);
        });
};

const deleteCustomer = (request, response) => {
    Customer.deleteOne({ _id: request.params.customerId }, (error, customer) => {
        if (error) {
            response.send(error);
        }
        response.json(customer);
    });
};

module.exports = {
    getCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
