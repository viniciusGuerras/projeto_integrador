const repository = require("../repository/material.repository");

const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.getMaterialByNumber = async (req, res) => {
    const materialId = req.params.materialId;

    repository.findMaterialByNumber(materialId)
    .then((fetchedMaterial) => {
        if(!fetchedMaterial) {
            res.status(404).json({ error: "Material not found"});
        }
        else {
            res.status(200).json({ message: "Material retrieved sucessfully", material : fetchedMaterial});
        }
    })
    .catch((err) => {
        console.error("Error fetching material by number:", err);
        res.status(500).json({ message: "An error occurred" });
    });
};

exports.getMaterials = (req, res) => {
    repository.findAllMaterials()
        .then((materialList) => {
            if (materialList && materialList.length > 0) {
                res.status(200).json({ message: "Materials fetched successfully", materials: materialList });
            } 
            else {
                res.status(200).json({ message: "No materials found", materials: [] });
            }
        });
};

exports.createMaterial = async (req, res) => {
    const { numeracao, nmrsala, qtdmaterial, disponibilidade, quantidade, nome, dscr, estado, datacpra, tipo } = req.body;
    console.log("req.body:", req.body);

    if (!numeracao || !qtdmaterial || !disponibilidade || !quantidade || !nome || !dscr || !estado || !datacpra || !tipo) {
        return res.status(400).json({ error: 'Missing required material fields' });
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

        res.status(201).json({ message: "Material created successfully", material: newMaterial });
    } catch (err) {
        console.error("Error creating material:", err);
        res.status(500).json({
            error: "Error creating material",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

