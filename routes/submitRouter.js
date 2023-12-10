var express = require('express');
var router = express.Router();

// Handle POST requests to /submit
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const keys = req.body.keys;

  console.log('Name:', name);
  console.log('Keys:', keys);

  // Process the data as needed

  res.json({ message: 'Data received and processed successfully!' });
});

module.exports = router;
