const express = require("express");
const app = express();
const cors = require('cors');
require('./config/DB/db.js')
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 
app.use('/main',require('./routes/#0.js'))

app.listen(port, () => {
  console.log(`Server Connected to ${port}`);
});
