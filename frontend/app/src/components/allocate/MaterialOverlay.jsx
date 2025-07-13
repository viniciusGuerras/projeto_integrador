import { useState, useEffect } from "react";
import Button from "../ui/Button";

export default function MaterialOverlay({ open, tab,onClose, onSubmit }) {
    const [userm, setUserm] = useState("");
    const [hraula, setHraula] = useState("");
    const [nmrm, setNmrm] = useState("");
    const [dtdevolum, setDtdevolum] = useState("");
    const [materials, setMaterials] = useState([]);

    const token = localStorage.getItem("token");
    const registration = localStorage.getItem("identifier");

    useEffect(() => {
        fetch("http://localhost:3000/materials", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            const materiaisDisponiveis = data.materials.filter(
                mat => mat.ativo && mat.disponibilidade === "disponível"
            );
            setMaterials(materiaisDisponiveis);
        });
    }, []);

    const handleSubmit = () => {
        setUserm(registration);

        if (!registration || !hraula || !nmrm) {
            return;
        }

        onSubmit({
            userm: registration,
            hraula,
            nmrm: nmrm ? parseInt(nmrm) : null,
            dtdevolum: dtdevolum || null,
            ativo: true
        });

        setUserm("");
        setHraula("");
        setNmrm("");
        setDtdevolum("");
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="flex flex-col gap-3 bg-slate-50 rounded-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-2">{tab}</h2>

                <label className="text-sm font-medium">Hora da Aula (hraula)</label>
                <input
                    type="time"
                    value={hraula}
                    onChange={(e) => setHraula(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                />

                <label className="text-sm font-medium">Número do Material (nmrm)</label>
                <select
                    value={nmrm}
                    onChange={(e) => setNmrm(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                >
                    <option value="">Selecione um material...</option>
                    {materials.map(mat => (
                        <option key={mat.numeracao} value={mat.numeracao}>
                            {mat.descricao} ({mat.numeracao})
                        </option>
                    ))}
                </select>

                <label className="text-sm font-medium">Data Devolução (dtdevolum)</label>
                <input
                    type="date"
                    value={dtdevolum}
                    onChange={(e) => setDtdevolum(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" size="md" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="terciary"
                        size="md"
                        onClick={handleSubmit}
                        disabled={!hraula || !nmrm}
                    >
                        Reservar
                    </Button>
                </div>
            </div>
        </div>
    );
}
