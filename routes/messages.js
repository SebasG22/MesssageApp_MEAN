var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("./../models/user");

var Message = require("./../models/message");


router.get('/', function(req, res, next) {

    Message.find()
        .populate('user', 'firstName')
        .exec(function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Sucess',
                obj: messages
            });
        });

});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status('401').json({
                message: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });

});

router.patch('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        if (!message) {
            return res.status(500).json({
                title: 'No Message Founded',
                error: { message: "Message not found" }
            });
        }

        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not allowed',
                error: { message: "Message can deleted" }
            });
        }

        message.content = req.body.content;
        message.save(function(err, result) {
            res.status(201).json({
                message: 'Updated Message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }

        if (!message) {
            return res.status(500).json({
                title: 'No Message Founded',
                error: { message: "Message not found" }
            });
        }

        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not allowed',
                error: { message: "Message can deleted" }
            });
        }

        message.remove(function(err, result) {
            res.status(201).json({
                message: 'Delete Message',
                obj: result
            });
        });
    });
})

module.exports = router;