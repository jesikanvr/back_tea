const { Router } = require("express");
const { check } = require("express-validator");

const { INSERT_TYPE_MEDIA } = require("./typemedia.controller");
const { UPDATE_TYPE_MEDIA } = require("./typemedia.controller");
const { DELETE_TYPE_MEDIA } = require("./typemedia.controller");
//const { POST_TYPEMEDIA } = require("./typemedia.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.post(
    "/addTypeMedia",
    [ 
      //check("id_stage", "The id is invalid").isUUID(4),
      //check("id_ability", "The id is invalid").isUUID(4),
      validateFields 
    ],
    INSERT_TYPE_MEDIA
  );

  router.put(
    "/updateTypeMedia",
    [ validateFields ],
    UPDATE_TYPE_MEDIA
  );

  router.delete(
    "/deleteTypeMedia",
    [ validateFields ],
    DELETE_TYPE_MEDIA
  );

  module.exports = router;