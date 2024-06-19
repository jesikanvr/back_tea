const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");


const DELETE_ASSET = async (req = request, res = response) => {
  const key_function = 'delete_assets';
  const { assets = [] } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(assets)}');`
    );
    return res
      .status(200)
      .json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

module.exports = {
  DELETE_ASSET,
};
