const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

router.get("/",             authenticateJWT, authorizeRoles('admin'), controller.getRooms       );
router.post("/",            authenticateJWT, authorizeRoles('admin'), controller.createRoom     );
router.get("/:classroomId", authenticateJWT, authorizeRoles('admin'), controller.getRoomByNumber);

module.exports = router;
