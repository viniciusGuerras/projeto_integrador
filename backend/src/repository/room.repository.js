const db = require("../config/db");

exports.findRoomByNumber = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM sala WHERE numeracao = $1", [id]);
    return result;
};

exports.findAllRooms = async () => {
    const result = await db.query("SELECT * FROM room");
    return result;
}

exports.createRoom = async (room) => {
    const {
        numeracao,
        especificacao, 
        disponibilidade, 
        qtdcadeiras
    } = room;

    const result = await db.query(
        `INSERT INTO sala (numeracao, especificacao, disponibilidade, qtdcadeiras)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
            numeracao,
            especificacao,
            disponibilidade,
            qtdcadeiras, 
        ]
    );

    return result;
};