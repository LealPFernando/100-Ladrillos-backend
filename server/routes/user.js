const router = require('express').Router();
let User = require('../models/user.model');

const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const saltRounds = 9;

router.route('/').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cart = req.body.cart;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const password = hash;
    const newUser = new User({ email, password, cart });
    newUser
      .save()
      .then(() => res.json('User added'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find()
    .where('email')
    .equals(email)
    .then((users) => {
      if (users.length > 0) {
        bcrypt.compare(password, users[0].password, (err, response) => {
          if (response) {
            req.session.user = users;
            res.cookie('user', users[0]._id.toString());
            res.json(users[0]);
          } else {
            res.json({ message: 'No user found' });
          }
        });
      } else {
        res.json({ message: 'No user found' });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
