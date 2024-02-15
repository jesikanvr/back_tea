const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_ACTIVITY = async (req = request, res = response) => {
  req.query;
  try {
    const result = await sequelize.query(
      `select a.id, a.description, o.id 
        from activity a
        inner join objective o on a.id_objective  = o.id
        where o.id = 'a4c4f4b3-6637-456c-b4a9-8ce627627b1f'
        order by a.description`
    );
    const activity = [];
    result[0].forEach((row) => {
      activity.push({
        id: row.id,
        description: row.description,
      });
    });
    return res.status(200).json({ activity });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ACTIVITY = async (req = request, res = response) => {
  res.status(200).json({ ability: {} });
};

module.exports = {
  GET_ACTIVITY,
  POST_ACTIVITY,
};
