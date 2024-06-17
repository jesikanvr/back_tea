const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
//const { SEND_MAIL } = require("../../helpers/google-email");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

const GET_ABILITYS = async (req = request, res = response) => {
  const key_function = 'get_abilities';
  //const { page, limit } = req.query;
  try {
    const result = await sequelize.query(
      //`select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
      `select * from ${key_function} ();`
    );
    return res.status(200).json({ abilitys: PARSE_DB_RESPONSE(result, key_function) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

// FUNCIÓN PARA CREAR UNA HABILIDAD
const INSERT_ABILITY = async (req = request, res = response) => {
  const key_function = 'insert_ability';
  const { name } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${name}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ABILITY = async (req = request, res = response) => {
  const { id, name } = req.body;
  console.log('REQUESTT', req);
  try {
    const result = await sequelize.query(
      `select * from update_ability ('${id}', '${name}');`
    );
    return res.status(200).json({message: "Se ha modificado la habilidad correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ABILITY = async (req = request, res = response) => {
  const { id_ab } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_ability ('${id_ab}');`
    );
    return res.status(200).json({message: "Se ha eliminado la habilidad correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ABILITY = async (req = request, res = response) => {
  res.status(200).json({ ability: {} });
};

module.exports = {
  GET_ABILITYS,
  //GET_ABILITY_FOR_ID,
  INSERT_ABILITY,
  UPDATE_ABILITY,
  DELETE_ABILITY,
  POST_ABILITY,
};
