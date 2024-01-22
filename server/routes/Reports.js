const express = require("express");
const router = express.Router();

const Report = require("../controller/Reports");

router.route("/getreport").post(Report.getReport);
router
  .route("/selecteddepartment/:instituteid")
  .get(Report.getSelectedDepartment);
router.route("/selectedmodel/:makeid").get(Report.getSelectedModel);

module.exports = router;
