const { Router } = require("express");
const router = Router();

//const { json } = require("express");

const { getPasses, createPass, editPass, deletePass } = require ('../controllers/functions.controller');

router
  .route("/")
  .get(getPasses)
  .post(createPass);

router
  .route("/:id")
  .put(editPass)
  .delete(deletePass);

module.exports = router;
