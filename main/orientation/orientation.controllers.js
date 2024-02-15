const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ORIENTATION = async (req = request, res = response) => {
  //const { id_stage, id_ability, } = 
  req.query;
  try {
    const result = await sequelize.query(
      //`pg_get_objective_from_stage (${id}, ${page || 1}, ${limit || -1});`
      `select o2.id, o2.description, a.id, a.link, o.id 
      from objective o
      left join orientations o2 on o.id = o2.id_objective
      left join assets a on o2.id = a.id_orientations 
      where o.id = 'a4c4f4b3-6637-456c-b4a9-8ce627627b1f'
      order by o2.description `
    );
    const orientations = [];
    result[0].forEach((row) => {
        orientations.push({
        id: row.id,
        description: row.description,
      });
    });
    return res.status(200).json({ orientations});
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
