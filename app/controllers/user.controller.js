exports.allAccess = (req, res) => {
  res.status(200).render("index", { title: 'Studiestunden'})
};
exports.homepage = (req, res) => {
  res.status(200).render("index", { title: 'Studiestunden'})
}

exports.login = (req, res) => {
  res.status(200).render("../views/userInterface/login.ejs",{ title: "Logga in"})
}

exports.register = (req, res) => {
  res.status(200).render("../views/userInterface/createUser",{ title: "Registrera dig!"})
}

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.profil = (req, res) => {
  res.status(200).render("../views/userInterface/details",{ title: "Din profil"})
};

exports.taskBoard = (req, res) => {
  res.status(200).send("Task Content.");
};

