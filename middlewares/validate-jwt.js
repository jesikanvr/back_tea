const { response, request } = require("express");
const { sequelize } = require("../database/conf");
const { PARSE_DB_RESPONSE } = require("../helpers/helper.parse.ds");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  const fuction_db = 'validate_exist_user';
  if (!token) {
    return res.status(401).json({error: "Token not found" });
  } else {
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //lansa un error si no es valido
      const rep = await sequelize.query(
        `select * from ${fuction_db}('${uid}');`
      );
      let user = PARSE_DB_RESPONSE(rep, fuction_db);
      //verificar que el usuario no este borrado o que exista en la db
      if (!user || user.state) {
        return res.json({ status: 401, error: "Invalid token" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.json({
        status: 401,
        error: "Invalid token or malformed json",
      });
    }
  }
};

module.exports = {
  validateJWT,
};
