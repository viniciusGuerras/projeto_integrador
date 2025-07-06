const repository = require("../repository/material.repository");

const getMaterialByNumber = async (req, res) => {
    const materialId = req.params.materialId;
    repository.findMaterialByNumber(materialId)
    .then((fetchedMaterial) => {
        if (!fetchedMaterial) => {
            res.
        }
    })
}