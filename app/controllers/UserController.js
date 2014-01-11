var user = require('../models/UserModel');

module.exports.controller = function(app) {

    //login
    app.get('/users/login(.html)?', function(req, res) {
        res.render('users/login');
    });


    //login
    app.post('/users/login(.html)?', function(req, res) {
        user.findOne({ $or: [{ username: req.body.username}, {email: req.body.username}] }, function(err, result) {
            if(result && result.hashed_password == req.body.password){
                req.session.user = result;
                res.redirect('users/'+ result.username);
            }
        })
    });


    app.get('/(index)?.?(:format)?', function(req, res) {
        res.render('index');
        // res.format({
        //     xml: function() {
        //         res.send('<a>text<a/>');
        //     },

        //     html: function() {
        //         res.send('html');
        //     },

        //     json: function() {
        //         res.send({
        //             message: 'json'
        //         });
        //     }
        // });
    });

    //index
    app.get('/users(.)?(:format)?', function(req, res) {
        user.find({}, function(err, result) {
            res.format({
                html: function() {
                    res.render('users/index', {
                        users: result
                    });
                },

                json: function() {
                    res.send(result);
                }
            });
        })
    });

    //new
    app.get('/users/new', function(req, res) {
        res.render('users/register');
    });

    //create
    app.post('/users', function(req, res) {
        var user = new User(req.body);
        user.jobs.push({
            job: req.body.job
        });
        user.addresses.push({
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            district: req.body.district,

        });
        user.save(function() {
            res.redirect('/users/' + user._id);
        });
    });

    //show
    app.get('/users/:id', function(req, res) {
        user.findOne({
            _id: req.session._id
        }, function(err, result) {
            console.log(req.session);
            console.log(result);
            res.render('users/info', {
                user: result
            });
        })
    });

    //edit
    app.get('/users/:id/edit', function(req, res) {
        user.findOne({
            _id: req.params.id
        }, function(err, result) {
            res.render('users/edit', {
                user: result
            });
        })
    });

    //update
    app.post('/users/:id', function(req, res) {
        var user = new User(req.body);
        user.update(function() {
            res.redirect('/users/' + user._id);
        });
    });

    //destroy
    app.del('/users/:id', function(req, res) {
        var user = new User(req.body);
        user.remove(function() {
            res.redirect('/users');
        });
    });

};

// GET     /                 ->  index
// GET     /new              ->  new
// POST    /                 ->  create
// GET     /:id              ->  show
// GET     /:id/edit         ->  edit
// PUT     /:id              ->  update
// DELETE  /:id              ->  destroy
