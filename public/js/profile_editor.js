// ===== Globals ======
function launchUserEditMode() {
    let user = this.response["user"];
    if (this.readyState == 4 && this.status === 200) {
        if (user) {
            var data_elms = document.getElementsByClassName("user-data"); 
            for (let i = 0; i < data_elms.length; i++){
                // TODO: Make data elements editable and have the ability to save
            }
            // TODO: Add account delete button
            // TODO: Add cancel button

        } else {// Should never get here
            console.log("User not logged in.");
        }
    }
}
function getUserInfo(){
    // GET LOGGED IN USER 
    $(document).ready(function() {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load", launchUserEditMode);
        xhr.open("GET", "getLoggedInUser");
        xhr.send();
    });
}

window.onload = (event) =>{
    var edit_btn = document.getElementById("edit-btn");
    edit_btn.addEventListener('click', getUserInfo);
};
