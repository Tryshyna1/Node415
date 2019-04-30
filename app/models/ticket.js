var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TicketSchema   = new Schema({
	description: String
});

module.exports = mongoose.model('Ticket', TicketSchema);
