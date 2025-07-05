const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");

router.get("/", controller.getUsers);
router.post("/", controller.createUser);

router.get("/:userId", controller.getUserById);

module.exports = router;
