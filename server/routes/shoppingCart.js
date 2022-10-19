const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');
let Brick = require('../models/brick.model');

router.route('/').get((req, res) => {
  console.log(req.body.user);
  User.findById(mongoose.Types.ObjectId(req.body.user))
    .then((user) => {
      res.json(user.cart);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/checkout').post((req, res) => {
  User.findById(mongoose.Types.ObjectId(req.body.user))
    .then((user) => {
      user.cart.forEach((brick) => {
        Brick.findById(mongoose.Types.ObjectId(brick))
          .then((brick) => {
            brick.shoppingCart = false;
            brick.owner = user._id;
            brick
              .save()
              .then()
              .catch((err) => res.status(400).json('Error: ' + err));
          })
          .catch((err) => res.status(400).json('Error: ' + err));
      });
      user.cart = [];
      user
        .save()
        .then(() => res.json('Checkout'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  const user = req.body.user;
  Brick.findById(mongoose.Types.ObjectId(req.params.id))
    .then((brick) => {
      brick.shoppingCart = true;
      brick
        .save()
        .then()
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  User.findById(mongoose.Types.ObjectId(user))
    .then((user) => {
      user.cart = [...user.cart, req.params.id];

      user
        .save()
        .then(() => res.json('Brick Added to Shopping Cart'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  const user = req.body.user;
  Brick.findById(mongoose.Types.ObjectId(req.params.id))
    .then((brick) => {
      brick.shoppingCart = false;
      brick
        .save()
        .then()
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
  User.findById(mongoose.Types.ObjectId(user))
    .then((user) => {
      user.cart = user.cart.filter((brick) => brick !== req.params.id);

      user
        .save()
        .then(() => res.json('Brick Removed to Shopping Cart'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.json('Error: ' + err));
});

module.exports = router;
