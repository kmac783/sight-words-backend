///////////////////////////////////
// Dependencies
///////////////////////////////////
const express = require("express");
const mongoose = require("mongoose");
const Word = require("./word.js");

///////////////////////////////////
// Global configuration
///////////////////////////////////
const app = express();
const db = mongoose.connection;

///////////////////////////////////
// Port Information
///////////////////////////////////
const PORT = process.env.PORT || 3000;

///////////////////////////////////
// Database Information
///////////////////////////////////
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + "words";

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connection with Mongo established");
  }
);

///////////////////////////////////
// Success and Error Messages
///////////////////////////////////
db.on("error", (err) => console.log(err.message + " is Mongo running?"));
db.on("connected", () => console.log("Mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("Mongo disconnected"));

///////////////////////////////////
// Seed DB
///////////////////////////////////
// const seedWord = [
//   {
//     word: "she",
//     isChild: "true",
//   },
// ];
// Word.create(seedWord, (error, word) => {
//   if (error) {
//     //if there is an error console log it
//     console.log(error);
//   } else {
//     // else show us the created word
//     console.log(word);
//   }
//   db.close();
// });

///////////////////////////////////
// Get all words from the db
///////////////////////////////////
const allWords = [];
const childWords = [];
const adultWords = [];

Word.find((err, word) => {
    allWords.push(word)
    db.close();
});

 Word.find({isChild: 'true'}, (err, word) => {
    childWords.push(word)
    db.close();
});

Word.find({isChild: 'false'}, (err, word) => {
    adultWords.push(word)
    db.close();
});

///////////////////////////////////
// Routes
///////////////////////////////////
app.get('/words', (req, res) => {
    return res.send(allWords);
  });

app.get('/child', (req, res) => {
    return res.send(childWords);
  });

app.get('/adult', (req, res) => {
    return res.send(adultWords);
  });

///////////////////////////////////
// Listener
///////////////////////////////////
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
