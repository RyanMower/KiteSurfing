// ===== Globals ======

let user_data = {};

function addUserInfo() {
      let keys = [
          "user_email",
          "user_fname",
          "user_lname",
          "user_phone",
      ]
    let status = this.response["status"];
    if (this.readyState == 4 && this.status === 200) {
        if (status === "success") {
            var data_elms = document.getElementsByClassName("user-data"); 
            for (let i = 0; i < data_elms.length; i++){
                data_elms[i].querySelectorAll("div")[1].innerHTML = this.response[keys[i]];
                user_data[keys[i]] = this.response[keys[i]];
            }
        }
    }
}
function getUserInfo(){
    // GET LOGGED IN USER 
    $(document).ready(function() {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load", addUserInfo);
        xhr.open("GET", "getLoggedInUserInfo");
        xhr.send();
    });
}

function getUserEditTable(){
  var email = user_data["user_email"];
  var fname = user_data["user_fname"];
  var lname = user_data["user_lname"];
  var phone = user_data["user_phone"];

  var html=  `
        <tr id="email" class="user-data">
            <td>
                <div>Email: </div><br>
            </td>
            <td>
                <div>${email}</div>
            </td>
        </tr>
        <tr id="fname" class="user-data">
            <td>
                <div>First Name: </div><br>
            </td>
            <td>
                <input type="text" id="user_fname" name="user_fname" value="${fname}">
                <label for="user_fname"></label><br>
            </td>
        </tr>
        <tr id="lname" class="user-data">
            <td>
                <div>Last Name: </div><br>
            </td>
            <td>
                <input type="text" id="user_lname" name="user_lname" value="${lname}">
                <label for="user_lname"></label><br>
            </td>
        </tr>
        <tr id="phone" class="user-data">
            <td>
                <div>Phone Number: </div><br>
            </td>
            <td>
                <input type="tel" id="email" name="user_phone" value="${phone}">
                <label for="user_phone"></label><br>
            </td>
        </tr>
        <tr id="pass1" class="user-data password-input">
            <td>
                <div>Password: </div><br>
            </td>
            <td>
                <input type="text" id="pass1" name="pass1" placeholder="Leave blank to not update." value="">
                <label for="pass1"></label><br>
            </td>
        </tr>
        <tr id="pass2" class="user-data password-input">
            <td>
                <div>Re-enter Password: </div><br>
            </td>
            <td>
                <input type="text" id="pass2" name="pass2" placeholder="Leave blank to not update." value="">
                <label for="pass2"></label><br>
            </td>
        </tr>
    `;
    return html;

}

function profile_save(){
    console.log("TRYING TO Save Updates");
}

function profile_cancel(){
    console.log("Canceling Edits");
    window.location.reload();
}

function launchEditMode(){
    /*
    var pass_inputs = document.getElementsByClassName("password-input");
    for (let i = 0; i < pass_inputs.length; i++){
        pass_inputs[i].setAttribute("hidden", false);
    }
    */

    var data_elms = document.getElementsByClassName("user-data"); 
    let table = document.getElementById("user-data-table");
    table.innerHTML = getUserEditTable(data_elms);
    var edit_data_elms = document.getElementsByClassName("user-data")
    // Change Edit-Button to save button
    let edit_btn = document.getElementById("edit-btn");
    edit_btn.setAttribute("hidden", true);
    let save_btn = document.getElementById("save-btn");
    save_btn.removeAttribute("hidden");
    save_btn.addEventListener("click", profile_save);
    let cancel_btn = document.getElementById("cancel-save-btn");
    cancel_btn.removeAttribute("hidden");
    cancel_btn.addEventListener("click", profile_cancel);
    let lesson_btn = document.getElementById("lesson-btn");
    lesson_btn.setAttribute("hidden", true);
}

window.onload = (event) =>{
    getUserInfo();
    var edit_btn = document.getElementById("edit-btn");
    edit_btn.addEventListener('click', launchEditMode);
}
