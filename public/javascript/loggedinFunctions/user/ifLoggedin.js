// console.log("ifloggedin.js is connected")

//*--------MENUES AND OPTIONS IF lOGGED IN OR NOT LOGGED IN------------------
let notLoggedInOptions = document.querySelectorAll(".notloggedin");
let loggedInOptions = document.querySelectorAll(".loggedin");

//*logout function button
let logoutButtons = document.querySelectorAll(".logoutbutton");
logoutButtons.forEach(element => {
  element.addEventListener("click", () => {
    console.log("clicked")
  })
});

const showUserMenu = () => {
  loggedInOptions.forEach(element => {
    if (element.classList.contains("hidden")){
      element.classList.remove("hidden")
    }
  })

  notLoggedInOptions.forEach(element => {
  if (element.classList.contains("hidden") != true){
    element.classList.add("hidden")
  }
  })
}

//?-------Not logged in menu:
const showDefaultMenu = () => {
  notLoggedInOptions.forEach(element => {
    if (element.classList.contains("hidden")){
      element.classList.remove("hidden")
    }
  })

  loggedInOptions.forEach(element => {
  if (element.classList.contains("hidden") != true){
    element.classList.add("hidden")
  }
  })

}


//*--------CHECK IF LOGGED IN------------------

const checkinguserStatus = () => {

let data = sessionStorage.getItem("loggedin");

if (data === "true") {
  console.log(data + " is true")
  showUserMenu();
}
else {
  console.log("not logged in")
  showDefaultMenu();
}

  }

  checkinguserStatus();
  
