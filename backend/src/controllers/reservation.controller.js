const repository = require("../repository/reservation.repository");

exports.getAllFiltered = async (req, res) => {
    try {
        const { type, sortBy, sortOrder, ativo } = req.query;

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
