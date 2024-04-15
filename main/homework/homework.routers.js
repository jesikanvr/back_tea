const { Router } = require("express");
const { check } = require("express-validator");

const { POST_HOMEWORK_P } = require("./homework.controllers");
const { POST_HOMEWORK_FOR_ID } = require("./homework.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

/* router.post(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_HOMEWORK_P
); */

router.post(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_HOMEWORK_FOR_ID
);

module.exports = router;