const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

// ${page || 1}, ${limit || -1}


const GET_ORIENTATION_OBJECTIVE = async (req = request, res = response) => {
  const { id_objective, page, limit } = req.body;
  try { 
    const result = await sequelize.query(
      `select * from get_orientations_for_objective_json ('${id_objective}');`
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
const GET_ORIENTATION_ACTIVITY = async (req = request, res = response) => {
  const { id_activity, page, limit } = req.body;
  try { 
    const result = await sequelize.query(
      `select * from get_orientations_for_activities_json ('${id_activity}');`
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
const GET_ORIENTATION_HOMEWORK = async (req = request, res = response) => {
  const { id_homework, page, limit } = req.body;
  try { 
    const result = await sequelize.query(
      `select * from get_orientations_for_homework_json ('${id_homework}');`
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ORIENTATION = async (req = request, res = response) => {
  const { description_orientation, entity_id, entity_type } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_orientation ('${description_orientation}', '${entity_id}', '${entity_type}');`
    );
    return res.status(200).json({message: "Se ha creado la orientación correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ORIENTATION = async (req = request, res = response) => {
  const { id_orient, description_orient } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_orientation ('${id_orient}', '${description_orient}');`
    );
    return res.status(200).json({message: "Se ha modificado la orientación correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ORIENTATION = async (req = request, res = response) => {
  const { id_orient } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_orientation ('${id_orient}');`
    );
    return res.status(200).json({message: "Se ha eliminado la orientación correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ORIENTATION = async (req = request, res = response) => {

  res.status(200).json({ orientation: {} });
};

module.exports = {
  GET_ORIENTATION_OBJECTIVE,
  GET_ORIENTATION_ACTIVITY,
  GET_ORIENTATION_HOMEWORK,
  INSERT_ORIENTATION,
  UPDATE_ORIENTATION,
  DELETE_ORIENTATION,
  POST_ORIENTATION,
};
