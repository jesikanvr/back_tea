const { Router } = require("express");
const { check } = require("express-validator");

const { DELETE_ASSET } = require("./asset.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
const { validateJWT } = require("../../middlewares/validate-jwt");


const router = Router();

router.delete(
  "/",
  [ 
    validateJWT,
    check("assets")
      .isArray()
      .isUUID(4)
      .withMessage("The assets field must be a Arry<UUID>"),
    validateFields 
  ],
  DELETE_ASSET
);

module.exports = router;