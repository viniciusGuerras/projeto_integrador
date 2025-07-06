const repository = require("../repository/room.repository"); 

exports.getRoomByNumber = async (req, res) => {
    const roomId = req.params.roomId;

    repository.findRoomByNumber(roomId)
    .then((fetchedRoom) => {
        if(!fetchedRoom) {
            res.status(404).json({ error: "Room not found"});
        }
        else {
            res.status(200).json({ message: "Room retrieved sucessfully", room : fetchedRoom});
        }
    })
    .catch((err) => {
        console.error("Error fetching room by number:", err);
        res.status(500).json({ message: "An error occurred" });
    });
};

exports.getRooms = (req, res) => {
    repository.findAllRooms()
        .then((roomList) => {
            if (roomList && roomListlength > 0) {
                res.status(200).json({ message: "Room fetched successfully", room: roomList});
            } 
            else {
                res.status(200).json({ message: "No rooms found", rooms: [] });
            }
        });
};

exports.createRoom = async (req, res) => {
    const { numeracao, especificacao, disponibilidade, qtdcadeiras } = req.body;
    console.log("req.body:", req.body);

    if (!numeracao || !especificacao || !disponibilidade || !qtdcadeiras) {
        return res.status(400).json({ error: 'Missing required room fields' });
    }

    try {
        
        const roomData = {
            numeracao,
            especificacao, 
            disponibilidade, 
            qtdcadeiras
        };

        const newRoom = await repository.createRoom(roomData); 

        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (err) {
        console.error("Error creating room:", err);
        res.status(500).json({
            error: "Error creating room",
            detail: err?.message || JSON.stringify(err)
        });
    }
};