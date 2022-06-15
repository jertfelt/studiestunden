//*--------Declaring:

//navigation mobile
let navVisibleWhenMobile = document.getElementById("siteNavMobile")
let openNavMobile = document.getElementById("openDropdownNav");
let closeNavMobile = document.getElementById("closeDropdownNav");
let navMobileMenu = document.getElementById("dropdownMenu");

//navigation desktop
let desktopNav = document.getElementById("desktopNav");

//navigation logged in/not logged in
let notLoggedInOptions = document.querySelectorAll(".notloggedin");
let loggedInOptions = document.querySelectorAll(".loggedin");
console.log(notLoggedInOptions);

//logout function button
let logoutButtons = document.querySelectorAll(".logoutbutton");
console.log(logoutButt);
logoutButtons.forEach(element => {
  element.addEventListener("click", () => {
    console.log("clicked")
  })
});

//*-----------functions
openNavMobile.addEventListener("click", () => {
  if(navMobileMenu.classList.contains("hidden")){
    navMobileMenu.classList.remove("hidden");
    closeNavMobile.classList.remove("hidden");
    openNavMobile.classList.add("hidden");
  }
})

closeNavMobile.addEventListener("click", () => {
  navMobileMenu.classList.add("hidden");
  closeNavMobile.classList.add("hidden");
})