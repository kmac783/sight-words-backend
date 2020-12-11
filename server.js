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

// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is Mongo not running?"));
db.on("connected", () => console.log("Mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("Mongo disconnected"));