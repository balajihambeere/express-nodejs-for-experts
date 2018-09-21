var customer = require('../controllers/customerController');

var user = require('../controllers/userController')

const { check } = require('express-validator/check');

const routes = (app) => {

    app.route('/customers').get(customer.getCustomers);

    app.route('/customer').post([
        check('firstName').not().isEmpty().withMessage('first name is required'),
        check('lastName').not().isEmpty().withMessage('last name is required'),
        check('email').isEmail().withMessage('must be an email'),
        check('phone').not().isEmpty().withMessage('phone number is required')
    ],
        user.isAuthenticated, customer.createCustomer);

    app.route('/customer/:customerId').get(customer.getCustomerById);

    app.route('/customer/:customerId').put([
        check('firstName').not().isEmpty().withMessage('first name is required'),
        check('lastName').not().isEmpty().withMessage('last name is required'),
        check('email').isEmail().withMessage('must be an email'),
        check('phone').not().isEmpty().withMessage('phone number is required')
    ],
        user.isAuthenticated, customer.updateCustomer);

    app.route('/customer/:customerId').delete(user.isAuthenticated, customer.deleteCustomer);

    app.route('/register').post([
        check('username').isEmail().withMessage('username must be an email'),
        check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long').matches(/\d/).withMessage('must contain a number')
    ], user.register);

    app.route('/login').post(user.login);
}
module.exports = routes;