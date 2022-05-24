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

// Scripts used by index.js
const scripts = require("./index_scripts.js");



// ===== Constants ===== //
const port = 9001;       // Port of server
const SALT_ROUNDS = 10;  // How many rounds of hashing password
const app = express();   // Create an express application


// ===== Middleware =====
app.use(bodyparser.urlencoded({extended: true})); // apply the body-parser middleware to all incoming requests
app.use(bodyparser.json()); 
app.use(express.static(path.join(__dirname, "public"))); // middle ware to serve static files
app.listen(port, () => console.log('Listening on port', port)); // server listens on port set to value above for incoming connections
console.log("http://localhost:" + port);

var json_config;
var connection;
// Reads in Express Configs and Connects to MySQL database
fs.readFile("./configs/secrets.json", function(err, data){
  if (err) throw err;
  json_config = JSON.parse(data);
  app.use(session({
    secret: json_config["express_key"],
    saveUninitialized: true,
    //cookie: { maxAge: oneDay },
    resave: false
  }));

  // Connect to MySQL Database
  connection = mysql.createPool({
    host:     json_config["dbconfig"]["host"],
    user:     json_config["dbconfig"]["user"],
    password: json_config["dbconfig"]["password"],
    database: json_config["dbconfig"]["database"],
    port:     parseInt(json_config["dbconfig"]["port"])
  });
});



// ===== Routes ======
// Default landing page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Default landing page
app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Create Account Page 
app.get('/createAccount', function(req, res) {
  res.sendFile(__dirname + '/public/createAccount.html');
});

// Reset Password Page 
app.get('/resetPassword', function(req, res) {
  res.sendFile(__dirname + '/public/resetPassword.html');
});

// E-Commerce Page 
app.get('/e-commerce', function(req, res) {
  res.sendFile(__dirname + '/public/ecommerce.html');
});

// Surfing Locations Page 
app.get('/surfing-locations', function(req, res) {
  res.sendFile(__dirname + '/public/surfing-locations.html');
});

// Surfing Lessons Page
app.get('/surfing-lessons', function(req, res) {
  res.sendFile(__dirname + '/public/surfing-lessons.html');
});

// Login Page
app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/login.html');
});

// Authenticate 
app.post("/login", function(req, res) {
  // Authenticate User with Provided Credentials
  var email = req.body["email"];
  var password = req.body["password"];
  //var sql = "SELECT * FROM Users WHERE user_email='" + email + "';";
  var sql = "SELECT * FROM Users;"
  connection.query(sql, function(err, rows, fields) {
    // Error Occured
    if (err) {
      res.json({
        status: 'fail'
      });
      return;
    }

    // More than one or no users with provided 'login'
    if (rows.length != 1) {
      console.log("Too many, or too few users.");
      res.json({
        status: 'fail'
      });
    } else {
      res.json({
        status: "success"
      });
      /*
      // Checks username and password
      if (bcrypt.compareSync(password, rows[0].acc_password) &&
        rows[0].acc_login == user) {

        // Successful Authentication
        // Create a session for user
        req.session.value = 1;
        req.session.login = user;

        // Send success message to html for redirection
        res.json({
          status: "success"
        });
      } else { // Invalid Credentials
        res.json({
          status: 'fail'
        });
      }
      */
    }
  });
});


// Create Account 
app.post("/createAccount", function(req, res) {
  // Authenticate User with Provided Credentials
  let email        = req.body["email"];
  let fname        = req.body["first-name"];
  let lname        = req.body["last-name"];
  let phone_number = req.body["phone-number"];
  let password1    = req.body["password1"];
  let password2    = req.body["password2"];
  if (!(scripts.isValidPassword(password1) && scripts.isValidPassword(password2) && (password1 == password2))){
  /*
    let reason;
    if (password1 != password2){
      reason = "Password's don't match."; }
    else{
      reason = "Passwords don't meet criteron.";
    }

    res.json({    
      status: 'fail',
      reason: reason
    });
  */
    res.redirect(302, "login");
  }

  // Create Account Here
  const passwordHash = bcrypt.hashSync(password1, SALT_ROUNDS);    
  
  const new_user = {    
      user_fname: fname,
      user_lname: lname,
      user_email: email,
      user_phone: phone_number,
      submission_date: new Date(),
      user_pass_hash: passwordHash    
  };    
  
  connection.query('INSERT Users SET ?', new_user, function (err, result) {    
      if (err) {    
          throw err;    
      }    
      res.redirect(302, "login");
      console.log("Success!");    
  });

});

// Reset Password 
app.post("/resetPassword", function(req, res) {
  // Authenticate User with Provided Credentials
  let recovery_email = req.body["email"];
  console.log(recovery_email);

  // Check if email in database, if so, send email to recover password
  connection.query('SELECT user_email FROM Users WHERE user_email=?',[recovery_email], function (err, result, fields) {    
      if (err) {    
          throw err;    
      }    
      console.log(result);    
      res.redirect(302, "login");
  });
});

// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
  res.sendStatus(404);
});
