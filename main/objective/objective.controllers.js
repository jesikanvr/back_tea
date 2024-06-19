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
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_OBJETIVE_FOR_ABILITY  = async (req = request, res = response) => {
  const key_function = 'get_objectives_for_ability';
  const { id } = req.query;
  try {
    const result = await sequelize.query(
      //`select * from pg_get_ability_from_stage (${page || 1}, ${limit || -1});`
      `select * from ${key_function} ('${id}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
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
  const key_function = 'update_objective';
  const key_function_get = 'get_objective';
  let objective = {}
  try {
    const { id,  name, activities = [], abilities = [] } = req.body;

    const result_obj = await sequelize.query(
      `select * from ${key_function_get}('${id}');`
    );

    let temp_objective = PARSE_DB_RESPONSE(result_obj, key_function_get);

    let inser_activities = []
    let inser_abilities = []

     //actualizar o eliminar actividades abilidad
    if (temp_objective.activities && temp_objective.activities.length > 0) {
      activities.forEach(element => {
        let index = temp_objective.activities.findIndex(act => act.id === element);
        if (index === -1) {
          inser_activities.push(element);
        }
      });
    }else {
      inser_activities = activities;
    }

    //Insertar o desconectar abilidad
    if (temp_objective.abilities && temp_objective.abilities.length > 0) {
      abilities.forEach(element => {
        let index = temp_objective.abilities.findIndex(ab => ab.id === element);
        if (index === -1) {
          inser_abilities.push(element);
        }
      });
    }else {
      inser_abilities = abilities;
    }

    objective['id'] = id;
    objective['name'] = name;
    objective['activities'] = inser_activities;
    objective['abilities'] = inser_abilities;

    
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(objective)}');`
    );

    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_OBJECTIVE = async (req = request, res = response) => {
  const key_function = 'delete_objectives';
  const { objectives = [] } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(objectives)}');`
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
  GET_OBJECTIVES,
  GET_OBJECTIVE,
  POST_OBJETIVE_FOR_ABILITY,
  INSERT_OBJECTIVE,
  UPDATE_OBJECTIVE,
  DELETE_OBJECTIVE,
};
