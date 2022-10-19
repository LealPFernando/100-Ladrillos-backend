const router = require('express').Router();
const { default: mongoose } = require('mongoose');
let Brick = require('../models/brick.model');

router.route('/').get((req, res) => {
  Brick.find()
    .then((bricks) => {
      res.json(
        bricks.filter(
          (brick) => brick.shoppingCart === false && brick.owner === null
        )
      );
    })
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

router.route('/:id').get((req, res) => {
  Brick.findById(mongoose.Types.ObjectId(req.params.id))
    .then((brick) => res.json(brick))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
