let express = require('express');
let app = express();

let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./src/routes/home.router')(app)

require('./src/routes/remote.routes')(app)

app.listen(3001)