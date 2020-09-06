const mongoose = require("mongoose");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

exports.signup = (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Internal Server error",
            });
          } else {
            const user = new Users({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                return res.status(201).json({
                  message: "Signed Up successfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
};

exports.signin = (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({
          message: "Email or password is not correct",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              message: "Email or password is not correct",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userID: user[0]._id,
              },
              "CNdata",
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Login Successfull",
              token: token,
            });
          }
          res.status(401).json({
            message: "Login Failed",
          });
        });
      }
    })
    .catch();
};
