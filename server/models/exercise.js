var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Exercise = new Schema({
  name: String,
  description: String,
  tags: [String]
});


mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose.model('exercises', Exercise);
