const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticketschema = new Schema({
  name: String,
  status: String,
  logs: String,
  createdAt: String,
  updatedAt: String
});

let TicketModel = mongoose.model("ticket", Ticketschema, "ticket", true);
module.exports.TicketModel = TicketModel;
