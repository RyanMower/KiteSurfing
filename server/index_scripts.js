// ===== Globals ======
const DOMAIN = "http://localhost";
const PORT  = 3000;

const nodemailer = require("nodemailer");
const fs = require('fs');

module.exports = {
    isValidPassword: function (password){
        let symbol_used = false;
        let number_used = false;
        let numbers = "0123456789";
        let symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?"
        // Check if password length less than 10
        if (password.length < 10){
            return false;
        }
       
        // Loops over every letter in password
        for (let i = 0; i < password.length; i++){
            if (numbers.includes(password[i])){ // Checks if current letter is a number
                number_used = true;
            }
            if (symbols.includes(password[i])){
                symbol_used = true;
            }
        }
        return (number_used && symbol_used);
    },
    // Send Email 
    // Idea taken from: https://www.tutsmake.com/forgot-reset-password-in-node-js-express-mysql/ 

    sendEmail: function sendEmail(email, token) {
 
        var email = email;
        var token = token;
     
        var raw_data = fs.readFileSync("./configs/secrets.json");
        json_config = JSON.parse(raw_data);
        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: json_config["email"]["email"],   // Your email id
                pass: json_config["email"]["password"] // Your password
            }
        });
        let html ='<p>You requested for reset password, kindly use this <a href="'+DOMAIN+':'+PORT+'/reset-password/' + token + '">link</a> to reset your password</p>';
        var mailOptions = {
            from: 'kitesurft@gmail.com',
            to: email,
            subject: 'Reset Password Link - KiteSurf.com',
            html: html,
        };
     
        mail.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email Success");
            }
        });
    },

    validateInput: function validateInput(input, type){
        let ok = true;
        let re = null;
        switch(type){
            case "email":
                re = new RegExp("^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$");
                break;
            case "name":
                re = new RegExp("^[a-zA-Z0-9]*$");
                break;
            case "alpha-numeric":
                //re = new RegExp("[a-zA-Z0-9]*");
                re = new RegExp("^[a-zA-Z0-9]*$");
                break;
            case "phone":
                re = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
                break;
            case "password":
                return this.isValidPassword(input);
        } 
        (re.exec(input)) ? ok=true : ok=false; // Evaluates Regex
        return ok;
    }
};















