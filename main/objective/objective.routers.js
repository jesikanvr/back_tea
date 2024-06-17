const { Router } = require("express");
const { check } = require("express-validator");

const { POST_OBJETIVE_FOR_ID } = require("./objective.controllers");
const { POST_OBJETIVE_FOR_ABILITY } = require("./objective.controllers");
const { INSERT_OBJECTIVE } = require("./objective.controllers");
const { UPDATE_OBJECTIVE } = require("./objective.controllers");
const { DELETE_OBJECTIVE } = require("./objective.controllers");
const { GET_OBJECTIVE, GET_OBJECTIVES } = require("./objective.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

router.get(
  "/",
  [ 
    check("id", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    //validateFields 
  ],
  GET_OBJECTIVE
);
router.get(
  "/list",
  [ 
    //check("id_obj", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    //validateFields 
  ],
  GET_OBJECTIVES
);
router.get(
  "/ability",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_OBJETIVE_FOR_ABILITY
);

router.post(
  "/",
  [ 
    validateJWT,
    check("user_id", "The id is invalid").isUUID(4),
    check("name")
      .isString()
      .withMessage("The name field must be a text string")
      .not()
      .isEmpty()
      .withMessage("The name is not empty"),
    check("activities")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The activities field must be a Arry<UUID>"),
    check("abilities")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The abilities field must be a Arry<UUID>"),
    validateFields
  ],
  INSERT_OBJECTIVE
);

router.put(
  "/updateObjective",
  [ validateFields ],
  UPDATE_OBJECTIVE
);

router.delete(
  "/deleteObjective",
  [ validateFields ],
  DELETE_OBJECTIVE
);

module.exports = router;