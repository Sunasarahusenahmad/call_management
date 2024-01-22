const express = require('express');
const router = express.Router();

const App = require("../controller/App")

router.route("/userlogin").post(App.userLogin);
router.route("/adminlogin").post(App.adminLogin);

module.exports = router;