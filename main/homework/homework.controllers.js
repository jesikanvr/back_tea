const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
//const { SEND_MAIL } = require("../../helpers/google-email");

const POST_HOMEWORK_P = async (req = request, res = response) => {
  const { id_objective} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_homeworks_for_objective_json('${id_objective}');`
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_HOMEWORK_FOR_ID = async (req = request, res = response) => {
  const {id_homework} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_homework_for_id_json('${id_homework}');`
    );
    return res.status(200).json(result[0][0]['get_homework_for_id_json']);
  } catch (error) {
    console.log("ERROR: ",error);
    return res.status(500).json({ error: "Internal error" });
  }
}

const POST_HOMEWORK = async (req = request, res = response) => {

  res.status(200).json({ homework: {} });
};

module.exports = {
  POST_HOMEWORK_P,
  POST_HOMEWORK_FOR_ID,
  POST_HOMEWORK,
};
