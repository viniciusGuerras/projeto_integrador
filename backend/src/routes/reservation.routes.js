const express = require("express");
const router = express.Router();
const controllerClassroom = require("../controllers/reservationClassroom.controller.js");
const controllerMaterial = require("../controllers/reservationMaterial.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

// (/reservation/classroom e etc) fazer reserva das salas
router.get("/classroom",               authenticateJWT, authorizeRoles('admin'), controllerClassroom.getClassroomReservations);
router.post("/classroom",              authenticateJWT, authorizeRoles('admin'), controllerClassroom.createClassroomReservation);
router.get("/classroom/:matricula",     authenticateJWT, authorizeRoles('admin'), controllerClassroom.getClassroomReservationByNumber);
router.patch("/classroom/:matricula" ,  authenticateJWT, authorizeRoles('admin'), controllerClassroom.updateClassroomReservation);
router.delete("/classroom/:numeracao" , authenticateJWT, authorizeRoles('admin'), controllerClassroom.removeClassroomReservation);

// (/reservation/material e etc) fazer reserva dos materiais
router.get("/material",               authenticateJWT, authorizeRoles('admin'), controllerMaterial.getMaterialReservations);
router.post("/material",              authenticateJWT, authorizeRoles('admin'), controllerMaterial.createMaterialReservation);
router.get("/material/:matricula",     authenticateJWT, authorizeRoles('admin'), controllerMaterial.getMaterialReservationById);
router.patch("/material/:matricula" ,  authenticateJWT, authorizeRoles('admin'), controllerMaterial.updateMaterialReservation);
router.delete("/material/:numeracao" , authenticateJWT, authorizeRoles('admin'), controllerMaterial.removeMaterialReservation);


module.exports = router;
