const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const Post_ACTIVITY_ID = async (req = request, res = response) => {
  const { id_act} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_activity_for_id_json('${id_act}');`
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
  Post_ACTIVITY_ID,
  POST_ACTIVITY,
};
