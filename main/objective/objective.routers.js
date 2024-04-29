const { Router } = require("express");
const { check } = require("express-validator");

const { POST_OBJETIVE_FOR_ID } = require("./objective.controllers");
const { POST_OBJETIVE_FOR_ABILITY } = require("./objective.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.post(
  "/objec",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_OBJETIVE_FOR_ID
);
router.post(
  "/ability",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_OBJETIVE_FOR_ABILITY
);

module.exports = router;