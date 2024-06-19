const { putObject, listObjects, deleteObject, createBucket, getObject } = require("../../helpers/helper.idrivee2");

/**
 * @param {*} req
 * @param {*} res
 */
const createBuckets = async (req, res) => {
  try {
    const { name } = req.body
    try {
      const resp = await createBucket(name);
      res.status(200).send({ msg: "Form Submitted", fils: resp });
    } catch (error) {
      res.status(500).send({ msg: "Error upload", error: error });
    }

  } catch (f) {
    res.send(f.message);
  }
};

/**
 * @param {*} req
 * @param {*} res
 */
const createFile = async (req, res) => {
  try {
    //console.log(req.files);
    const { body, files } = req;
    let mimetype = files[0].mimetype.split('/')
    const resp = await putObject('storage', mimetype[mimetype.length - 1], files[0].buffer);

    res.status(200).send({ msg: "Form Submitted", file: resp });
  } catch (f) {
    res.send(f.message);
  }
};

/**
 * @param {*} req
 * @param {*} res
 */
const createFiles = async (req, res) => {
  try {
    const { files } = req;

    let filesKey = []
    for (let index = 0; index < files.length; index++) {      
      let mimetype = files[index].mimetype.split('/')
      let createResp = await putObject('storage', mimetype[mimetype.length - 1], files[index].buffer);
      console.log(createResp)
      if (createResp.key.length > 0) {
        filesKey.push(createResp.key)
      }
    }

    res.status(200).send({ msg: "Form Submitted", files: filesKey });
  } catch (f) {
    res.send(f.message);
  }
};

/**
 * @param {*} req
 * @param {*} res
 */
const getListGFile = async (req, res) => {
  try {
    const resp = await listObjects('storage');

    res.status(200).send({ msg: "Form Submitted", fils: resp });
  } catch (f) {
    res.send(f.message);
  }
};

/**
 * @param {*} req
 * @param {*} res
 */
const getFile = async (req, res) => {
  try {
    const { key } = req.query
    const resp = await getObject('storage', key);

    // Configura las cabeceras de la respuesta
    res.set({
      'Content-Type': 'application/octet-stream', // Tipo de contenido: archivo binario
      'Content-Disposition': `attachment; filename="${key}"`, // Nombre del archivo
    });
    res.send(resp);
  } catch (f) {
    res.send({ error: f.message });
  }
};

/**
 * @param {*} req
 * @param {*} res
 */
const deletetFile = async (req, res) => {
  try {
    const { key } = req.body
    const resp = await deleteObject('storage', key);

    res.status(200).send({'delete': [key]});
  } catch (f) {
    res.send({ error: f.message });
  }
};


module.exports = { createFile, createFiles, getListGFile, createBuckets, getFile, deletetFile };
