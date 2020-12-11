const mongoose = require("mongoose"); // require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create sight word schema
const wordSchema = new Schema(
  {
    word: String,
    isChild: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// create word model
const Word = mongoose.model("Word", wordSchema);

//make this exportable to be accessed in `server.js`
module.exports = Word;