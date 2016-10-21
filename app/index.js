// app/index.js

const express = require('express')
var bodyParser = require("body-parser");
var path = require('path');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
 
app.use((request, response, next) => {  
  //console.log(request.headers)
  request.hdr = request.headers
  next()
})

var chance=0;
app.use((request, response, next) => {  
  chance = Math.random()
  next()
})


// default top level route - return something
app.get('/', (request, response) => {  
  //throw new Error('oops');
  // response.json({
  //   hdr: request.hdr,
  //   chance: chance
  // })
  response.sendFile(path.join(__dirname + '/index.html'));
})

// single entry point into all features supported by this application
// it will read the index.js in the features folder which will
// further define supported routes
app.use(require('./features'));

// Error handler is always the last route
app.use((err, request, response, next) => {  
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(3000)  