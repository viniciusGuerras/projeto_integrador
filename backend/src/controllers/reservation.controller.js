const repository = require("../repository/reservation.repository"); 

exports.getReservationByNumber = async (req, res) => {
    const reservationId = req.params.classreservationId; 

    repository.findReservationByNumber(reservationId)
    .then((fetchedReservation) => {
        if(!fetchedReservation) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala recuperada com sucesso", classreservation : fetchedReservation });
        }
    })
    .catch((err) => {
        console.error("Erro ao buscar sala pelo número:", err);
        res.status(500).json({ message: "Ocorreu um erro" });
    });
};

exports.getReservations = (req, res) => {
    repository.findAllReservations()
    .then((reservationList) => {
        if (reservationList && reservationList.length > 0) {
            res.status(200).json({ message: "Salas recuperadas com sucesso", classreservations: reservationList });
        } 
        else {
            res.status(200).json({ message: "Nenhuma sala encontrada", classreservations: [] });
        }
    });
};

exports.createReservation = async (req, res) => {
    const { numeracao, especificacao, disponibilidade, qtdcadeira } = req.body;
    console.log("req.body:", req.body);

    if (!numeracao || !especificacao || !disponibilidade || !qtdcadeira) {
        return res.status(400).json({ error: 'Campos obrigatórios da sala faltando' });
    }

    if(qtdcadeira < 0){
        return res.status(400).json({ error: 'qtdcadeira precisa ser maior que zero' });
    }
    
    const allowedDisponibility = ['disponível', 'indisponível'];
    if (!allowedDisponibility.includes(disponibilidade.toLowerCase())) {
        return res.status(400).json({ error: `Disponibilidade precisa ter um valor de: ${allowedDisponibility.join(', ')}` });
    }
    
    try {
        const reservationData = {
            numeracao,
            especificacao, 
            disponibilidade, 
            qtdcadeira
        };
        
        console.log("salvando", reservationData);

        const newReservation = await repository.createReservation(reservationData); 
        res.status(201).json({ message: "Sala criada com sucesso", reservation: newReservation});
    }
    catch (err) {
        console.error("Erro criando a sala:", err);
        res.status(500).json({
            error: "Erro criando a sala",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.updateReservation = async (req, res) => {
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

        const updatedReservation = await repository.updateReservation(reservationData);
        res.status(200).json({ message: "Sala atualizada com sucesso", reservation: updatedReservation });
    }
    catch (err){
        console.error("Erro atualizando sala:", err);
        res.status(500).json({
            error: "Erro atualizando sala",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.removeReservation = async (req, res) => {

    const numeracao = req.params.numeracao; 

    repository.removeReservation(numeracao)
    .then((removedReservation) => {
        if(!removedReservation) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala desativada com sucesso", user : removedReservation });
        }
    })
}