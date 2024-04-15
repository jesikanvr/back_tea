const { Router } = require("express");
const { check } = require("express-validator");

const { GET_HOMEWORK } = require("./homework.controllers");
const { GET_HOMEWORK_FOR_ID } = require("./homework.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_HOMEWORK
);

router.get(
  "/:id",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_HOMEWORK_FOR_ID
);

module.exports = router;