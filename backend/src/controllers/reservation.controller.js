const repository = require("../repository/reservation.repository");

const parseBoolean = (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
};

exports.getAllFiltered = async (req, res) => {
    try {
        let { type, sortBy, sortOrder, ativo } = req.query;
        ativo = parseBoolean(ativo);

        const reservationList = await repository.reservationReportQuery({
            type,
            sortBy,
            sortOrder,
            ativo
        });

        if (reservationList && reservationList.length > 0) {
            res.status(200).json({ message: "reservas recuperadas com sucesso", reservations: reservationList });
        } else {
            res.status(200).json({ message: "Nenhuma reserva encontrada", reservations: [] });
        }
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        res.status(500).json({ message: "Erro interno ao buscar reservas" });
    }
};
