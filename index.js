var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require ("fs");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/listTickets', function(req, res) {
    fs.readFile("tickets.json", function(err, data) {
      console.log( data );
      res.end( data );
    });
});

var ticket = {
  "ticket4": {
  "created_at": "2017-07-20T22:55:29Z",
  "updated_at": "2017-05-05T10:38:52Z",
  "type": "incident",
  "subject": "Printer is not working",
  "description": "PC Load Letter? What does that even mean???",
  "priority": "med",
  "status": "open",
  "recipient": "support_example@selu.edu",
  "submitter": "Michael_bolton@selu.edu",
  "assignee_id": 235378,
  "follower_ids": [235378, 235],
  "tags": ["enterprise", "printers"],
   "id": 6
   }
}

router.post('/addTicket', function (req, res) {
   // First read existing users.
   fs.readFile("tickets.json", function (err, data) {
      data = JSON.parse( data );
      data["ticket4"] = ticket["ticket4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
});

router.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile("tickets.json", function (err, data) {
      var tickets = JSON.parse( data );
      var ticket = tickets["ticket" + req.params.id]
      console.log( ticket );
      res.end( JSON.stringify(ticket));
   });
});


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
