const express = require("express");
const userCtrl = require("../Controllers/userController");
const verify = require("../middleware/verifyjwts");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);


module.exports = router;
