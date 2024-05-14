const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

// ${page || 1}, ${limit || -1}


const GET_ASSET_ACTIVITY = async (req = request, res = response) => {
  const { id_act } = req.body;
  try { 
    const result = await sequelize.query(
      `select * from get_assets_for_activity_json ('${id_act}');`
    );
    return res.status(200).json(result[0][0]['get_assets_for_activity_json']);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
const GET_ASSET_ORIENTATION = async (req = request, res = response) => {
  const { id_orient } = req.body;
  try { 
    const result = await sequelize.query(
      `select * from get_assets_for_orientation_json ('${id_orient}');`
    );
    return res.status(200).json(result[0][0]['get_assets_for_orientation_json']);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ASSET = async (req = request, res = response) => {
  const { link_asset, entity_id, entity_type, id_typeM } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_asset ('${link_asset}', '${entity_id}', '${entity_type}', '${id_typeM}');`
    );
    return res.status(200).json({message: "Se ha creado el asset correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ASSET = async (req = request, res = response) => {
  const { id_asset, link_asset } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_asset ('${id_asset}', '${link_asset}');`
    );
    return res.status(200).json({message: "Se ha modificado el asset correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ASSET = async (req = request, res = response) => {
  const { id_asset } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_asset ('${id_asset}');`
    );
    return res.status(200).json({message: "Se ha eliminado el asset correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ORIENTATION = async (req = request, res = response) => {

  res.status(200).json({ orientation: {} });
};

module.exports = {
  GET_ASSET_ACTIVITY,
  GET_ASSET_ORIENTATION,
  INSERT_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET,
  POST_ORIENTATION,
};
