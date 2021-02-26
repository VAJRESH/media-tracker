const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// login
router.get('/login', (req, res) => {
    User.findOne({ email: req.query.email})
    .then(user => {
        if(!(user)){
            res.json("Not Registered");
        }
        res.json(user)
    })
    .catch(err => res.json({ message: err }));
})

// login
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user){ 
                return res.json({ message: 'Not Registered!' }); 
            } else{ 
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            res.json({
                                message: 'Login Success',
                                isLoggedIn: true
                            })
                        } else{
                            res.json({ message: 'Incorrect Password!' }) 
                        }
                    })
                    .catch(err => res.json({ err: err }));
            }
        }).catch(err => res.json({ err: err }));
})

// register
router.route('/register').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).exec((err, user) => {
        if(err) throw err;
        if(user){
            return res.json({ message: 'Already Registered!' });
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(() => {
                            res.json({ 
                                message: 'Registered And Logged In Successfully',
                                isLoggedIn: true 
                            })
                        })
                        .catch(err => res.json({ err: err }));
                    });
                });
            }
        })
})

module.exports = router;