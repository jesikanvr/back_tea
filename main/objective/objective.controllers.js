const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");
const { body } = require("express-validator");
//const { GET_ABILITY } = require("../../ability.controllers");

const POST_OBJETIVE_FOR_ID  = async (req = request, res = response) => {
  const { id_obj} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from get_objective_for_id_json ('${id_obj}');`
    );
    //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    while (result[0][0]['get_objective_for_id_json'].length !== 0) {
      return res.status(200).json(result[0][0]['get_objective_for_id_json']);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
const POST_OBJETIVE_FOR_ABILITY  = async (req = request, res = response) => {
  const { id_ab} = req.body;
  //console.log(result)
  try {
    const result = await sequelize.query(   
     `select * from get_objectives_for_ability_json ('${id_ab}');`
    );
    return res.status(200).json(result[0][0]['get_objectives_for_ability_json']);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

  const INSERT_OBJECTIVE = async (req = request, res = response) => {
    const { name_objective, id_ab } = req.body;
    try {
      const result = await sequelize.query(
        `select * from insert_objective ('${name_objective}', '${id_ab}');`
      );
      return res.status(200).json({message: "Se ha creado el objetivo correctamente"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal error" });
    }
  };

  const UPDATE_OBJECTIVE = async (req = request, res = response) => {
    const { id_obj, name_objective } = req.body;
    try {
      const result = await sequelize.query(
        `select * from update_objective ('${id_obj}', '${name_objective}');`
      );
      return res.status(200).json({message: "Se ha modificado el objetivo correctamente"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal error" });
    }
  };

  const DELETE_OBJECTIVE = async (req = request, res = response) => {
    const { id_obj } = req.body;
    try {
      const result = await sequelize.query(
        `select * from delete_objective ('${id_obj}');`
      );
      return res.status(200).json({message: "Se ha eliminado el objetivo correctamente"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal error" });
    }
  };

const POST_OBJETIVE = async (req = request, res = response) => {

  res.status(200).json({ objetive: {} });
};

module.exports = {
  POST_OBJETIVE_FOR_ID,
  POST_OBJETIVE_FOR_ABILITY,
  INSERT_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
  POST_OBJETIVE,
};
