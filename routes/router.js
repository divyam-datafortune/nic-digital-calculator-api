var express = require('express');
var router = express.Router();
const pdfGenerator = require('../services/pdf-generator');

/* GET pdf url. */
router.post('/generate-pdf', function (req, res, next) {
  const result = pdfGenerator.generate(req);
  result.then(value => {
    const pdfLink = value
    res.send(pdfLink)
    res.end();
  });
});
router.all('*', (req, res) => res.status(404).send('Not Found'));

module.exports = router;
