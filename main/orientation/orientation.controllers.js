const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ORIENTATION = async (req = request, res = response) => {
  const { id_objective, page, limit } = req.query;
  try {
    const result = await sequelize.query(
      `select * from pg_get_orientations_from_objective ('${id_objective}', ${page || 1}, ${limit || -1});`
    );
    const orientations = [];
    /*
    result[0].forEach((row) => {
        orientations.push({
        id: row.id,
        description: row.description,
      });
    });
    */
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ORIENTATION = async (req = request, res = response) => {

  res.status(200).json({ objetive: {} });
};

module.exports = {
    GET_ORIENTATION,
    POST_ORIENTATION,
};
