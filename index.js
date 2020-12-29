const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const morgan = require("morgan");
const student = require("./routes/student");
const app = express();

//routes

// connecting to th database

try {
  const uri = process.env.CONNECTION_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });

  // mongoose.connect(
  //   "mongodb+srv://david:d519oI78XE3mCDl3@kingsbackend.m0r6f.mongodb.net/kingsbackend?retryWrites=true&w=majority",
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true,
  //   },
  //   (err) => {
  //     if (err) {
  //       console.log("error", err);
  //     } else {
  //       console.log("connected");
  //     }
  //   }
  // );
} catch (ex) {
  console.log("Error", ex);
}

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api/student", student);

// home page

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}...`));
