const express = require('express');

const router = express.Router();
const pdfGenerator = require('../services/pdf-generator');

/* GET pdf url. */
router.post('/generate-pdf', (req, res) => {
  const result = pdfGenerator.generate(req);
  result.then((value) => {
    const pdfLink = value;
    res.send(pdfLink);
    res.end();
  });
});
router.all('*', (req, res) => res.status(404).send('Not Found'));

module.exports = router;
