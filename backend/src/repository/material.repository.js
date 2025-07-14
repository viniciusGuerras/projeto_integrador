const db = require("../config/db");

exports.findMaterialByNumber = async (id) => {
    const result = await db.oneOrNone("SELECT * FROM material WHERE numeracao = $1", [id]);
    return result;
};

exports.findAllMaterials = async () => {
    const result = await db.query("SELECT * FROM material where ativo = true");
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
            nmrsala === '' ? null : nmrsala, 
            qtdmaterial === '' ? null : qtdmaterial,
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

exports.updateMaterial = async (numeracao, materialData) => {
    const {
        nmrsala,
        qtdmaterial, 
        disponibilidade, 
        quantidade, 
        nome, 
        dscr, 
        estado, 
        datacpra, 
        tipo
    } = materialData;

    const result = await db.query(
        `UPDATE material
         SET nmrsala = $2,
            qtdmaterial = $3,
            disponibilidade = $4,
            quantidade = $5,
            nome = $6,
            dscr = $7,
            estado = $8,
            datacpra = $9,
            tipo = $10
         WHERE numeracao = $1
         RETURNING *`,
        [
            numeracao,
            nmrsala,
            qtdmaterial === '' ? null : qtdmaterial,
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

exports.removeMaterial = async (numeracao) => {
    const result = await db.query(
    `UPDATE material
        SET 
            ativo = $2
        WHERE numeracao = $1
        RETURNING numeracao`,
    [
        numeracao,
        false
    ]);

    return result;
}

exports.changeStatus = async (numeracao) => {
    const material = await db.oneOrNone(
        `SELECT disponibilidade FROM material WHERE numeracao = $1`,
        [numeracao]
    );

    if (!material) {
        throw new Error("Material não encontrado");
    }

    const novaDisponibilidade = material.disponibilidade === "disponível"
        ? "indisponível"
        : "disponível";

    const result = await db.query(
        `UPDATE material
         SET disponibilidade = $2
         WHERE numeracao = $1
         RETURNING *`,
        [numeracao, novaDisponibilidade]
    );

    return result;
};
