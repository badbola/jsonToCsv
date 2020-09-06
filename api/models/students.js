const mongoose = require("mongoose");
//schema for array reports
const detailSchema = mongoose.Schema({
  college: String,
  place: String,
  status: String,
});
const scoreSchema = mongoose.Schema({
  dsa: Number,
  web: Number,
  react: Number,
});
const interviewSchema = mongoose.Schema({
  compnay: String,
  date: Date,
  result: String,
});
//schema for patient
const studentSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    detail: [detailSchema],
    score: [scoreSchema],
    interview: [interviewSchema],
    uploaded_by: {
      type: String,
      ref: "Users",
    },
  },
  {
    timestapms: true,
  }
);

module.exports = mongoose.model("students", studentSchema);
// module.exports = mongoose.model("detail", detailSchema);
// module.exports = mongoose.model("score", scoreSchema);
// module.exports = mongoose.model("interview", interviewSchema);
