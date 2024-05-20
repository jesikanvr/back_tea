const { Router } = require("express");
const { check } = require("express-validator");

const { Post_ACTIVITY_ID } = require("./activity.controllers");
const { POST_ACTIVITY_FOR_OBJECTIVE } = require("./activity.controllers");
const { INSERT_ACTIVITY } = require("./activity.controllers");
const { UPDATE_ACTIVITY } = require("./activity.controllers");
const { DELETE_ACTIVITY } = require("./activity.controllers");
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
router.post(
  "/id_obj",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  
  POST_ACTIVITY_FOR_OBJECTIVE
);

router.post(
  "/addActivity",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  INSERT_ACTIVITY
);

router.put(
  "/updateActivity",
  [ validateFields ],
  UPDATE_ACTIVITY
);

router.delete(
  "/deleteActivity",
  [ validateFields ],
  DELETE_ACTIVITY
);

module.exports = router;