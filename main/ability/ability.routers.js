const { Router } = require("express");
const { check } = require("express-validator");

const { GET_ABILITYS } = require("./ability.controllers");
//const { GET_ABILITY_FOR_ID } = require("./ability.controllers");
const { INSERT_ABILITY } = require("./ability.controllers");
const { UPDATE_ABILITY } = require("./ability.controllers");
const { DELETE_ABILITY } = require("./ability.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

router.get(
  "/list",
 /*  [ validateFields ], */
  GET_ABILITYS
);


router.post(
  "/",
  [
    validateJWT,
    check("name")
      .isString()
      .withMessage("The description field must be a text string")
      .not()
      .isEmpty()
      .withMessage("The description is not empty"),
    validateFields
  ],
  INSERT_ABILITY
);

router.put(
  "/",
  [ validateFields ],
  UPDATE_ABILITY
);

router.delete(
  "/",
  [ validateFields ],
  DELETE_ABILITY
);

module.exports = router;