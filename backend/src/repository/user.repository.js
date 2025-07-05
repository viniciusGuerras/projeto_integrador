const db = require("../config/db"); 

exports.findUserById = async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

exports.findAllUsers = async (id) => {
    const result = await db.query("SELECT * FROM users");
    return result.rows[0];
}

exports.createUser = async (user) => {
    const {Registration, Password, CPF, Name, Phone, Email, BirthDate, Type} = user;
    const result = await db.query(
        "INSERT INTO users (Registration, Password, CPF, Name, Phone, Email, BirthDate, Type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [Registration, Password, CPF, Name, Phone, Email, BirthDate, Type]
    );
    return result.rows[0];
};

