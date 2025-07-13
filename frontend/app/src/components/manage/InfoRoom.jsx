import { useEffect } from "react";

export default function InfoRoom({isOpen, onClose, room}) {
    useEffect (() => {
        function handleEscape(event) {
            if (event.key === "Escape") onClose();
        }

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);
    
    if (!isOpen || !room) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold mb-4">Informações da Sala</h2>
                <ul className="space-y-2">
                    <li><strong>Numeração:</strong> {room.numeracao}</li>
                    <li><strong>Especificação:</strong> {room.especificacao}</li>
                    <li><strong>Disponibilidade:</strong> {room.disponibilidade}</li>
                    <li><strong>Qtd Cadeiras:</strong> {room.qtdcadeira}</li>
                </ul>
            </div>
        </div>
    );
}