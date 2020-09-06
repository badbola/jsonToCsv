const express = require("express");

const port = 8000;

const app = express();

const bodyParser = require("body-parser");

//extended false so that only fetch JSON files
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// tackling CORS error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const err = new Error("Uh Oh! Seems like you are lost");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Encountered ${err} on port${port}`);
  }
  console.log(`Easy running on ${port}`);
});
