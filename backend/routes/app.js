var express = require('express'); 
var router = express.Router();
var User = require('../model/user');

router.post('/teste', async (req, res, next) => {
    var user = new User({
        firstName: req.body.name,
        lastName: 'Teste', // 'Teste' is hardcoded here, but it should be 'req.body.lastName
        password: 'password', // 'password' is hardcoded here, but it should be 'req.body.password
        email: 'email' // 'email' is hardcoded here, but it should be 'req.body.email
    });
   await user.save();
   res.redirect('/');
});

router.get('/', (req, res, next) => {
    res.render('index');
});


module.exports = router; 

