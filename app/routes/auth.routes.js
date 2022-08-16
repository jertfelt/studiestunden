const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post(
    "/users", 
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup,
    controller.signin
  )
  app.post("/users/login", controller.signin);
  app.post("/users/signout", controller.signout);
};
