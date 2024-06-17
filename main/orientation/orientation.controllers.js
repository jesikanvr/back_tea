const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

// ${page || 1}, ${limit || -1}

const GET_ORIENTATION = async (req = request, res = response) => {
  const { id } = req.query;

  try {
    const result = await sequelize.query(
      `select * from get_orientation('${id}');`
    );
    return res.status(200).json(result[0][0]["get_orientation"]);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const GET_ORIENTATION_LIST = async (req = request, res = response) => {
  let key_function = "get_orientations_for_activities";
  const { id } = req.query;
  try {
    let result = {};
    result = await sequelize.query(
      `select * from ${key_function} ('${id}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ORIENTATION = async (req = request, res = response) => {
  const  key_function = "insert_only_orientation";
  const { description, assets } = req.body;
  let orientation = {}
  try {
    orientation['description'] = description
    if (assets.length > 0) {
      list_asset = []
      assets.forEach(element => {
        list_asset.push({
          link: element,
          type: 'img'
        })
      });
      orientation['assets'] = list_asset
    }
    console.log(orientation)
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(orientation)}');`
    );
    return res
      .status(200)
      .json({ message: "Se ha creado la orientación correctamente" , orientation: PARSE_DB_RESPONSE(result, key_function)});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ORIENTATION = async (req = request, res = response) => {
  const  key_function = "update_only_orientation";
  const { id, description, assets } = req.body;
  let orientation = {}
  try {
    orientation['id'] = id
    orientation['description'] = description
    if (assets.length > 0) {
      orientation['assets'] = assets
    }
    console.log('AAAAAAAAAAAAAAAAAAAAA')
    console.log(orientation)
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(orientation)}');`
    );
    return res
      .status(200)
      .json({ message: "Se ha actualizado la orientación correctamente" , orientation: PARSE_DB_RESPONSE(result, key_function)});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ORIENTATION = async (req = request, res = response) => {
  const { id } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_orientation ('${id}');`
    );
    return res
      .status(200)
      .json({ message: "Se ha eliminado la orientación correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

module.exports = {
  GET_ORIENTATION,
  GET_ORIENTATION_LIST,
  INSERT_ORIENTATION,
  UPDATE_ORIENTATION,
  DELETE_ORIENTATION,
};
