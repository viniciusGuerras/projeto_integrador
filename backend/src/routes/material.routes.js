const express = require("express");
const router = express.Router();
const controller = require("../controllers/material.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

router.get("/",            authenticateJWT, authorizeRoles('admin'), controller.getMaterials       );
router.post("/",           authenticateJWT, authorizeRoles('admin'), controller.createMaterial     );
router.get("/:materialId", authenticateJWT, authorizeRoles('admin'), controller.getMaterialByNumber);
router.patch("/:materialId", authenticateJWT, authorizeRoles('admin'), controller.updateMaterial);
router.patch("/:numeracao/status", authenticateJWT, authorizeRoles('admin'), controller.changeStatus);

module.exports = router;
