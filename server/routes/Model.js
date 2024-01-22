const express = require('express');
const router = express.Router();

const Model = require("../controller/Model")

router.route("/addmodel").post(Model.addModel);
router.route("/getmodel").get(Model.getModel);
router.route("/trashmodel/:id").delete(Model.trashModel);
router.route("/getpermodel/:id").get(Model.getPerModel)
router.route("/editmodel/:id").put(Model.editModel);

module.exports = router;