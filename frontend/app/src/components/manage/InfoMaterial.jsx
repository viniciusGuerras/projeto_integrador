import { useEffect } from "react";

export default function InfoMaterial({isOpen, onClose, material}) {
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
    
    if (!isOpen || !material) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold mb-4">Informações do Material</h2>
                <ul className="space-y-2">
                    <li><strong>Numeração:</strong> {material.numeracao}</li>
                    <li><strong>Nome:</strong> {material.nome}</li>
                    <li><strong>Descrição:</strong> {material.dscr}</li>
                    <li><strong>Tipo:</strong> {material.tipo}</li>
                    <li><strong>Estado:</strong> {material.estado}</li>
                    <li><strong>Data de Compra:</strong> {new Date(material.datacpra).toLocaleDateString()}</li>
                    <li><strong>Disponibilidade:</strong> {material.disponibilidade}</li>
                    <li><strong>Quantidade:</strong> {material.quantidade}</li>
                    <li><strong>Sala:</strong> {material.nmrsala || "Não está associado a uma sala"}</li>
                    <li><strong>Qtd Material:</strong> {material.qtdmaterial || ""}</li>
                </ul>
            </div>
        </div>
    );
}