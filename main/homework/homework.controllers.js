const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { PARSE_DB_RESPONSE } = require("../../helpers/helper.parse.ds");

const GET_HOMEWORK = async (req = request, res = response) => {
  let key_function = "get_task";
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

const GET_HOMEWORK_LIST = async (req = request, res = response) => {
  let key_function = "get_task_for_activities";
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

const INSERT_HOMEWORK = async (req = request, res = response) => {
  const key_function = 'insert_only_task';
  const { name } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${name}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
}; 

const UPDATE_HOMEWORK = async (req = request, res = response) => {
  const key_function = 'update_task';
  const { id, name } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${id}','${name}');`
    );
    return res.status(200).json(PARSE_DB_RESPONSE(result, key_function));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_HOMEWORK = async (req = request, res = response) => {
  const key_function = 'delete_tasks';
  const { homework = [] } = req.body;
  try {
    const result = await sequelize.query(
      `select * from ${key_function} ('${JSON.stringify(homework)}');`
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
  GET_HOMEWORK,
  GET_HOMEWORK_LIST,
  INSERT_HOMEWORK,
  UPDATE_HOMEWORK,
  DELETE_HOMEWORK,
};
