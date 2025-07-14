const db = require("../config/db");

exports.findMaterialReservationById = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM prg_aula JOIN rsr_material ON  WHERE id = $1", [id]);
    return result;
};


exports.findAllMaterialReservationsFromUser = async (registration) => {
    const result = await db.query(`
      SELECT * FROM rsr_material r
      JOIN material m ON r.nmrm = m.numeracao
      WHERE r.userm = '${registration}'
    `);
    return result;
};

exports.createMaterialReservation = async (reservation) => {
   const {
        userm,
        hraula,
        nmrm,
        dtdevolum,
        ativo
    } = reservation;

    await db.none(`   
    INSERT INTO rsr_material (
      userm, hraula, nmrm, dtddevolum, ativo
    ) VALUES ($1, $2, $3, $4, true)
    `, [
      userm,
      hraula,
      nmrm,
      new Date(dtdevolum)
    ]);
};

exports.findAllMaterialsReservations = async () => {
  const result = await db.query(
    `SELECT * FROM rsr_material r
    JOIN material m ON r.nmrm = m.numeracao`
  )
  return result;
}

exports.updateMaterialReservation = async (id, reservationData) => {
};

exports.removeMaterialReservation = async (numeracao) => {
    const result = await db.query(
        `UPDATE rsr_material
        SET 
            ativo = $2
        WHERE numeracao = $1
        RETURNING numeracao`,
    [
        numeracao,
        false
    ]);

    return result;
};
