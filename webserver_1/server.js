'use strict'

// let http = require('http')

// //create a server object:
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.write('<h1>Hello World!</h1>') //write a response to the client
//     res.end() //end the response
//   }).listen(8000) //the server object listens on port 8000

//EXPRESS

// use express framework,
var express=require('express')
var app=express()

// HOME PAGE http://localhost:8000
app.get('/',
    function(req,res){
        res.send("<h1>Hello World</h1>")
    }
)

// LAST LINE OF CODE- START SERVER - ON PORT 8000
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000');
  })

