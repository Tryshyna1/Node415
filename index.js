
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var collection = db.getCollection("Tickets");

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://heroku_7mpxzxxd:bit24dom7i6m7ksdmcc3f9o28v@ds331145.mlab.com:31145/heroku_7mpxzxxd", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db(heroku_7mpxzxxd);
  console.log("Database connection ready");


  var port = process.env.PORT || 5000;
  var router = express.Router();

  router.use(function(req, res, next) {
      // do logging
      console.log('Something is happening.');
      next(); // make sure we go to the next routes and don't stop here
  });


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

router.get("/tickets", function(req, res) {
  db.collection("Tickets").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tickets.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
