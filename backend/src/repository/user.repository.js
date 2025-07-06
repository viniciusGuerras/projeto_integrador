const db = require("../config/db");

exports.findUserByRegistration = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM users WHERE matricula = $1", [id]);
    return result;
};

exports.findAllUsers = async () => {
    const result = await db.query("SELECT * FROM users");
    return result;
}

exports.createUser = async (user) => {
    const {
        matricula,
        senha,
        cpf,
        nome,
        telefone,
        email,
        datanc,
        tipo
    } = user;

    const result = await db.query(
        `INSERT INTO users (matricula, senha, cpf, nome, telefone, email, datanc, tipo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
            matricula,
            senha,
            cpf,
            nome,
            telefone,
            email,
            new Date(datanc), 
            tipo
        ]
    );

    return result;
};

