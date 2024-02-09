const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ABILITY = async (req = request, res = response) => {
  const { page, limit } = req.query;
  try {
    const result = await sequelize.query(
      `select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
    );
    SEND_MAIL("misael1984@gmail.com", "Prueba", "Email de prueba");
    return res.status(200).json({ ability: result[0] });
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
  POST_ABILITY,
};
