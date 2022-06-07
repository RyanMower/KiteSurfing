// ===== Globals ======
function responseReceivedHandler() {
    let login_nav = document.getElementById("login-nav");
    let user = this.response["user"];
    if (this.readyState == 4 && this.status === 200) {
        console.log(user);
        login_nav.classList.add("nav-link");
        if (user) {
            login_nav.innerHTML = "Hello, " + user;
            login_nav.href = "profile";
        } else {
            login_nav.innerHTML = "Login";
            login_nav.href = "login";
        }
    }
}

window.onload = (event) =>{
    console.log("LOADED");
    // GET LOGGED IN USER 
    $(document).ready(function() {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load", responseReceivedHandler);
        xhr.open("GET", "getLoggedInUser");
        xhr.send();
    });
};
