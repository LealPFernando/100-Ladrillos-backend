const router = require('express').Router();
const { default: mongoose } = require('mongoose');
let Brick = require('../models/brick.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  Brick.find()
    .then((bricks) => res.json(bricks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const name = req.body.name;
  const shoppingCart = req.body.shoppingCart;
  const owner = req.body.owner;

  const newBrick = new Brick({
    name,
    shoppingCart,
    owner,
  });
  newBrick
    .save()
    .then(() => res.json('Brick Added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/shopping-cart/:id').post((req, res) => {
  const user = req.body.user;
  Brick.findById(mongoose.Types.ObjectId(req.params.id)).then((brick) => {
    brick.shoppingCart = true;
    brick
      .save()
      .then()
      .catch((err) => res.status(400).json('Error: ' + err));
  });
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

router.route('/shopping-cart/:id').delete((req, res) => {});

router.route('/checkout').post((req, res) => {});

module.exports = router;
