// index.js
const express = require('express');

const cors = require('cors');
require('dotenv').config();

const os = require('os');
const interfaces = os.networkInterfaces();

let addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

const app = express();
app.use(express.json());
app.use(cors());

require('./app/routes/user.routes')(app);
require('./app/routes/brand.routes')(app);

const PORT = process.env.PORT || 3001;
const DOMAIN = process.env.ADDRESS || addresses[0];

app.listen(PORT, DOMAIN, () => {
  console.log(`Server running at port: ${PORT}`);
});