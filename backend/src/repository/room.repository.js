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
        especializacao, 
        disponibilidade, 
        qtdcadeira
    } = room;

    const result = await db.query(
        `INSERT INTO sala (numeracao, especializacao, disponibilidade, qtdcadeira)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            numeracao,
            especializacao,
            disponibilidade,
            qtdcadeira,
        ]
    );

    return result;
};

exports.updateRoom = async (roomData) => {
    const {
        numeracao,
        especializacao,
        disponibilidade,
        qtdcadeira
    } = roomData;

    const result = await db.query(
        `UPDATE sala
         SET especializacao = $2,
             disponibilidade = $3,
             qtdcadeira = $4
         WHERE numeracao = $1
         RETURNING *`,
        [
            numeracao,
            especializacao,
            disponibilidade,
            qtdcadeira
        ]
    );

    return result;
};

exports.removeRoom = async (numeracao) => {
    const result = await db.query(
        `UPDATE sala
        SET 
            ativo = $2
        WHERE numeracao = $1
        RETURNING numeracao, especializacao`,
    [
        numeracao,
        false
    ]);

    return result;
}

exports.changeStatus = async (numeracao) => {
    console.log("tentando mudar o status");

    const sala = await db.oneOrNone(
        `SELECT disponibilidade FROM sala WHERE numeracao = $1`,
        [numeracao]
    );

    
    console.log("status atual:", numeracao);

    if (!sala) {
        throw new Error("Sala não encontrada");
    }

    const novaDisponibilidade = sala.disponibilidade === "disponível"
        ? "indisponível"
        : "disponível";

    const result = await db.query(
        `UPDATE sala
         SET disponibilidade = $2
         WHERE numeracao = $1
         RETURNING *`,
        [numeracao, novaDisponibilidade]
    );


    console.log("status final:", novaDisponibilidade);

    return result;
};
