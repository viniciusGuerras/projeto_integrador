const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

router.get("/",             authenticateJWT, authorizeRoles('admin', 'docente'), controller.getRooms       );
router.post("/",            authenticateJWT, authorizeRoles('admin'), controller.createRoom     );
router.get("/:numeracao", authenticateJWT, authorizeRoles('admin'), controller.getRoomByNumber);
router.patch("/:numeracao" , authenticateJWT, authorizeRoles('admin'), controller.updateRoom);
router.delete("/:numeracao" , authenticateJWT, authorizeRoles('admin'), controller.removeRoom);
router.patch("/:numeracao/status", authenticateJWT, authorizeRoles('admin', 'docente'), controller.changeStatus);

module.exports = router;
