
const repository = require("../repository/reservationClassroom.repository"); 

exports.getClassroomReservationByNumber = async (req, res) => {
    const reservationId = req.params.classreservationId; 

    repository.findClassroomReservationByNumber(reservationId)
    .then((fetchedClassroomReservation) => {
        if(!fetchedClassroomReservation) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala recuperada com sucesso", classreservation : fetchedClassroomReservation });
        }
    })
    .catch((err) => {
        console.error("Erro ao buscar sala pelo número:", err);
        res.status(500).json({ message: "Ocorreu um erro" });
    });
};

exports.getClassroomReservations = (req, res) => {
    repository.findAllClassroomReservations()
    .then((reservationList) => {
        if (reservationList && reservationList.length > 0) {
            res.status(200).json({ message: "Salas recuperadas com sucesso", classreservations: reservationList });
        } 
        else {
            res.status(200).json({ message: "Nenhuma sala encontrada", classreservations: [] });
        }
    });
};

exports.createClassroomReservation = async (req, res) => {
    const { userm, hraula, nmrsala, dthoradevolus, turma, disciplina, qtdaula} = req.body;
    console.log("req.body, creating a classroom reservation:", req.body);

    if (!userm || !hraula || !turma || !disciplina || qtdaula == null) {
        return res.status(400).json({ error: 'Campos obrigatórios da reserva faltando' });
    }

    if (qtdaula < 1) {
        return res.status(400).json({ error: 'Quantidade de aulas deve ser maior que zero' });
    }

    try {
        const reservationData = {
            userm,
            hraula,
            nmrsala,
            dthoradevolus,
            turma,
            disciplina,
            qtdaula,
            ativo: true
        };

        console.log("Salvando reserva:", reservationData);

        const newClassroomReservation = await repository.createClassroomReservation(reservationData);
        res.status(201).json({ message: "Reserva criada com sucesso", reservation: newClassroomReservation });
    }
    catch (err) {
        console.error("Erro criando a reserva:", err);
        res.status(500).json({
            error: "Erro criando a reserva",
            detail: err?.message || JSON.stringify(err)
        });
    }
};


exports.updateClassroomReservation = async (req, res) => {
    const numeracao = req.params.numeracao; 

    const { especificacao, disponibilidade, qtdcadeira } = req.body;

    if (!especificacao || !disponibilidade || qtdcadeira === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios da sala faltando' });
    }

    if(qtdcadeira < 0){
        return res.status(400).json({ error: 'qtdcadeira precisa ser maior que zero' });
    }

    const allowedDisponibility = ['disponível', 'indisponível'];
    if (!allowedDisponibility.includes(disponibilidade.toLowerCase())) {
        return res.status(400).json({ error: `Disponibilidade precisa ter um valor de: ${allowedDisponibility.join(', ')}` });
    }

    console.log("Atualizando sala:", numeracao);

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

exports.removeClassroomReservation = async (req, res) => {

    const numeracao = req.params.numeracao; 

    repository.removeClassroomReservation(numeracao)
    .then((removedClassroomReservation) => {
        if(!removedClassroomReservation) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala desativada com sucesso", user : removedClassroomReservation });
        }
    })
}


exports.getQtdAulaFromReservation = async (req, res) => {
    const matricula = req.params.matricula; 
    const hora = req.params.hora;

    repository.getQtdAula(matricula, hora)
    .then((qtdAula) => {
        if(qtdAula){
            res.status(200).json({ message: "Quantidade de aula encontrada", quantidade : qtdAula});
        }
        else{
            res.status(404).json({ error: "Quantidade de aula não encontrada" });
        }
    })
}
