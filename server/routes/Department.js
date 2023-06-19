const express = require('express');
const router = express.Router();

const Department = require("../controller/Department")

router.route("/adddepartment").post(Department.addDepartment);
router.route("/getdepartment").get(Department.getDepartment);
router.route("/trashdepartment/:id").delete(Department.trashDepartment);
router.route("/getperdepartment/:id").get(Department.getPerDepartment)
router.route("/editdepartment/:id").put(Department.editDepartment);

module.exports = router;