console.log("connected javascript module----loginlogout.js")

//check if user is logged in:
let loggedIn = false; 
if (sessionStorage.getItem('status') != null)
  {
    let loggedIn = true;
    console.log("user is logged in")
  }
else{
  console.log("not logged in")
}
  


//*logged in 
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

const showLoggedInMenu = async () => {
  if(sessionStorage.getItem('status') != null){
    showUserMenu();
  }
  else {
    showDefaultMenu();
  }
}

showLoggedInMenu();