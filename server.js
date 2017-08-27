const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const auth = require("./routes/auth");

const app = express();
app.use("/", auth);

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/expresschat', {useMongoClient: true});

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
