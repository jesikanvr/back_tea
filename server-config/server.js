var express = require("express");
var cors = require("cors");
const { sequelize } = require("../database/conf");

class Server {
  constructor() {
    //DECLARACION DE VARIABLES
    this.APP = express();
    this.PORT = process.env.PORT;
    this.AUTH_PATH = "/api/auth";
    this.UPLOAD_PATH = "/api/upload";
    this.ABILITY_PATH = "/api/ability";
    this.OBJETIVE_PATH = "/api/objetive";
    this.ACTIVITY_PATH = "/api/activity";
    this.HOMEWORK_PATH = "/api/homework";
    this.ORIENTATION_PATH = "/api/orientation";

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
    this.APP.use(cors());
    //LECTURA Y PARCEO DEL BODY
    this.APP.use(express.json());
    //DIRECTORIO PUBLICO
    this.APP.use(express.static("public"));
  }

  routes() {
    this.APP.use(this.AUTH_PATH, require("../main/auth/auth.routers"));
    this.APP.use(this.ABILITY_PATH, require("../main/ability/ability.routers"));
    this.APP.use(this.OBJETIVE_PATH, require("../main/objective/objetive.routers"));
    this.APP.use(this.ACTIVITY_PATH, require("../main/activity/activity.routers"));
    this.APP.use(this.HOMEWORK_PATH, require("../main/homework/homework.routers"));
    this.APP.use(this.ORIENTATION_PATH, require("../main/orientation/orientation.routers"));
    this.APP.use(this.UPLOAD_PATH, require("../main/storage/storage.routers"));
  }

  listen() {
    this.APP.listen(this.PORT, () => {
      console.log(`SERVER IS RUNING FOR PORT  http://127.0.0.1:${this.PORT}`);
    });
  }
}

module.exports = Server;
