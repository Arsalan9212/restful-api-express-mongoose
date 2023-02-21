const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');

//SIGNUP WITH BCRYPT PASSWORD
router.post('/signup', async (req, res) => {
  try {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({ message: 'email already exist' });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });
              data.save().then((result) => {
                res.status(200).json({ message: result });
              });
            }
          });
        }
      });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

//SIGNIN
router.post('/signin', async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({ message: 'email not exist' });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          res.status(401).json({ msg: 'password matching fail' });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              email: user[0].email,
            },
            'this is dummy text',
            { expiresIn: '24h' }
          );
          res.status(200).json({
            name: user[0].name,
            email: user[0].email,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
