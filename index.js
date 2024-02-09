require('dotenv').config();

const Server  = require('./server-config/server');


const SERVER = new Server() 

SERVER.listen()
