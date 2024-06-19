const { Router } = require("express");
const { check } = require("express-validator");

const { 
        ACTIVITY_ID, 
        ACTIVITY_FOR_OBJECTIVE, 
        INSERT_ACTIVITY, 
        UPDATE_ACTIVITY, 
        DELETE_ACTIVITY 
      } = require("./activity.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

router.get(
  "/",
  [
    check("id", "The id is invalid").isUUID(4),
    validateFields
  ],

  ACTIVITY_ID
);
router.get(
  "/objective",
  [
    check("id_objective", "The id is invalid").isUUID(4),
    validateFields
  ],

  ACTIVITY_FOR_OBJECTIVE
);

router.post(
  "/",
  [
    validateJWT,
    check("description")
      .isString()
      .withMessage("The description field must be a text string")
      .not()
      .isEmpty()
      .withMessage("The description is not empty"),
    check("orientations")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The orientations field must be a Arry<UUID>"),
    check("homework")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The homeworks field must be a Arry<UUID>"),
    validateFields
  ],
  INSERT_ACTIVITY
);

router.put(
  "/",
  [
    validateJWT,
    check("id", "The id is invalid").isUUID(4),
    check("description")
      .isString()
      .withMessage("The description field must be a text string")
      .not()
      .isEmpty()
      .withMessage("The description is not empty"),
    check("orientations")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The orientations field must be a Arry<UUID>"),
    check("homework")
      .optional()
      .isArray()
      .isUUID(4)
      .withMessage("The homeworks field must be a Arry<UUID>"),
    validateFields
  ],
  UPDATE_ACTIVITY
);

router.delete(
  "/",
  [
    validateJWT,
    check("activities")
      .isArray()
      .isUUID(4)
      .withMessage("The activities field must be a Arry<UUID>"),
    validateFields
  ],
  DELETE_ACTIVITY
);

module.exports = router;