const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservation.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

router.get("/",               authenticateJWT, authorizeRoles('admin'), controller.getReservations);
router.post("/",              authenticateJWT, authorizeRoles('admin'), controller.createReservation);
router.get("/:matricula",     authenticateJWT, authorizeRoles('admin'), controller.getReservationByNumber);
router.patch("/:matricula" ,  authenticateJWT, authorizeRoles('admin'), controller.updateReservation);
router.delete("/:numeracao" , authenticateJWT, authorizeRoles('admin'), controller.removeReservation);

module.exports = router;
