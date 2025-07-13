const db = require("../config/db");

exports.findMaterialReservationById = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM prg_aula WHERE id = $1", [id]);
    return result;
};

exports.findAllMaterialReservations = async () => {
    
};

exports.createMaterialReservation = async (reservation) => {
};

exports.updateMaterialReservation = async (id, reservationData) => {
};

exports.removeMaterialReservation = async (id) => {
};
