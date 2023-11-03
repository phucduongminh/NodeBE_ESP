var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./app/routes/home.router')(app)

require('./app/routes/book.routes')(app)

app.listen(3001)