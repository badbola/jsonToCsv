const mongoose = require("mongoose");
const Students = require("../models/students");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

exports.addStudent = (req, res) => {
  Students.find({ id: req.body.id })
    .exec()
    .then((student) => {
      if (student.length >= 1) {
        res.status(200).json({
          student: student,
          request: {
            type: "GET",
            url: "http://localhost:8000/student/" + student[0].id,
          },
        });
      } else {
        const decoded = jwt.verify(req.headers.authorization, "CNdata");
        Users.findById(decoded.userID)
          .then((user) => {
            if (!user) {
              return res.status(404).json({
                message: "No such user exists",
              });
            }
            const student = new Students({
              id: req.body.id,
              name: req.body.name,
              detail: req.body.detail,
              score: req.body.score,
              interview: req.body.interview,
              uploaded_by: decoded.userID,
            });
            return student.save();
          })
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Student Added",
              Student: result,
              request: {
                type: "GET",
                url: "http://localhost:8000/student/" + result.id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            error: err;
          });
      }
    });
};

exports.viewAll = (req, res, next) => {
  Students.find()
    .select("id name detail")
    .exec()
    .then((stu) => {
      res.status(200).json({
        count: stu.length,
        list: stu.map((student) => {
          return {
            id: student.id,
            name: student.name,
            detail: student.detail,
            request: {
              type: "GET",
              url: "http://localhost:8000/student/" + student.id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
