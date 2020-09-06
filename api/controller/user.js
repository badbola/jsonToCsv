const mongoose = require("mongoose");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
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
