var express = require("express");
var cors = require("cors");
const { sequelize } = require("../database/conf");

class Server {
  constructor() {
    //DECLARACION DE VARIABLES
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    this.activityPath = "/api/activity";


    //CONECTAR BASE DE DATOS
    this.conectionDB();

    //MIDDELWARE
    this.middelwares();

    //RUTAS
    this.routes();
  }

  async conectionDB() {
    await sequelize.sync();
  }

  middelwares() {
    //CORS
    this.app.use(cors());
    //LECTURA Y PARCEO DEL BODY
    this.app.use(express.json());
    //DIRECTORIO PUBLICO
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../main/auth/auth.routers"));
    this.app.use(this.userPath, require("../main/user/user.routers"));
    this.app.use(this.activityPath, require("../main/activity/activity.routers"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER IS RUNING FOR PORT  http://127.0.0.1:${this.port}`);
    });
  }
}

module.exports = Server;
