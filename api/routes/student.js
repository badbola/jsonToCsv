const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const studentController = require("../controller/student");

router.post("/add", checkAuth, studentController.addStudent);
router.get("/list", checkAuth, studentController.viewAll);

module.exports = router;
