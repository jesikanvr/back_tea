const { Router } = require("express");
const { check } = require("express-validator");

const { GET_ACTIVITY } = require("./activity.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ACTIVITY
);

module.exports = router;