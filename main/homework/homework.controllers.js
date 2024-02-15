const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_HOMEWORK = async (req = request, res = response) => {
  req.query;
  try {
    const result = await sequelize.query(
      //`pg_get_objective_from_stage (${id}, ${page || 1}, ${limit || -1});`
      `select h.id, h."name", o.id 
      from homework h
      inner join objective o on h.id_objective = o.id
      where o.id = 'a4c4f4b3-6637-456c-b4a9-8ce627627b1f'
      order by h.name`
    );
    const homework = [];
    result[0].forEach((row) => {
        homework.push({
        id: row.id,
        name: row.name,
      });
    });
    return res.status(200).json({ homework });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_HOMEWORK = async (req = request, res = response) => {

  res.status(200).json({ objetive: {} });
};

module.exports = {
  GET_HOMEWORK,
  POST_HOMEWORK,
};
