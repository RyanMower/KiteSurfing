
function isValidPassword(password){
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
}

function displayPasswordRequirements(){
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    let password1_okay = isValidPassword(password1);
    let password2_okay = isValidPassword(password2);
    //console.log("Pass1: " + password1_okay);
    //console.log("Pass1: " + password2_okay);
    console.log("Pass2: " + password2);
    let info_alert_password = document.getElementById("info-alert-password");

    if (password1_okay && password2_okay && (password1 == password2)){
        info_alert_password.hidden=true;
    }
    else{
        info_alert_password.hidden=false;
    }
}
window.addEventListener('DOMContentLoaded', event => {
    document.getElementById("password1").addEventListener("keyup", displayPasswordRequirements);
    document.getElementById("password2").addEventListener("keyup", displayPasswordRequirements);
});
    














