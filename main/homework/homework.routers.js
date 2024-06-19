const { Router } = require("express");
const { check } = require("express-validator");

const { GET_HOMEWORK_LIST } = require("./homework.controllers");
const { GET_HOMEWORK } = require("./homework.controllers");
const { GET_ONLY_HOMEWORK } = require("./homework.controllers");
const { INSERT_HOMEWORK } = require("./homework.controllers");
const { UPDATE_HOMEWORK } = require("./homework.controllers");
const { DELETE_HOMEWORK } = require("./homework.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

router.get(
  "/",
  [ 
    check("id", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_HOMEWORK
);

//ONTENER ORIENTACION QUE NO ESTAN ASIGNADAS A ABILIDADES
router.get(
  "/only",
  GET_ONLY_HOMEWORK
);

router.get(
  "/list",
  [ 
    check("id", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_HOMEWORK_LIST
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
  "/",
  [ 
    validateJWT,
    check("id", "The id is invalid").isUUID(4),
    check("name")
      .isString()
      .withMessage("The description field must be a text string")
      .not()
      .isEmpty()
      .withMessage("The description is not empty"),
    validateFields
  ],
  UPDATE_HOMEWORK
);

router.delete(
  "/",
  [ 
    validateJWT,
    check("homework")
      .isArray()
      .isUUID(4)
      .withMessage("The homework field must be a Arry<UUID>"),
    validateFields 
  ],
  DELETE_HOMEWORK
);

module.exports = router;