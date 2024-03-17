const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");
const { body } = require("express-validator");
//const { GET_ABILITY } = require("../../ability.controllers");

const GET_OBJETIVE = async (req = request, res = response) => {
  const { id_ability, id_stage, page, limit} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from pg_get_objectives_from_stage_and_ability ('${id_stage}', '${id_ability}', ${page || 1}, ${limit || -1});`
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
  GET_OBJETIVE,
  POST_OBJETIVE,
};
