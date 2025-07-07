const db = require("../config/db");

exports.findUserByRegistration = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM users WHERE matricula = $1", [id]);
    return result;
};

exports.findAllUsers = async () => {
    const result = await db.query("SELECT * FROM users WHERE ativo != false");
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
        `INSERT INTO users (matricula, senha, cpf, nome, telefone, email, datanc, tipo, ativo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING matricula, nome, tipo`,
        [
            matricula,
            senha,
            cpf,
            nome,
            telefone,
            email,
            new Date(datanc), 
            tipo, 
            true
        ]
    );

    return result;
};

exports.updateUser = async (updatedUser) => {
    const {
        matricula,
        senha,
        cpf,
        nome,
        telefone,
        email,
        datanc,
        tipo
    } = updatedUser;

    const result = await db.query(
        `UPDATE users
         SET senha = $2,
             cpf = $3,
             nome = $4,
             telefone = $5,
             email = $6,
             datanc = $7,
             tipo = $8
         WHERE matricula = $1
         RETURNING matricula, nome, tipo`,
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

exports.removeUser = async (matricula) => {
    const result = await db.query(
    `UPDATE users
        SET 
            ativo = $2
        WHERE matricula = $1
        RETURNING matricula, nome, tipo`,
    [
        matricula,
        false
    ]);

    return result;
}