const express = require("express");
const router = express.Router();
const controller = require("../controllers/material.controller.js");

router.get("/", controller.getMaterials);
router.post("/", controller.createMaterial);
router.get("/:materialId", controller.getMaterialByNumber);

module.exports = router;
