const db = require("../config/db");

exports.findRoomByNumber = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM sala WHERE numeracao = $1", [id]);
    return result;
};

exports.findAllRooms = async () => {
    const result = await db.query("SELECT * FROM sala");
    return result;
}

exports.createRoom = async (room) => {
    const {
        numeracao,
        especificacao, 
        disponibilidade, 
        qtdcadeira
    } = room;

    const result = await db.query(
        `INSERT INTO sala (numeracao, especificacao, disponibilidade, qtdcadeira)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            numeracao,
            especificacao,
            disponibilidade,
            qtdcadeira, 
        ]
    );

    return result;
};