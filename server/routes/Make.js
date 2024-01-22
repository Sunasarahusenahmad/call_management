const express = require('express');
const router = express.Router();

const Make = require("../controller/Make")

router.route("/addmake").post(Make.addMake);
router.route("/getmake").get(Make.getMake);
router.route("/trashmake/:id").delete(Make.trashMake);
router.route("/getpermake/:id").get(Make.getPerMake);
router.route("/editmake/:id").put(Make.editMake);

module.exports = router;