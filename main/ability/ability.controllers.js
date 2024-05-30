const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ABILITY = async (req = request, res = response) => {
  const { page, limit } = req.query;
  try {
    const result = await sequelize.query(
      `select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
    );
    return res.status(200).json({ ability: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const GET_ABILITY_FOR_ID = async (req = request, res = response) => {
  const { id_ab } = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_ability_for_id_json ('${id_ab}');`
    );
    return res.status(200).json({ ability: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

// FUNCIÓN PARA CREAR UNA HABILIDAD
const INSERT_ABILITY = async (req = request, res = response) => {
  const { name_ability } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_ability ('${name_ability}');`
    );
    return res.status(200).json({message: "Se ha creado la habilidad correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ABILITY = async (req = request, res = response) => {
  const { id_ab, name_ability } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_ability ('${id_ab}', '${name_ability}');`
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
  GET_ABILITY,
  GET_ABILITY_FOR_ID,
  INSERT_ABILITY,
  UPDATE_ABILITY,
  DELETE_ABILITY,
  POST_ABILITY,
};
