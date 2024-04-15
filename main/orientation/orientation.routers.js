const { Router } = require("express");
const { check } = require("express-validator");

const { GET_ORIENTATION_OBJECTIVE } = require("./orientation.controllers");
const { GET_ORIENTATION_ACTIVITY } = require("./orientation.controllers");
const { GET_ORIENTATION_HOMEWORK } = require("./orientation.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/obj",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ORIENTATION_OBJECTIVE
);
router.get(
  "/act",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ORIENTATION_ACTIVITY
);
router.get(
  "/hom",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ORIENTATION_HOMEWORK
);

module.exports = router;