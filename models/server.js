const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";

    // Conectar a BD
    this.connectionBD();

    // middlewares
    this.middlewares();
    // rutas de mi aplicacion
    this.routes();
  }

  async connectionBD() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersRoutePath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
