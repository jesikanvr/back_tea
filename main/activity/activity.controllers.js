const { response, request } = require("express");
const { sequelize } = require("../../database/conf");

const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

const ACTIVITY_ID = async (req = request, res = response) => {
  const key_function = 'get_activity';
  const { id } = req.query;
  try {
    const result = await sequelize.query(
      `select * from ${key_function}('${id}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log("ERROR: ",error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const GET_ONLY_ACTIVITY = async (req = request, res = response) => {
  let key_function = "get_only_activities";
  try {
    const result = await sequelize.query(
      `select * from ${key_function}();`
    );

    let response = PARSE_DB_RESPONSE(result, key_function);

    if (response) {
      return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
    }else {
      return res.status(404).json({'msg': 'Not orientatiojn empty'});
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const ACTIVITY_FOR_OBJECTIVE  = async (req = request, res = response) => {
  const key_function = 'get_activities_for_objective';
  const { id_objective } = req.query;
  try {
    const result = await sequelize.query(   
      `select * from ${key_function}('${id_objective}');`
    );
    return res.status(200).json({activity: PARSE_DB_RESPONSE(result, key_function)});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const INSERT_ACTIVITY = async (req = request, res = response) => {
  const key_function = 'insert_only_activity';
  let activity = {}
  try {
    const { description, orientations, homework } = req.body;

    activity['description'] = description;
    activity['orientations'] = orientations;
    activity['homework'] = homework;

    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(activity)}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_ACTIVITY = async (req = request, res = response) => {
  const key_function = 'update_activity';
  const key_function_util = 'get_activity';
  let activity = {}
  try {
    const { id, description, orientations = [], homework = [] } = req.body;

    const result_act = await sequelize.query(
      `select * from ${key_function_util}('${id}');`
    );

    let temp_activity = PARSE_DB_RESPONSE(result_act, key_function_util);

    let inser_orientations = []
    let inser_homework = []

    if (temp_activity.orientations && temp_activity.orientations.length > 0) {
      orientations.forEach(element => {
        let index = temp_activity.orientations.findIndex(or => or.id === element);
        if (index === -1) {
          inser_orientations.push(element);
        }
      });
    }else {
      inser_orientations = orientations;
    }

    if (temp_activity.homework && temp_activity.homework.length > 0) {
        homework.forEach(element => {
        let index = temp_activity.homework.findIndex(hw => hw.id === element);
        if (index === -1) {
          inser_homework.push(element);
        }
      });
    }else {
      inser_homework = homework;
    }

    activity['id'] = id;
    activity['description'] = description;
    activity['orientations'] = inser_orientations;
    activity['homework'] = inser_homework;
    
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(activity)}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_ACTIVITY = async (req = request, res = response) => {
  const key_function = 'delete_activities';
  const { activities = [] } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(activities)}');`
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
  ACTIVITY_ID,
  GET_ONLY_ACTIVITY,
  ACTIVITY_FOR_OBJECTIVE,
  INSERT_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
};
