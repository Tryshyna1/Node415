var express = require('express');
var chalk = require('chalk');
var app = express();


var port = process.env.PORT || 5000;
var router = express.Router();
var ticket = [
 { "id": 89776,
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

},
{
  "id": 876543,
  "created_at": "2017-07-20T22:55:29Z",
  "updated_at": "2017-05-05T10:38:52Z",
  "type": "incident",
  "subject": "Scanner is not working",
  "description": "PC Load Letter? What does that even mean???",
  "priority": "med",
  "status": "open",
  "recipient": "support_example@selu.edu",
  "submitter": "Michael_bolton@selu.edu",
  "assignee_id": 235378,
  "follower_ids": [235378, 235],
  "tags": ["enterprise", "printers"],
},
{
  "id": 455653,
  "created_at": "2017-07-20T22:55:29Z",
  "updated_at": "2017-05-05T10:38:52Z",
  "type": "incident",
  "subject": "MPF is not working",
  "description": "PC Load Letter? What does that even mean???",
  "priority": "med",
  "status": "open",
  "recipient": "support_example@selu.edu",
  "submitter": "Michael_bolton@selu.edu",
  "assignee_id": 235378,
  "follower_ids": [23537909, 235],
  "tags": ["enterprise", "printers"],
}
];
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
//endpoint to list all tickets
router.get('/list', function(req, res) {

res.status(200).send(JSON.stringify(tickets));
});

//endpoint to retrieve tickets by id

router.get('/ticket/:id', function (req, res) {
   //iterate to find the correct object
   for( i = 0; i<myArray.length, i++; )
  {
    if (myArray[i].id == req.params.id)
  { ticket = myArray[i];
  }

  }
  res.status(200).send(JSON.stringify(ticket));

});
//Endpoint to post a new ticket
router.post('/ticket', function(req, res) {
  ticket = {
    id: req.body.id,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    type: req.body.type,
    subject: req.body.subject,
    description: req.body.description,

  };
  ticket.push(ticket);
  res.status(200).send(JSON.stringify(ticket));
});












app.use('/rest', router);
app.listen(port, function() {
console.log('Node is running on port ' + port)
});
