const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Logschema = new Schema({
  ticketid: String,
  ticketlog: String,
  createdAt: String,
  updatedAt: String
});

let LogModel = mongoose.model("log", Logschema, "log", true);
module.exports.LogModel = LogModel;
