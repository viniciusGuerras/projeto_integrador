const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

router.get("/",              authenticateJWT, authorizeRoles('admin'), controller.getUsers             );
router.post("/",             authenticateJWT, authorizeRoles('admin'), controller.createUser           );
router.patch("/:matricula" , authenticateJWT, authorizeRoles('admin'), controller.updateUser           );
router.get("/:matricula"   , authenticateJWT, authorizeRoles('admin'), controller.getUserByRegistration);
router.delete("/:matricula", authenticateJWT, authorizeRoles('admin'), controller.removeUser           );

module.exports = router;
