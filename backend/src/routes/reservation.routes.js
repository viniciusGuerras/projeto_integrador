const express = require("express");
const router = express.Router();
const controllerClassroom = require("../controllers/reservationClassroom.controller.js");
const controllerMaterial = require("../controllers/reservationMaterial.controller.js");
const controller = require("../controllers/reservation.controller.js");
const { authenticateJWT, authorizeRoles } = require("../middleware/authMiddleware.js");

// (/reservation/classroom e etc) fazer reserva das salas
router.get("/classroom",                authenticateJWT, authorizeRoles('admin', 'docente'), controllerClassroom.getClassroomReservations);
router.post("/classroom",               authenticateJWT, authorizeRoles('admin', 'docente'), controllerClassroom.createClassroomReservation);
router.get("/classroom/:matricula",     authenticateJWT, authorizeRoles('admin'), controllerClassroom.getClassroomReservationByNumber);
router.get("/classroom/user/:matricula",     authenticateJWT, authorizeRoles('admin', 'docente'), controllerClassroom.getClassroomReservationByUser);
router.patch("/classroom/:matricula" ,  authenticateJWT, authorizeRoles('admin'), controllerClassroom.updateClassroomReservation);
router.delete("/classroom/:numeracao" , authenticateJWT, authorizeRoles('admin', 'docente'), controllerClassroom.removeClassroomReservation);

// (/reservation/material e etc) fazer reserva dos materiais
router.get("/material",               authenticateJWT, authorizeRoles('admin', 'docente'), controllerMaterial.getMaterialReservations);
router.post("/material",              authenticateJWT, authorizeRoles('admin', 'docente'), controllerMaterial.createMaterialReservation);
router.get("/material/:matricula",     authenticateJWT, authorizeRoles('admin'), controllerMaterial.getMaterialReservationById);
router.get("/material/user/:matricula",     authenticateJWT, authorizeRoles('admin', 'docente'), controllerMaterial.getMaterialReservationsByUser);
router.patch("/material/:matricula" ,  authenticateJWT, authorizeRoles('admin'), controllerMaterial.updateMaterialReservation);
router.delete("/material/:numeracao" , authenticateJWT, authorizeRoles('admin', 'docente'), controllerMaterial.removeMaterialReservation);

router.get("/", authenticateJWT, authorizeRoles('admin'), controller.getAllFiltered);

module.exports = router;
