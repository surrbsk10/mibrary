const router = require('express').Router();

router.use('/books', require('./books'));
router.use('/logs', require('./logs'));

module.exports = router;
