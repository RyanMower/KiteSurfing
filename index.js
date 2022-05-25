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
const app = express();   // Create an express application


// ===== Middleware =====

var json_config;
var connection;
// Reads in Express Configs and Connects to MySQL database
var raw_data = fs.readFileSync("./configs/secrets.json");
json_config = JSON.parse(raw_data);

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

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended: true})); // apply the body-parser middleware to all incoming requests
app.use(express.static(path.join(__dirname, "public"))); // middle ware to serve static files
app.listen(port, () => console.log('Listening on port', port)); // server listens on port set to value above for incoming connections
console.log("http://localhost:" + port);



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

// Logout Page    
app.get("/logout", function(req, res) {    
    if (!req.session.value) {                                                                                                                                            
        console.log("Not logged in, can not logout.");    
    } else {    
        req.session.destroy();    
    }
    res.redirect(302, "/login");
});

// Login Page
app.get('/login', function(req, res) {
    if (req.session.value){
        res.redirect(302, "/");
    }
    else{
        res.sendFile(__dirname + '/public/login.html');
    }
});

// Authenticate 
app.post("/login", function(req, res) {
  // Authenticate User with Provided Credentials
  var email = req.body["email"];
  var password = req.body["password"];
  var sql = "SELECT * FROM Users WHERE user_email=?;";
  connection.query(sql, [email], function(err, rows, fields) {
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
      // Checks username and password
      if (bcrypt.compareSync(password, rows[0].user_pass_hash) &&
        rows[0].user_email == email) {

        // Successful Authentication
        // Create a session for user
        req.session.value = 1;
        req.session.email = email;
        req.session.name  = rows[0].user_fname;

        // Send success message to html for redirection
        res.json({
          status: "success"
        });
      } else { // Invalid Credentials
        res.json({
          status: 'fail'
        });
      }
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

  // Make sure email not attached to existing account
  connection.query('SELECT * FROM Users WHERE user_email=?;', [email], function (err, results, fields) {    
    if (err) {    
      throw err;    
    }    

    if (results.length == 0){
        // Create Account Here
        let salt_rounds = 10;
        const passwordHash = bcrypt.hashSync(password1, salt_rounds);    
        const new_user = {    
            user_fname: fname,
            user_lname: lname,
            user_email: email,
            user_phone: phone_number,
            submission_date: new Date(),
            user_pass_hash: passwordHash    
        };    
        connection.query('INSERT Users SET ?;', new_user, function (err, result) {    
            if (err) {    
                throw err;    
            }    
            res.redirect(302, "login");
        });
    }
    else{// Email already already used
      res.redirect(302, "resetPassword");
    }
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
