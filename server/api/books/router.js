const router = require('express').Router();
const controller = require('./controller.js');
const logger=require('../../../applogger.js');

router.get('/', (req, res) => {
  try {
    logger.info(`GET /api/books -- ${JSON.stringify(req.query)}`);
    let  { search } = req.query;
    controller.getBooks({ searchText: search }, ({ books }) => {
      res.status(200).json({ books });
    }, ({ message }) => {
      res.status(500).json({ message, type: 'mongo error' });
    });
  } catch(e) {
    res.status(500).json({ message: e.message, type: 'internal server error' });
  }
});

router.post('/', (req, res) => {
  try {
    logger.info(`POST /api/books -- ${JSON.stringify(req.body)}`);
    let book = req.body;
    controller.addBook({ book }, ({ id, name }) => {
      res.status(200).json({ id, name });
    }, ({ message }) => {
      res.status(500).json({ name: book.name, message, type: 'mongo error' });
    });
  } catch(e) {
    res.status(500).json({ message: e.message, type: 'internal server error' });
  }
});

router.put('/lend', (req, res) => {
  try {
    logger.info(`PUT /api/books/lend -- ${JSON.stringify(req.body)}`);
    let book = req.body;
    controller.updateBook({ book, event: 'lend' }, ({ id, name, reader }) => {
      res.status(200).json({ id, name, reader });
    }, ({ message }) => {
      res.status(500).json({ name: book.name, message, type: 'mongo error' });
    });
  } catch(e) {
    res.status(500).json({ message: e.message, type: 'internal server error' });
  }
});

router.put('/return', (req, res) => {
  try {
    logger.info(`PUT /api/books/return -- ${JSON.stringify(req.body)}`);
    let book = req.body;
    controller.updateBook({ book, event: 'return' }, ({ id, name, reader }) => {
      res.status(200).json({ id, name, reader });
    }, ({ message }) => {
      res.status(500).json({ name: book.name, message, type: 'mongo error' });
    });
  } catch(e) {
    res.status(500).json({ message: e.message, type: 'internal server error' });
  }
});

router.put('/gift', (req, res) => {
  logger.info(`PUT /api/books/gift -- ${JSON.stringify(req.body)}`);
  try {
    let book = req.body;
    controller.updateBook({ book, event: 'gift' }, ({ id, name, reader }) => {
      res.status(200).json({ id, name, reader });
    }, ({ message }) => {
      res.status(500).json({ name: book.name, message, type: 'mongo error' });
    });
  } catch(e) {
    res.status(500).json({ message: e.message, type: 'internal server error' });
  }
});

module.exports = router;
