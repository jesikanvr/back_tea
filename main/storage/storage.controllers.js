const { uploadFile, getFile } = require("../../helpers/google-file");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const createFile = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { body, files } = req;

    for (let f = 0; f < files.length; f += 1) {
      await uploadFile(files[f]);
    }

    res.status(200).send("Form Submitted");
  } catch (f) {
    res.send(f.message);
  }
};

const getGFile = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;

    await getFile(id);

    res.status(200).send("Form Submitted");
  } catch (f) {
    res.send(f.message);
  }
};

module.exports = { createFile, getGFile };
