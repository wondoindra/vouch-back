const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dbconfig = require("./config/dbconfig");
const ticketroute = require("./routes/ticketroute");
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(dbconfig.url);

app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

ticketroute(app);

app.listen(PORT);
console.log(`app listening on port ${PORT}`);
