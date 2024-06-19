const { Router } = require("express");
const { createFile, createFiles, getFile, deletetFile } = require("./storage.controllers");
const multer = require("multer");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");
const { check } = require("express-validator");

const upload = multer();
const router = Router();
//key
router.get(
  "/file",
  [check("key", "The key is invalid").isString(), validateFields],
  getFile
);
router.post(
  "/file/create",
  [validateJWT, upload.any(), validateFields],
  createFile
);
router.post(
  "/file/create/multiple",
  [validateJWT, upload.any(), validateFields],
  createFiles
);
router.delete(
  "/file/delete",
  [
    validateJWT,
    check("key", "The key is invalid").isString(),
    validateFields,
  ],
  deletetFile
);
//router.get("/file/list", upload.any(), getListGFile); //nadia tiene acceso a todo el storage
//router.post("/create/bucket", createBuckets); //No pueden crear new bocket

module.exports = router;
