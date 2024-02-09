const stream = require("stream");
const { google } = require("googleapis");
const { AUTH } = require("../google/google.apis.conf");

const folder_drive = process.env.GOOGLE_FOLDER;

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google
    .drive({ version: "v3", auth: AUTH })
    .files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: [folder_drive],
      },
      fields: "id,name",
    });
  //console.log(`UPLOAD FILES ${data.name} ${data.id}`);
  return data.id;
};

const getFile = async (fileId) => {
  const { data } = await google.drive({ version: "v3", auth: AUTH }).files.get({
    fileId,
    alt: "media",
  });
  //console.log(`Uploaded file ${data}`);
};

const getFileUrlPublic = (fileId) => {
  const urlPrefix = "https://drive.google.com/uc?id=";
  const url = urlPrefix + fileId;
  //console.log(`PUBLIC URL FOR FILE *${fileId}*:\n${url}`);
  return url;
};

module.exports = {
  uploadFile,
  getFile,
  getFileUrlPublic,
};
