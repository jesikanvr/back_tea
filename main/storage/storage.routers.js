const { Router } = require("express");
const { createFile, getGFile } = require("./storage.controllers");
const multer = require("multer");

const upload = multer();
const router = Router();

router.post("/", upload.any(), createFile);
router.get("/", upload.any(), getGFile);

module.exports = router;
