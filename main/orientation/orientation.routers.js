const { Router } = require("express");
const { check } = require("express-validator");

const {
  GET_ORIENTATION,
  GET_ORIENTATION_LIST,
  INSERT_ORIENTATION,
  UPDATE_ORIENTATION,
  DELETE_ORIENTATION,
} = require("./orientation.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");

const router = Router();

//OBTENER ORIENTACION
router.get(
  "/",
  [check("id", "The id is invalid").isUUID(4), validateFields],
  GET_ORIENTATION
);

//OBTENER ORIENTACION POR LAS OTRAS ENTIDADES QUE LA CONTIENE
router.get(
  "/list",
  [
    check("id", "The id is invalid").isUUID(4),
    validateFields,
  ],
  GET_ORIENTATION_LIST
);

//CREAR ORINBTACION
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
    check("assets")
      .optional()
      .isArray()
      .withMessage("The assets field must be a Arry<String>"),
    validateFields,
  ],
  INSERT_ORIENTATION
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
    check("assets")
      .optional()
      .isArray()
      .withMessage("The assets field must be a Arry<String>"),
    validateFields,
  ],
  UPDATE_ORIENTATION
);

router.delete(
  "/",
  [
    validateJWT,
    check("orientations")
    .isArray()
    .withMessage("The orientations field must be a Arry<UUID>"),
    validateFields,
  ],
  DELETE_ORIENTATION
);

module.exports = router;
