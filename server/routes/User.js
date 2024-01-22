const express = require('express');
const router = express.Router();

const User = require("../controller/User")

router.route("/adduser").post(User.addUser);
router.route("/getuser").get(User.getUser);
router.route("/trashuser/:id").delete(User.trashUser);
router.route("/getperuser/:id").get(User.getPerUser);
router.route("/edituser/:id").put(User.editUser);
router.route("/checkuserlogin").post(User.checkUserLogin);
router.route("/checkusereditlogin").post(User.checkUserEditLogin);
router.route("/updatestatus/:userId").put(User.updateStatus);

module.exports = router;