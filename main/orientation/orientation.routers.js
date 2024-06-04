const { Router } = require("express");
const { check } = require("express-validator");

const { GET_ORIENTATION_OBJECTIVE } = require("./orientation.controllers");
const { Post_ORIENTATION_ID } = require("./orientation.controllers");
const { GET_ORIENTATION_ACTIVITY } = require("./orientation.controllers");
const { GET_ORIENTATION_HOMEWORK } = require("./orientation.controllers");
const { INSERT_ORIENTATION } = require("./orientation.controllers");
const { UPDATE_ORIENTATION } = require("./orientation.controllers");
const { DELETE_ORIENTATION } = require("./orientation.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.post(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  Post_ORIENTATION_ID
);

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

router.post(
  "/addOrientation",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  INSERT_ORIENTATION
);

router.put(
  "/updateOrientation",
  [ validateFields ],
  UPDATE_ORIENTATION
);

router.delete(
  "/deleteOrientation",
  [ validateFields ],
  DELETE_ORIENTATION
);

module.exports = router;