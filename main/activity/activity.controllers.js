const { response, request } = require("express");
const Activity = require("./activity.models");

const activityGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, activity] = await Promise.all([
      Activity.count({ where: query }),
      Activity.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, activity });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const activityPost = async (req = request, res = response) => {
  const { name, description, category, aim, homework} = req.body;

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { name, description, category, aim, homework})

  try {
    const activity = await Activity.create({
      name,
      description,
      category,
      aim,
      homework,
    });
    res.json({ activity });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const activityPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id,
    category,
    aim,
    homework, ...resto } = req.body;
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', { _id,
      category,
      aim,
      homework, ...resto })

  await Activity.update(resto, {
    where: {
      id,
    },
  });

  res.json({ msg: "Actividad actualizada correctamente" });
};

const activityDelete = async (req, res = response) => {
  const { id } = req.params;

  const activity = await Activity.update({ state: false }, {
    where: {
      id,
    },
  });

  res.json({ activity });
};
module.exports = {
  activityGet,
  activityPost,
  activityPut,
  activityDelete,
};
