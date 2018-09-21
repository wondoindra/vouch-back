const TicketModel = require("../models/ticketissue").TicketModel;
const LogModel = require("../models/ticketlog").LogModel;
module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Ticket API");
  });

  app.get("/tickets", (req, res) => {
    TicketModel.find({}, (err, ticket) => {
      if (err) return res.send(err);
      res.json(ticket);
    }).sort("-updatedAt");
  });

  app.get("/tickets/:status", (req, res) => {
    TicketModel.find(
      {
        status: req.params.status
      },
      (err, ticket) => {
        if (ticket) {
          res.json(ticket);
        } else {
          res.status(400).send("Invalid ticket status");
        }
      }
    ).sort("-updatedAt");
  });

  app.get("/logs", (req, res) => {
    LogModel.find({}, (err, log) => {
      if (err) return res.send(err);
      res.json(log);
    }).sort("-createdAt");
  });

  app.get("/logs/:ticketid", (req, res) => {
    LogModel.find(
      {
        ticketid: req.params.ticketid
      },
      (err, log) => {
        if (log) {
          res.json(log);
        } else {
          res.status(400).send("No logs found");
        }
      }
    ).sort("-createdAt");
  });

  app.post("/ticket/add", (req, res) => {
    TicketModel.findOne({ name: req.body.name }, (err, ticket) => {
      if (!ticket) {
        const date = new Date();
        const newdate = `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}`;
        const ticket = new TicketModel();
        const log = new LogModel();
        ticket.name = req.body.name;
        log.ticketlog = req.body.ticketlog;
        ticket.status = "Open";
        ticket.createdAt = date;
        log.createdAt = date;
        ticket.updatedAt = date;
        log.updatedAt = newdate;

        if (ticket.name) {
          ticket.save((err, ticket) => {
            if (err) return res.send(err);
            log.ticketid = ticket.id;
            log.save((err, log) => {
              if (err) return res.send(err);
              res.json({
                status: "Ticket added",
                ticket,
                log
              });
            });
          });
        } else {
          res.status(400).send("Please fill ticket name");
        }
      } else {
        res.status(400).send(ticket.id);
      }
    });
  });

  app.post("/ticket/delete", (req, res) => {
    TicketModel.findById(req.body.id, (err, ticket) => {
      console.log(ticket);
      if (ticket) {
        ticket.remove(err => {
          if (err) return res.send(err);
          res.json({ status: "Ticket deleted" });
        });
      } else {
        res.status(400).send("Invalid ticket id");
      }
    });
  });

  app.put("/ticket/update", (req, res) => {
    TicketModel.findOne({ name: req.body.name }, (err, ticket) => {
      if (ticket) {
        const date = new Date();
        const newdate = `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}`;
        ticket.status = req.body.status;
        ticket.updatedAt = date;
        ticket.save((err, ticket) => {
          const log = new LogModel();
          log.ticketid = ticket.id;
          log.ticketlog = req.body.ticketlog;
          log.createdAt = date;
          log.updatedAt = newdate;
          log.save((err, log) => {
            res.json({
              status: "Ticket updated",
              ticket,
              log
            });
          });
        });
      } else {
        res.status(400).send("Invalid ticket name");
      }
    });
  });
};
