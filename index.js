
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();




// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 5000; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds331145.mlab.com:31145/heroku_7mpxzxxd'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Bear models lives here
var Ticket     = require('./app/models/ticket');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/tickets')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {

		var ticket = new Ticket();		// create a new instance of the Bear model
		ticket.description = req.body.description;  // set the bears name (comes from the request)

		ticket.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Ticket created!' });
		});


	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Ticket.find(function(err, ticket) {
			if (err)
				res.send(err);

			res.json(tickets);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/tickets/:ticket_id')

	// get the bear with that id
	.get(function(req, res) {
		Ticket.findById(req.params.ticket_id, function(err, ticket) {
			if (err)
				res.send(err);
			res.json(ticket);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Ticket.findById(req.params.ticket_id, function(err, ticket) {

			if (err)
				res.send(err);

			ticket.name = req.body.name;
			ticket.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Ticket updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Ticket.remove({
			_id: req.params.ticket_id
		}, function(err, ticket) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
