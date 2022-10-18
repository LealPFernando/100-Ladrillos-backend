const router = require('express').Router();
let User = require('../models/user.model');

const bcrypt = require('bcrypt');
const { model } = require('mongoose');
const saltRounds = 9;

router.route('/').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const password = hash;
    const newUser = new User({ email, password });
    newUser
      .save()
      .then(() => res.json('User added'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

module.exports = router;
