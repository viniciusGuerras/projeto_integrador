const db = require("../config/db");

exports.findClassroomReservationById = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM prg_aula WHERE id = $1", [id]);
    return result;
};

exports.findAllClassroomReservations = async () => {
    const result = await db.query("SELECT * FROM prg_aula p JOIN sala s ON p.nmrsala = s.numeracao");
    return result;
};

exports.createClassroomReservation = async (reservation) => {
    const {
        userm,
        hraula,
        nmrsala,
        dthoradevolus,
        turma,
        disciplina,
        qtdaula,
        ativo
    } = reservation;

    const result = await db.query(
        `INSERT INTO prg_aula (
            userm, hraula, nmrsala, dthoradevolus,
            turma, disciplina, qtdaula, ativo
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
            userm,
            hraula === null ? null : hraula,
            nmrsala === '' ? null : parseInt(nmrsala),
            dthoradevolus ? new Date(dthoradevolus) : null,
            turma,
            disciplina,
            parseInt(qtdaula),
            ativo 
        ]
    );

    return result;
};

exports.updateClassroomReservation = async (id, reservationData) => {
    const {
        hraula,
        nmrsala,
        dthoradevolus,
        turma,
        disciplina,
        qtdaula,
        ativo
    } = reservationData;

    const result = await db.query(
        `UPDATE prg_aula
         SET hraula = $2,
             nmrsala = $3,
             dthoradevolus = $4,
             turma = $5,
             disciplina = $6,
             qtdaula = $7,
             ativo = $8
         WHERE id = $1
         RETURNING *`,
        [
            id,
            hraula,
            nmrsala === '' ? null : parseInt(nmrsala),
            dthoradevolus ? new Date(dthoradevolus) : null,
            turma,
            disciplina,
            parseInt(qtdaula),
            ativo !== false
        ]
    );

    return result;
};

exports.removeClassroomReservation = async (id) => {
    const result = await db.query(
        `UPDATE prg_aula
         SET ativo = false
         WHERE id = $1
         RETURNING id`,
        [id]
    );

    return result;
};

exports.getQtdAula = async (id, hora) => {
    const result = await db.query(
        `SELECT qtdaula FROM prg_aula WHERE userm = $1 AND hraula = $2`, [id, hora] 
    );

    return result;
}
