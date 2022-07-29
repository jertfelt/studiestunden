
  //assigning variables
  const createForm = document.getElementById("createUserForm");
  const createName = document.getElementById("name");
  const createEmail = document.getElementById("email");
  const createPassword = document.getElementById("password");

  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        accountname: createName.value,
        email: createEmail.value,
        password: createPassword.value
      })
    })
    const data = await response.json();
    location.reload();
  })