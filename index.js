const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dbconfig = require("./config/dbconfig");
const ticketroute = require("./routes/ticketroute");
const app = express();

mongoose.connect(dbconfig.url);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());

// app.use(
//   cors({
//     origin: ["*"],
//     methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
//     credentials: true
//   })
// );

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

ticketroute(app);

app.listen(8080);
console.log("app listening on port 8080");
