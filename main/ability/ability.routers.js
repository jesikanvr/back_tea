const { Router } = require("express");
//const { check } = require("express-validator");

const { GET_ABILITY } = require("./ability.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/",
  [ validateFields ],
  GET_ABILITY
);

module.exports = router;