// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

require('./app/routes/user.routes')(app);
require('./app/routes/brand.routes')(app);

const PORT = process.env.PORT || 3001;
const DOMAIN = process.env.ADDRESS || localhost;

app.listen(PORT, DOMAIN, () => {
  console.log(`Server running at port: ${PORT}`);
});