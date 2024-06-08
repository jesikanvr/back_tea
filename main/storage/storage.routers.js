const { Router } = require("express");
const { createFile, createFiles, /* getListGFile, createBuckets, */ getFile } = require("./storage.controllers");
const multer = require("multer");

const upload = multer();
const router = Router();

router.post("/file/create", upload.any(), createFile);
router.post("/file/create/multiple", upload.any(), createFiles);
//router.get("/file/list", upload.any(), getListGFile); //nadia tiene acceso a todo el storage
router.get("/file", upload.any(), getFile);
//router.post("/create/bucket", createBuckets); //No pueden crear new bocket

module.exports = router;
