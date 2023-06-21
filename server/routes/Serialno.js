const express = require('express');
const router = express.Router();

const Serialno = require("../controller/Serialno")

router.route("/addserialno").post(Serialno.addSerialno);
router.route("/getserialno").get(Serialno.getSerialno);
router.route("/trashserialno/:id").delete(Serialno.trashSerialno);
router.route("/getperserialno/:id").get(Serialno.getPerSerialno);
router.route("/checkserialno").post(Serialno.checkSerialno);
router.route("/checkeditserialno").post(Serialno.checkEditSerialno);
router.route("/selectedModels/:makeId").get(Serialno.selectedModels);
router.route("/editserialno/:id").put(Serialno.editSerialno);

module.exports = router;