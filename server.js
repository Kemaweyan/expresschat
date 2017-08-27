const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost/expresschat', {useMongoClient: true});

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
