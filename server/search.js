const express = require('express');
const router = new express.Router();
const shuffle = require('lodash/shuffle');

const results = [
  'hello', 'hei', 'hallo', 'world', 'this is cool',
  'it works', 'nice job'
];

router.get('/', (req, res) => {
  res.send(shuffle(results).slice(0, Math.floor(Math.random() * results.length)));
});

module.exports = router;
