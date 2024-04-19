const { Router } = require("express");
const { check } = require("express-validator");

const { Post_ACTIVITY_ID } = require("./activity.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.post(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  Post_ACTIVITY_ID
);

module.exports = router;