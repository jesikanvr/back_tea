const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

const GET_ABILITYS = async (req = request, res = response) => {
  const key_function = 'get_abilities';
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
  const key_function = 'update_ability';
  const { id, name } = req.body;
  let ability = {}
  try {
    ability['id'] = id;
    ability['name'] = name;
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(ability)}');`
    );
    return res
      .status(200)
      .json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ABILITY = async (req = request, res = response) => {
  const key_function = 'delete_abilities';
  const { abilities = [] } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(abilities)}');`
    );
    return res
      .status(200)
      .json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

module.exports = {
  GET_ABILITYS,
  INSERT_ABILITY,
  UPDATE_ABILITY,
  DELETE_ABILITY,
};
