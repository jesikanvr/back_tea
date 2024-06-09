const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

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
  const { id, entity } = req.query;
  try {
    let result = {};
    let key_function = "";

    switch (entity) {
      case "objective":
        result = await sequelize.query(
          `select * from get_orientations_for_objective ('${id}');`
        );
        key_function = "get_orientations_for_objective";
        break;
      case "activity":
        result = await sequelize.query(
          `select * from get_orientations_for_activities ('${id}');`
        );
        key_function = "get_orientations_for_activities";
        break;
      case "homework":
        result = await sequelize.query(
          `select * from get_orientations_for_homeworks ('${id}');`
        );
        key_function = "get_orientations_for_homeworks";
        break;
      default:
        res.status(404).json({ error: "not entity empty" });
        break;
    }

    return res.status(200).json(result[0][0][key_function]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ORIENTATION = async (req = request, res = response) => {
  const { description} = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_orientation ('${description}');`
    );
    return res
      .status(200)
      .json({ message: "Se ha creado la orientación correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ORIENTATION = async (req = request, res = response) => {
  const { id, description } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_orientation ('${id}', '${description}');`
    );
    return res
      .status(200)
      .json({ message: "Se ha modificado la orientación correctamente" });
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
