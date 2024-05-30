const { Router } = require("express");
//const { check } = require("express-validator");

const { GET_ABILITY } = require("./ability.controllers");
const { GET_ABILITY_FOR_ID } = require("./ability.controllers");
const { INSERT_ABILITY } = require("./ability.controllers");
const { UPDATE_ABILITY } = require("./ability.controllers");
const { DELETE_ABILITY } = require("./ability.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/",
  [ validateFields ],
  GET_ABILITY
);

router.get(
  "/id_ab",
  [ validateFields ],
  GET_ABILITY_FOR_ID
);

router.post(
  "/addAbility",
  [ validateFields ],
  INSERT_ABILITY
);

router.put(
  "/updateAbility",
  [ validateFields ],
  UPDATE_ABILITY
);

router.delete(
  "/deleteAbility",
  [ validateFields ],
  DELETE_ABILITY
);

module.exports = router;