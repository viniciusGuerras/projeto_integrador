const repository = require("../repository/room.repository"); 

exports.getRoomByNumber = async (req, res) => {
    const roomId = req.params.classroomId; 

    repository.findRoomByNumber(roomId)
    .then((fetchedRoom) => {
        if(!fetchedRoom) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala recuperada com sucesso", classroom : fetchedRoom });
        }
    })
    .catch((err) => {
        console.error("Erro ao buscar sala pelo número:", err);
        res.status(500).json({ message: "Ocorreu um erro" });
    });
};

exports.getRooms = (req, res) => {
    repository.findAllRooms()
    .then((roomList) => {
        if (roomList && roomList.length > 0) {
            res.status(200).json({ message: "Salas recuperadas com sucesso", classrooms: roomList });
        } 
        else {
            res.status(200).json({ message: "Nenhuma sala encontrada", classrooms: [] });
        }
    });
};

exports.createRoom = async (req, res) => {
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
        const roomData = {
            numeracao,
            especificacao, 
            disponibilidade, 
            qtdcadeira
        };
        
        console.log("salvando", roomData);

        const newRoom = await repository.createRoom(roomData); 
        res.status(201).json({ message: "Sala criada com sucesso", room: newRoom});
    }
    catch (err) {
        console.error("Erro criando a sala:", err);
        res.status(500).json({
            error: "Erro criando a sala",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.updateRoom = async (req, res) => {
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
        const roomData = {
            numeracao,
            especificacao,
            disponibilidade,
            qtdcadeira
        };

        const updatedRoom = await repository.updateRoom(roomData);
        res.status(200).json({ message: "Sala atualizada com sucesso", room: updatedRoom });
    }
    catch (err){
        console.error("Erro atualizando sala:", err);
        res.status(500).json({
            error: "Erro atualizando sala",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

exports.removeRoom = async (req, res) => {

    const numeracao = req.params.numeracao; 

    repository.removeRoom(numeracao)
    .then((removedRoom) => {
        if(!removedRoom) {
            res.status(404).json({ error: "Sala não encontrada" });
        }
        else {
            res.status(200).json({ message: "Sala desativada com sucesso", user : removedRoom });
        }
    })
}