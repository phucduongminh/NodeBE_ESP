// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

require('./app/routes/user.routes')(app);
require('./app/routes/brand.routes')(app);

app.listen(3001);