const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

const GET_OBJETIVE = async (req = request, res = response) => {
  //const { id_stage, id_ability, } = 
  req.query;
  try {
    const result = await sequelize.query(
      //`pg_get_objective_from_stage (${id}, ${page || 1}, ${limit || -1});`
      `select o.id, o."name", orien as orientations_id, orien.description as orientations_description, h.id as hom_id, h."name" as hom_name, a.id as act_id, a.description as act_description
      from stage s
      left join objective o on o.id_stage = s.id 
      left join activity a on a.id_objective = o.id
      left join orientations orien on orien.id_activity  = a.id
      left join homework h on h.id = orien.id_homework 
      where s.id = '6938e162-e0b5-4126-b6a3-b1821eaf2733'`
    );
    const objectives = [];
    result[0].forEach((row) => {
      const objective = {
        id: row.id,
        name: row.name,
        orientation:[],
        homework:[],
        activity:[]
      };
      if (row.orientations_id && row.orientations_description) {
        objective.orientation.push({
          id: row.orientations_id,
          descripcion: row.orientations_description,
        });
      }
      if (row.hom_id && row.hom_name) {
        objective.homework.push({
          id: row.hom_id,
          descripcion: row.hom_name,
        });
      }

      if (row.act_id && row.act_description) {
        objective.activity.push({
          id: row.act_id,
          descripcion: row.act_description,
        });
      }

      objectives.push(objective);
    });
    return res.status(200).json({ objectives});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_OBJETIVE = async (req = request, res = response) => {

  res.status(200).json({ objetive: {} });
};

module.exports = {
  GET_OBJETIVE,
  POST_OBJETIVE,
};
