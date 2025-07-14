import { useEffect } from "react";

export default function InfoUser({isOpen, onClose, user}) {
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
    
    if (!isOpen || !user) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold mb-4">Informações do Usuário</h2>
                <ul className="space-y-2">
                    <li><strong>Matrícula:</strong> {user.matricula}</li>
                    <li><strong>CPF:</strong> {user.cpf}</li>
                    <li><strong>Nome:</strong> {user.nome}</li>
                    <li><strong>Telefone:</strong> {user.telefone}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Data de Nascimento:</strong> {new Date(user.datanc).toLocaleDateString()}</li>
                    <li><strong>Tipo:</strong> {user.tipo}</li>
                </ul>
            </div>
        </div>
    );
}