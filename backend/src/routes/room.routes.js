const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller.js");

router.get("/", controller.getRooms);
router.post("/", controller.createRoom);
router.get("/:materialId", controller.getRoomByNumber);

module.exports = router;
