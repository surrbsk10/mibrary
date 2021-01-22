let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let books = new Schema({
  id: { type: String, unique: true },
  name: String,
  author: String,
  publisher: String,
  illustrator: String,
  arrival: { type: String, default: `${new Date().getTime()}` },
  isbn: String,
  status: { type: String, default: 'IN' },
  comments: String,
  language: String
});

module.exports = mongoose.model('Books', books);
