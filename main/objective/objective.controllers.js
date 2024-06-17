const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

const GET_OBJECTIVES  = async (req = request, res = response) => {
  const key_function = 'get_objectives';
  try {
    const result = await sequelize.query(
      //`select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
      `select * from ${key_function} ();`
    );
    return res.status(200).json({ objectives: PARSE_DB_RESPONSE(result, key_function) });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const GET_OBJECTIVE  = async (req = request, res = response) => {
  const key_function = 'get_objective';
  const { id } = req.query;
  //console.log(result)
  try {
    const result = await sequelize.query(
      //`select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
      `select * from ${key_function} ('${id}');`
    );
    return res.status(200).json({ objectives: PARSE_DB_RESPONSE(result, key_function) });
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
  const key_function = 'insert_only_objective';
  let objective = {}
  try {
    const { user_id, name, activities = [], abilities = [] } = req.body;

    objective['user_id'] = user_id;
    objective['name'] = name;
    objective['activities'] = activities;
    objective['abilities'] = abilities;

    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(objective)}');`
    );

    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
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

module.exports = {
  GET_OBJECTIVES,
  GET_OBJECTIVE,
  POST_OBJETIVE_FOR_ABILITY,
  INSERT_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
};
