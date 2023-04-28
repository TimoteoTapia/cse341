const routes = require("express").Router();
const lesson1Controllers = require("../controllers/lesson1");

routes.get("/", lesson1Controllers.joseRouter);
routes.get("/jenny", lesson1Controllers.jennyRouter);
routes.get("/tere", lesson1Controllers.tereRouter);

module.exports = routes;
