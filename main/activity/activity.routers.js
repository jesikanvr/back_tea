const { Router } = require("express");
const { check } = require("express-validator");
const {
  activityGet,
  activityPost,
  activityPut,
  activityDelete,
} = require("../activity/activity.controllers");
const { validateFields } = require("../../middlewares/validate-fields");
//const Role = require("../role/role.models");

const router = Router();

router.get("/", [validateFields], activityGet);

router.post("/", [validateFields,], activityPost);

router.put(
  "/:id",
  [
    validateFields,
  ],
  activityPut
);

router.delete(
  "/:id",
  [
    validateFields,
  ],
  activityDelete
);

module.exports = router;
