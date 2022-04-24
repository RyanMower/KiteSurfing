/* Server file running KiteSurfing */

// ===== Libraries ===== //
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const fs = require('fs');
const bcrypt = require('bcrypt');
const url = require('url');
const path = require('path');
const bodyparser = require('body-parser');  // helps in extracting the body portion of an incoming request stream


// ===== Constants ===== //
const port = 9001;       // Port of server
const SALT_ROUNDS = 10;  // How many rounds of hashing password
const app = express();   // Create an express application


// ===== Middleware =====
app.use(bodyparser.urlencoded({extended: true})); // apply the body-parser middleware to all incoming requests
app.use(bodyparser.json()); 
//app.use('/client', express.static(__dirname + '/client')); // middle ware to serve static files
app.use(express.static(path.join(__dirname, "public"))); // middle ware to serve static files
app.listen(port, () => console.log('Listening on port', port)); // server listens on port set to value above for incoming connections
console.log("http://localhost:" + port);


// Reads in Express Configs
fs.readFile("./configs/secrets.json", function(err, data){
  if (err) throw err;
  var json_data = JSON.parse(data);
  app.use(session({
    secret: json_data["express_key"],
    saveUninitialized: true,
    //cookie: { maxAge: oneDay },
    resave: false
  }));
});

// ===== Routes ======
// Default landing page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Default landing page
app.get('index.html', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Login page
app.get('login', function(req, res) {
  res.sendFile(__dirname + '/public/login.html');
});



// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  res.sendStatus(404);
});
