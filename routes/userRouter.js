const { register, login } = require("../controllers/userCtrl");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
