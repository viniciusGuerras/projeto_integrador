import { useState, useEffect } from "react";
import Button from "../ui/Button";

export default function MaterialOverlay({ open, tab, onClose, onSubmit }) {
    const [userm, setUserm] = useState("");
    const [hraula, setHraula] = useState("");
    const [nmrm, setNmrm] = useState("");
    const [materials, setMaterials] = useState([]);
    const [turma, setTurma] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [qtdaula, setQtdaula] = useState("");

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

    const handleSubmit = async () => {
        setUserm(registration);

        if (!registration || !hraula || !nmrm) {
            return;
        }

        if (!qtdaula || isNaN(qtdaula)) {
            alert("Quantidade inválida retornada do servidor.");
            return;
        }

        const minutosAdicionais = parseInt(qtdaula) * 45;
        const inicio = new Date(hraula);
        const fim = new Date(inicio.getTime() + minutosAdicionais * 60000);

        let prg_aula = {
            userm: registration,
            nmrsala: "",
            hraula,
            dthoradevolus: fim,
            turma,            
            disciplina,       
            qtdaula: parseInt(qtdaula),
            ativo: true,
        };

        let rsr_material = {
            userm: registration,
            hraula,
            nmrm,
            dtdevolum: fim,
            ativo: true,
        };

        onSubmit({ prg_aula, rsr_material });

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

                <label className="text-sm font-medium">Hora da Aula</label>
                <input
                    type="date"
                    value={hraula}
                    onChange={(e) => setHraula(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                />

                <label className="text-sm font-medium">Número do Material</label>
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

                <label className="text-sm font-medium">Turma</label>
                <input
                    type="text"
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                />

                <label className="text-sm font-medium">Disciplina</label>
                <input
                    type="text"
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                />

                <label className="text-sm font-medium">Quantidade de Aulas</label>
                <input
                    type="number"
                    value={qtdaula}
                    onChange={(e) => setQtdaula(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
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
