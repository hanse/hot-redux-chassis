const express = require('express');
const router = new express.Router();
const fuzzysearch = require('fuzzysearch');

const terms = Array.from(
  new Set(
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
      .toLowerCase()
      .split(' ')
  )
);

router.get('/', (req, res) => {
  const { q: query } = req.query;
  res.send(terms.filter(term => fuzzysearch(query, term)));
});

module.exports = router;
