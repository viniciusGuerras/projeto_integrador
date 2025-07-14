const repository = require("../repository/reservationMaterial.repository");

exports.getMaterialReservationById = async (req, res) => {
    const reservationId = req.params.materialReservationId;

    repository.findMaterialReservationByNumber(reservationId)
        .then((fetchedMaterialReservation) => {
            if (!fetchedMaterialReservation) {
                res.status(404).json({ error: "Reserva de material não encontrada" });
            }
            else {
                res.status(200).json({ message: "Reserva de material recuperada com sucesso", materialreservation: fetchedMaterialReservation });
            }
        })
        .catch((err) => {
            console.error("Erro ao buscar reserva pelo número:", err);
            res.status(500).json({ message: "Ocorreu um erro" });
        });
};

exports.getMaterialReservations = (req, res) => {
    repository.findAllMaterialsReservations()
        .then((reservationList) => {
            if (reservationList && reservationList.length > 0) {
                res.status(200).json({ message: "Reservas de materiais recuperadas com sucesso", materialsreservations: reservationList });
            } 
            else {
                res.status(200).json({ message: "Nenhuma reserva encontrado", materialreservations: [] });
            }
        });
};

exports.createMaterialReservation = async (req, res) => {
    const { userm, hraula, nmrmaterial, dthoradevolus, turma, disciplina, qtdaula, dtdevolum} = req.body;
    console.log("req.body, creating material reservation:", req.body);

    if (!userm || !nmrmaterial || !hraula || !turma || !disciplina || qtdaula == null) {
        return res.status(400).json({ error: 'Campos obrigatórios da reserva faltando' });
    }

    if (qtdaula < 1) {
        return res.status(400).json({ error: 'Quantidade de aulas deve ser maior que zero' });
    }

    try {
        const reservationData = {
            userm,
            hraula,
            nmrm,
            dthoradevolus,
            turma,
            disciplina,
            qtdaula,
            dtdevolum,
            ativo: true
        };

        console.log("Salvando reserva:", reservationData);

        const newMaterialReservation = await repository.createMaterialReservation(reservationData);
        res.status(201).json({ message: "Reserva criada com sucesso", reservation: newMaterialReservation });
    }
    catch (err) {
        console.error("Erro criando a reserva:", err);
        res.status(500).json({
            error: "Erro criando a reserva",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.updateMaterialReservation = async (req, res) => {
const numeracao = req.params.numeracao; 

    const { nmrsala, qtdmaterial, disponibilidade, quantidade, nome, dscr, estado, datacpra, tipo } = req.body;

    if (!nmrsala || !qtdmaterial || !disponibilidade || !quantidade || !nome || !dscr || !estado || !datacpra || !tipo === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios da sala faltando' });
    }

    const allowedDisponibility = ['disponível', 'indisponível'];
    if (!allowedDisponibility.includes(disponibilidade.toLowerCase())) {
        return res.status(400).json({ error: `Disponibilidade precisa ter um valor de: ${allowedDisponibility.join(', ')}` });
    }

    console.log("Atualizando Material:", numeracao);

    try {
        const reservationData = {
            numeracao,
            especificacao,
            disponibilidade,
            qtdcadeira
        };

        const updatedClassroomReservation = await repository.updateClassroomReservation(reservationData);
        res.status(200).json({ message: "Sala atualizada com sucesso", reservation: updatedClassroomReservation });
    }
    catch (err){
        console.error("Erro atualizando sala:", err);
        res.status(500).json({
            error: "Erro atualizando sala",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.removeMaterialReservation = async (req, res) => {
};
