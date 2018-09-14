const TicketModel = require("../models/ticketissue").TicketModel;
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
    );
  });

  app.post("/ticket/add", (req, res) => {
    TicketModel.findOne({ name: req.body.name }, (err, ticket) => {
      if (!ticket) {
        const ticket = new TicketModel();
        ticket.name = req.body.name;
        ticket.status = "Open";
        ticket.logs = req.body.logs;
        ticket.createdAt = new Date();
        ticket.updatedAt = new Date();

        if (ticket.name) {
          ticket.save((err, ticket) => {
            if (err) return res.send(err);
            res.json({
              status: "Ticket added",
              data: ticket
            });
          });
        } else {
          res.status(400).send("Please fill ticket name");
        }
      } else {
        res.status(400).send("This ticket name is taken");
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
        ticket.status = req.body.status;
        ticket.logs = req.body.logs;
        ticket.updatedAt = new Date();
        ticket.save((err, ticket) => {
          res.json({
            status: "Ticket updated",
            data: ticket
          });
        });
      } else {
        res.status(400).send("Invalid ticket name");
      }
    });
  });
};
