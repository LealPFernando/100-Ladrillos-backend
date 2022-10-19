const router = require('express').Router();
let Brick = require('../models/brick.model');

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

module.exports = router;
