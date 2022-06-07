/* Server file running KiteSurfing */

// ===== Libraries ===== //
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const fs = require('fs');
const bcrypt = require('bcrypt');
const url = require('url');
const path = require('path');
const bodyparser = require('body-parser'); // helps in extracting the body portion of an incoming request stream
const randtoken = require('rand-token'); // Used to generate random token used for password reset link

// Scripts used by index.js
const scripts = require("./index_scripts.js");



// ===== Constants ===== //
const port = 9001; // Port of server
const app = express(); // Create an express application


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
    host: json_config["dbconfig"]["host"],
    user: json_config["dbconfig"]["user"],
    password: json_config["dbconfig"]["password"],
    database: json_config["dbconfig"]["database"],
    port: parseInt(json_config["dbconfig"]["port"])
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
})); // apply the body-parser middleware to all incoming requests
app.use(express.static(path.join(__dirname, "public"))); // middle ware to serve static files
app.set('view engine', 'ejs'); // View Engine setup
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

// Surfing Lessons Page
app.get('/profile', function(req, res) {
    res.sendFile(__dirname + '/public/profile.html');
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
    if (req.session.value) {
        res.redirect(302, "/");
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
});

// Authenticate 
app.post("/login", function(req, res) {
    // Authenticate User with Provided Credentials
    var email = req.body["email"];
    var password = req.body["password"];
    let email_ok = scripts.validateInput(email, "email");
    let pass_ok  = scripts.validateInput(password, "password");

    // SQL Injection Prevention
    if (!(email_ok && pass_ok)){ // Ensure email and pass are safe SQL input
        res.json({
            status: 'fail'
        });
        return;
    }

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
                req.session.name = rows[0].user_fname;

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
    let email = req.body["email"];
    let fname = req.body["first-name"];
    let lname = req.body["last-name"];
    let phone_number = req.body["phone-number"];
    let password1 = req.body["password1"];
    let password2 = req.body["password2"];
    if (!(scripts.isValidPassword(password1) && scripts.isValidPassword(password2) && (password1 == password2))) {
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
        return;
    }

    // SQL Prevention
    let email_ok = scripts.validateInput(email, "email");
    let fname_ok = scripts.validateInput(fname, "name");
    let lname_ok = scripts.validateInput(lname, "name");
    let phone_ok = scripts.validateInput(phone_number, "phone");

    if (!(email_ok && fname_ok && lname_ok && phone_ok)){
        let reason = "<ul>";
        if (!email_ok){
            reason += "<li>Email does not meet criteron.</li>";
        }
        if (!fname_ok){
            reason += "<li>First name must be alphanumeric.</li>";
        }
        if (!lname_ok){
            reason += "<li>Last name must be alphanumeric.</li>";
        }
        if (!phone_ok){
            reason += "<li>Phone number must be in formmat 123-123-1234.</li>";
        }
        reason += "</ul>";
        res.json({    
          status: 'fail',
          reason: reason
        });
        return;
    }
    

    // Make sure email not attached to existing account
    connection.query('SELECT * FROM Users WHERE user_email=?;', [email], function(err, results, fields) {
        if (err) {
            throw err;
        }

        if (results.length == 0) {
            // Create Account Here
            let salt_rounds = 10;
            const passwordHash = bcrypt.hashSync(password1, salt_rounds);
            const new_user = {
                user_fname: fname,
                user_lname: lname,
                user_email: email,
                user_phone: phone_number,
                submission_date: new Date(),
                user_pass_hash: passwordHash,
                isAdmin : false
            };
            connection.query('INSERT Users SET ?;', new_user, function(err, result) {
                if (err) {
                    throw err;
                }
                res.json({status: 'success'});
            });
        } else { // Email already already used
            res.json({
                status: 'fail',
                reason: 'email-exists'
            });
        }
    });
});

// Reset Password Page - GET
app.get('/resetPassword', function(req, res) {
    // Responding from email
    console.log(req.query.token)

    // SQL Validation
    if (req.query.token && scripts.validateInput(req.query.token, "alpha-numeric")){
        connection.query('SELECT * FROM Users WHERE reset_token=?;', [req.query.token], function(err, results, fields) {
            if (err) throw err;
            console.log(results.length);
            if (results.length == 1) {
                res.render("update-password", {
                    token: req.query.token
                });
            } else {  // Need to get new token (matches existing or doesn't match any existing tokens)
                res.redirect(302, "resetPassword");
            }
        });
    }
    else{// Just loading page
        res.sendFile(__dirname + '/public/resetPassword.html');
    }
});

// Reset Password - POST
app.post("/resetPassword", function(req, res) {
    // Authenticate User with Provided Credentials
    let recovery_email = req.body["email"];
        
    // SQL Validation
    if (!scripts.validateInput(recovery_email, "email")){
        res.redirect(302, "createAccount");
        return;
    }
    

    // Check if email in database, if so, send email to recover password
    connection.query('SELECT user_email FROM Users WHERE user_email=?', [recovery_email], function(err, results, fields) {
        if (err) {
            throw err;
        }
        if (results.length == 1) {
            // SEND EMAIL HERE
            let token = randtoken.generate(20);
            scripts.sendEmail(recovery_email, token);
            connection.query('UPDATE Users SET reset_token=? WHERE user_email=?;',[token, results[0].user_email], function(err, result) {
                if (err) throw err
                res.redirect(302, "login");
            });
        } else {
            // No account attacked to email, create account
            res.redirect(302, "createAccount");
        }
    });
});

// Update Password - POST
app.post("/update-password", function(req, res) {
    // Authenticate User with Provided Credentials
    let new_password1 = req.body["new-password1"];
    let new_password2 = req.body["new-password2"];
    let token = req.body["token"];
    if (!(scripts.isValidPassword(new_password1) && scripts.isValidPassword(new_password2) && (new_password1 == new_password2))) {
        res.redirect(302, "login");
    }

    // SQL Validation
    if (!scripts.validateInput(token, "alpha-numeric")){
        res.redirect(302, "login");
        return;
    }


    let salt_rounds = 10;
    let new_pass_hash= bcrypt.hashSync(new_password1, salt_rounds);

    connection.query('UPDATE Users SET user_pass_hash=? WHERE reset_token=?;',[new_pass_hash, token], function(err, result) {
        if (err) throw err
        // Nullify token 
        connection.query("UPDATE Users SET reset_token=NULL WHERE reset_token=?;",[token], function(err, result){
            if (err) throw err
            res.redirect(302, "login");
        })
    });
});

// Get Data for All Contacts (AllContacts.html)
app.get("/getLoggedInUser", function(req, res) {
  var json_resp = {};
  if (req.session.value) {
      console.log("USER LOGGED IN");
      json_resp["user"]  = req.session.name;
      json_resp["email"] = req.session.email;
  }
  else{
      console.log("USER NOT LOGGED IN");
      json_resp["user"]  = "";
      json_resp["email"] = "";
  }
  // Send JSON to client
  res.json(json_resp);
});


// function to return the 404 message and error to client
app.get('*', function(req, res) {
    // add details
    res.sendStatus(404);
});
