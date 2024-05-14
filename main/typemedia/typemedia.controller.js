const { response, request } = require("express");
const { sequelize } = require("../../database/conf");
const { SEND_MAIL } = require("../../helpers/google-email");

// ${page || 1}, ${limit || -1}


const INSERT_TYPE_MEDIA = async (req = request, res = response) => {
  const { type_tm } = req.body;
  try {
    const result = await sequelize.query(
      `select * from insert_type_media ('${type_tm}');`
    );
    return res.status(200).json({message: "Se ha creado el tipo de media correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const UPDATE_TYPE_MEDIA = async (req = request, res = response) => {
  const { id_tm, type_tm } = req.body;
  try {
    const result = await sequelize.query(
      `select * from update_typemedia ('${id_tm}', '${type_tm}');`
    );
    return res.status(200).json({message: "Se ha modificado el tipo de media correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const DELETE_TYPE_MEDIA = async (req = request, res = response) => {
  const { id_tm } = req.body;
  try {
    const result = await sequelize.query(
      `select * from delete_typemedia ('${id_tm}');`
    );
    return res.status(200).json({message: "Se ha eliminado el tipo de media correctamente"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const POST_TYPEMEDIA = async (req = request, res = response) => {

  res.status(200).json({ ty: {} });
};

module.exports = {
  INSERT_TYPE_MEDIA,
  UPDATE_TYPE_MEDIA,
  DELETE_TYPE_MEDIA,
  POST_TYPEMEDIA
};
