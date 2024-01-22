const express = require("express");
const router = express.Router();

const Institute = require("../controller/Institute");

router.route("/addinstitute").post(Institute.addInstitute);
router.route("/getinstitute").get(Institute.getInstitute);
router.route("/trashinstitute/:id").delete(Institute.trashInstitute);
router.route("/getperrecordinstitute/:id").get(Institute.getPerRecordInstitute);
router.route("/editinstitute/:id").put(Institute.editInstitute);

module.exports = router;
