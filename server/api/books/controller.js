const logger=require('../../../applogger.js');
let Book = require('../../models/books.js');

let getBooks = (data, successCB, failureCB) => {
  let { searchText } = data;

  let query = {};

  if(searchText) {
    let p1 = new RegExp(`.*${ searchText || '' }.*`, 'i');
    query.$or = [];
    query.$or.push({ name: p1 });
    query.$or.push({ author: p1 });
    query.$or.push({ publisher: p1 });
    query.$or.push({ isbn: p1 });
    query.$or.push({ id: new RegExp(`${ searchText || '' }.*`) });
  }

  Book.find(query, (err, doc) => {
    try {
      if(!err) {
        successCB({ books: doc });
      } else {
        logger.debug('Error @getBooks: ', err);
        failureCB({ message: 'Mongo Error' });
      }
    } catch(e) {
      failureCB({ message: e.message });
    }
  });
};

let addBook = (data, successCB, failureCB) => {
  let { book } = data;
  let NewBook = new Book(book);
  NewBook.save((err, doc) => {
    if(!err) {
      successCB({ id: book.id, name: book.name });
    } else {
      failureCB({ message: 'Error' });
    }
  });
};

let updateBook = (data, successCB, failureCB) => {
  let { book, event } = data;
  let status = getStatus(event, book.reader);
  Book.findOneAndUpdate({ id: book.id }, { status: status }, (err, doc) => {
    try {
      if(!err) {
        successCB({ id: book.id, name: book.name, reader: book.reader });
      } else {
        logger.debug('Error @updateBook: ' + err);
        failureCB({ message: 'Mongo Error' });
      }
    } catch(e) {
      failureCB({ message: 'This book is not available.' });
    }
  });
};

let getStatus = (event, reader) => {
  switch (event) {
    case 'gift':
      return 'Gifted to ' + reader;
    case 'lend':
      return reader;
    case 'return':
      return 'IN';
    default:
      return;
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook
};
