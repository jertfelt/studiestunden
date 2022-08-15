const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/", controller.homepage);
  app.get('/start', controller.allAccess);
  app.get("/login", controller.login)
  app.get("/registrera", controller.register)
  app.get("/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};

