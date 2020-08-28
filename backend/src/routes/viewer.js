const { Router } = require("express");
const router = Router();

//const { json } = require("express");

const { getPasses, getPass } = require("../controllers/viewer.controller");

router.route("/").get(getPasses);

router.route("/:id").get(getPass);

module.exports = router;
