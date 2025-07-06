const db = require("../config/db");

exports.findMaterialByNumber = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM material WHERE numeracao = $1", [id]);
    return result;
};

exports.findAllMaterials = async () => {
    const result = await db.query("SELECT * FROM material");
    return result;
}

exports.createMaterial = async (material) => {
    const {
        numeracao,
        nmrsala,
        qtdmaterial, 
        disponibilidade, 
        quantidade, 
        nome, 
        dscr, 
        estado, 
        datacpra, 
        tipo
    } = material;

    const result = await db.query(
        `INSERT INTO material (numeracao, nmrsala, qtdmaterial, disponibilidade, quantidade, nome, dscr, estado, datacpra, tipo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
            numeracao,
            nmrsala,
            qtdmaterial, 
            disponibilidade, 
            quantidade, 
            nome, 
            dscr, 
            estado, 
            new Date(datacpra), 
            tipo
        ]
    );

    return result;
};