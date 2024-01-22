const express = require('express');
const router = express.Router();

const Calltype = require("../controller/Calltype")

router.route("/addcalltype").post(Calltype.addCalltype);
router.route("/getcalltype").get(Calltype.getCalltype);
router.route("/trashcalltype/:id").delete(Calltype.trashCalltype);
router.route("/getpercalltype/:id").get(Calltype.getPerCalltype)
router.route("/editcalltype/:id").put(Calltype.editCalltype);

module.exports = router;