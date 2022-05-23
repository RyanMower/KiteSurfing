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
    }
};














