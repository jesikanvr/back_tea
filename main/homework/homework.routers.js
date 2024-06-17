const { Router } = require("express");
const { check } = require("express-validator");

const { POST_HOMEWORK_P } = require("./homework.controllers");
const { POST_HOMEWORK_FOR_ID } = require("./homework.controllers");
const { INSERT_HOMEWORK } = require("./homework.controllers");
const { UPDATE_HOMEWORK } = require("./homework.controllers");
const { DELETE_HOMEWORK } = require("./homework.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

/* router.post(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_HOMEWORK_P
); */

router.get(
  "/",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  POST_HOMEWORK_FOR_ID
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
  INSERT_HOMEWORK
);

router.put(
  "/updateHomework",
  [ validateFields ],
  UPDATE_HOMEWORK
);

router.delete(
  "/deleteHomework",
  [ validateFields ],
  DELETE_HOMEWORK
);

module.exports = router;