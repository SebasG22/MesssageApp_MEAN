var express = require('express');
var router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(201).json({
            message: "User Created",
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        if (!user) {
            return res.status(500).json({
                title: 'Loging Failed',
                error: { message: 'Invalid login credentials' }
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(500).json({
                title: 'Loging Failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: "Sucessfully signin",
            token: token,
            userId: user._id
        });

    });
});

module.exports = router;