let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let logs = new Schema({
  bid: Number,
  name: String,
  author: String,
  lent: Number,
  returned: Number,
  reader: String
});

module.exports = mongoose.model('Logs', logs);
