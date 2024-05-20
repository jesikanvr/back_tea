const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const Post_ACTIVITY_ID = async (req = request, res = response) => {
  const { id_act} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_activity_for_id_json('${id_act}');`
    );

    return res.status(200).json(result[0][0]['get_activity_for_id_json']);
  } catch (error) {
    console.log("ERROR: ",error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_ACTIVITY_FOR_OBJECTIVE  = async (req = request, res = response) => {
  const { id_obj} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from get_activities_for_objective_json ('${id_obj}');`
    );
    return res.status(200).json(result[0][0]['get_activities_for_objective_json']);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ACTIVITY = async (req = request, res = response) => {
  const { description_activity, id_objec } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_activity ('${description_activity}', '${id_objec}');`
    );
    return res.status(200).json({message: "Se ha creado la actividad correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ACTIVITY = async (req = request, res = response) => {
  const { id_act, description_act } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_activity ('${id_act}', '${description_act}');`
    );
    return res.status(200).json({message: "Se ha modificado la actividad correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ACTIVITY = async (req = request, res = response) => {
  const { id_act } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_activity ('${id_act}');`
    );
    return res.status(200).json({message: "Se ha eliminado la actividad correctamente"});
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
  POST_ACTIVITY_FOR_OBJECTIVE,
  INSERT_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  POST_ACTIVITY,
};
