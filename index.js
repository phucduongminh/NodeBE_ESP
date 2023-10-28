var express = require('express');
var app = express();

/*app.get("/",function(req,res){
    //res.send("Welcome!")
    res.sendFile(__dirname + "/index.html")
})

app.get("/json",function(req,res){
    var data = [
        {
            "id":1,
            "name":"Demo",
        }
    ]
    res.send({book:data})
})*/

var homeRouter = require('./app/routes/home.router')

var bookRouter = require('./app/routes/book.routes')

app.use('/',homeRouter)
app.use('/',bookRouter)

app.listen(3001)