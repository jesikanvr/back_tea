const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ACTIVITY = async (req = request, res = response) => {
  const { id_objective} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_activities_for_objective_json('${id_objective}');`
    );

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ACTIVITY = async (req = request, res = response) => {
  res.status(200).json({ activity: {} });
};

module.exports = {
  GET_ACTIVITY,
  POST_ACTIVITY,
};
