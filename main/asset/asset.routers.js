const { Router } = require("express");
const { check } = require("express-validator");

const { GET_ASSET_ACTIVITY } = require("./asset.controllers");
const { GET_ASSET_ORIENTATION } = require("./asset.controllers");
const { INSERT_ASSET } = require("./asset.controllers");
const { UPDATE_ASSET } = require("./asset.controllers");
const { DELETE_ASSET } = require("./asset.controllers");
const { validateFields } = require("../../middlewares/validate-fields");


const router = Router();

router.get(
  "/getAssetActivity",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ASSET_ACTIVITY
);
router.get(
  "/getAssetOrientation",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  GET_ASSET_ORIENTATION
);
router.post(
  "/addAsset",
  [ 
    //check("id_stage", "The id is invalid").isUUID(4),
    //check("id_ability", "The id is invalid").isUUID(4),
    validateFields 
  ],
  INSERT_ASSET
);

router.put(
  "/updateAsset",
  [ validateFields ],
  UPDATE_ASSET
);

router.delete(
  "/deleteAsset",
  [ validateFields ],
  DELETE_ASSET
);

module.exports = router;