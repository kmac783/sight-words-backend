// Dependencies
const mongoose = require("mongoose");
const Word = require("./word.js");

// Global configuration
const mongoURI = "mongodb://localhost:27017/" + "words";
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connection with Mongo established");
    }
  );