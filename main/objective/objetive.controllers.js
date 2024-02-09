const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_OBJETIVE = async (req = request, res = response) => {
  const { id_stage, id_ability, page, limit } = req.query;
  try {
    const result = await sequelize.query(
      `pg_get_objective_from_stage (${id}, ${page || 1}, ${limit || -1});`
    );
    return res.status(200).json({ objetive: result[0] });
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
