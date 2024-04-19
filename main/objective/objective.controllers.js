const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");
const { body } = require("express-validator");
//const { GET_ABILITY } = require("../../ability.controllers");

const POST_OBJETIVE_FOR_ID  = async (req = request, res = response) => {
  const { id_obj} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from get_objective_for_id_json ('${id_obj}');`
    );
    return res.status(200).json(result[0]);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
const POST_OBJETIVE_FOR_ABILITY  = async (req = request, res = response) => {
  const { id_ab} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from get_objectives_for_ability_json ('${id_ab}');`
    );
    return res.status(200).json(result[0]);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_OBJETIVE = async (req = request, res = response) => {

  res.status(200).json({ objetive: {} });
};

module.exports = {
  POST_OBJETIVE_FOR_ID,
  POST_OBJETIVE_FOR_ABILITY,
  POST_OBJETIVE,
};
