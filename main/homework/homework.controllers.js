const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
//const { SEND_MAIL } = require("../../helpers/google-email");

const POST_HOMEWORK_P = async (req = request, res = response) => {
  const { id_objective} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_homeworks_for_objective_json('${id_objective}');`
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_HOMEWORK_FOR_ID = async (req = request, res = response) => {
  const {id_homework} = req.body;
  try {
    const result = await sequelize.query(
      `select * from get_homework_for_id_json('${id_homework}');`
    );
    return res.status(200).json(result[0][0]['get_homework_for_id_json']);
  } catch (error) {
    console.log("ERROR: ",error);
    return res.status(500).json({ error: "Internal error" });
  }
}

const INSERT_HOMEWORK = async (req = request, res = response) => {
  const { name_homework, id_object } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_homework ('${name_homework}', '${id_object}');`
    );
    return res.status(200).json({message: "Se ha creado la tarea correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_HOMEWORK = async (req = request, res = response) => {
  const { id_hom, name_hom } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_homework ('${id_hom}', '${name_hom}');`
    );
    return res.status(200).json({message: "Se ha modificado la tarea correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_HOMEWORK = async (req = request, res = response) => {
  const { id_hom } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_homework ('${id_hom}');`
    );
    return res.status(200).json({message: "Se ha eliminado la tarea correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_HOMEWORK = async (req = request, res = response) => {

  res.status(200).json({ homework: {} });
};

module.exports = {
  POST_HOMEWORK_P,
  POST_HOMEWORK_FOR_ID,
  INSERT_HOMEWORK,
  UPDATE_HOMEWORK,
  DELETE_HOMEWORK,
  POST_HOMEWORK,
};
