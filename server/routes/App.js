const express = require('express');
const router = express.Router();

const App = require("../controller/App")

router.route("/userlogin").post(App.userLogin);

module.exports = router;