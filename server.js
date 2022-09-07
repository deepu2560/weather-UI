// importing json-server
const jsonServer = require("json-server");

// getting all required routes and middleware from json-server
const server = jsonServer.create();
const router = jsonServer.router("weather.json");
const middlewares = jsonServer.defaults();

// port for running server
const port = process.env.PORT || 8080;

// applying routes and middleware
server.use(middlewares);
server.use(router);

// starting server
server.listen(port);
