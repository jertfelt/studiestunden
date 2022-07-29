

  //assigning variables
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("usernameLogin");
  const loginPassword = document.getElementById("passwordLogin");

  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      })
    })
    .then(() => {
        checkinguserStatus();
      window.location.assign("../detaljer")
    })
    .catch((error) => {
      alert("Fel lösenord eller användarnamn!")
      console.log(error);
    })
  })
