import { useState } from "react";
import Button from "../ui/Button";
import { useEffect } from "react";

export default function PrgAulaOverlay({ open, tab, onClose, onSubmit }) {
    const [userm, setUserm] = useState("");
    const [hraula, setHraula] = useState("");
    const [nmrsala, setNmrsala] = useState("");
    const [dthoradevolus, setDthoradevolus] = useState("");
    const [turma, setTurma] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [qtdaula, setQtdaula] = useState("");

    const [classrooms, setClassrooms] = useState([]);
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:3000/classrooms", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        }).then(res => res.json())
            .then(data => {
                const salasDisponiveis = data.classrooms.filter(
                    sala => sala.ativo && sala.disponibilidade === "disponível"
                );
                setClassrooms(salasDisponiveis);
            });
    }, []);

    const registration = localStorage.getItem("identifier");

    const handleSubmit = () => {

        setUserm(registration);
        
        if (!userm || !hraula || !turma || !disciplina || !qtdaula) {
            return;
        }

        onSubmit({
            userm : registration,
            hraula,
            nmrsala: nmrsala ? parseInt(nmrsala) : null,
            dthoradevolus: dthoradevolus || null,
            turma,
            disciplina,
            qtdaula: parseInt(qtdaula),
            ativo: true
        });

        setUserm("");
        setHraula("");
        setNmrsala("");
        setDthoradevolus("");
        setTurma("");
        setDisciplina("");
        setQtdaula("");
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

                <label className="text-sm font-medium">Número da Sala (nmrsala)</label>
                <select
                    value={nmrsala}
                    onChange={(e) => setNmrsala(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                    required
                >
                    <option value="">Selecione uma sala...</option>
                    {classrooms.map(room => (
                        <option
                            key={room.numeracao}
                            value={room.numeracao}
                        >
                            {room.especificacao} ({room.numeracao})
                        </option>
                    ))}
                </select>

                <label className="text-sm font-medium">Data Devolução (dthoradevolus)</label>
                <input
                    type="date"
                    value={dthoradevolus}
                    onChange={(e) => setDthoradevolus(e.target.value)}
                    className="w-full bg-slate-200 px-3 py-1.5 rounded"
                />

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

                <label className="text-sm font-medium">Quantidade de Aulas (qtdaula)</label>
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
                        disabled={!hraula || !turma || !disciplina || !qtdaula}
                    >
                        Reservar
                    </Button>
                </div>
            </div>
        </div>
    );
}
