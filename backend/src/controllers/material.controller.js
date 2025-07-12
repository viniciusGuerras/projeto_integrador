const repository = require("../repository/material.repository");

exports.getMaterialByNumber = async (req, res) => {
    const materialId = req.params.materialId;

    repository.findMaterialByNumber(materialId)
    .then((fetchedMaterial) => {
        if(!fetchedMaterial) {
            res.status(404).json({ error: "Material não encontrado" });
        }
        else {
            res.status(200).json({ message: "Material recuperado com sucesso", material : fetchedMaterial });
        }
    })
    .catch((err) => {
        console.error("Erro procurando material:", err);
        res.status(500).json({ message: "Um erro ocorreu" });
    });
};

exports.getMaterials = (req, res) => {
    repository.findAllMaterials()
        .then((materialList) => {
            if (materialList && materialList.length > 0) {
                res.status(200).json({ message: "Material encontrado com sucesso", materials: materialList });
            } 
            else {
                res.status(200).json({ message: "Nenhum material encontrado.", materials: [] });
            }
        });
};

exports.createMaterial = async (req, res) => {
    const { numeracao, nmrsala, qtdmaterial, disponibilidade, quantidade, nome, dscr, estado, datacpra, tipo } = req.body;
    console.log("req.body:", req.body);

    if (!numeracao || !qtdmaterial || !disponibilidade || !quantidade || !nome || !dscr || !estado || !datacpra || !tipo) {
        return res.status(400).json({ error: 'Faltando campos do material' });
    }

    try {
        
        const materialData = {
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
        };

        const newMaterial = await repository.createMaterial(materialData); 

        res.status(201).json({ message: "Material criado com sucesso", material: newMaterial });
    } catch (err) {
        console.error("Erro criando o material:", err);
        res.status(500).json({
            error: "Erro criando o material",
            detail: err?.message || JSON.stringify(err)
        });
    }
};
