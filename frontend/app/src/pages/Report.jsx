import { useEffect, useState } from "react";

export default function Report() {
    const [activeTab, setActiveTab] = useState("classrooms");
    const [data, setData] = useState([]);

    const [sortBy, setSortBy] = useState("nome");
    const [sortOrder, setSortOrder] = useState("ASC");
    const [ativo, setAtivo] = useState(true);

    const fetchData = async () => {
        let type;
        if (activeTab === "classrooms") {
            type = "sala";
        }
        else if (activeTab === "materials") {
            type = "material";
        }
        else {
            type = "all";
        }

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/reservation?type=${type}&sortBy=${sortBy}&sortOrder=${sortOrder}&ativo=${ativo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            const json = await res.json();
            console.log(json);
            setData(json.reservations || []);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, sortBy, sortOrder, ativo]);

    const headers = [
        "tipo", "nome", "matricula", "item", "horario",
        "turma", "disciplina", "qtdaula", "data_devolucao"
    ];

    return (
        <div className="w-full flex items-center justify-center gap-3">
            <div className="w-4/5 p-6 bg-white text-slate-600 rounded-xl flex flex-col gap-6">
                <h1 className="text-2xl text-slate-900 font-bold">Relatório</h1>

                <ul className="flex gap-4">
                    <li
                        className={`cursor-pointer px-4 py-2 rounded ${activeTab === "all" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        onClick={() => setActiveTab("all")}
                    >
                        Todos
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded ${activeTab === "classrooms" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        onClick={() => setActiveTab("classrooms")}
                    >
                        Salas
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded ${activeTab === "materials" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                            }`}
                        onClick={() => setActiveTab("materials")}
                    >
                        Materiais
                    </li>

                </ul>


                <div className="flex flex-wrap items-center gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Ordenar por</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border px-3 py-1 rounded bg-white"
                        >
                            <option value="nome">Nome</option>
                            <option value="matricula">Matrícula</option>
                            <option value="data">horário</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Ordem</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border px-3 py-1 rounded bg-white"
                        >
                            <option value="ASC">Ascendente</option>
                            <option value="DESC">Descendente</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                        <input
                            id="ativo"
                            type="checkbox"
                            checked={ativo}
                            onChange={() => setAtivo((prev) => !prev)}
                        />
                        <label htmlFor="ativo" className="text-sm">Ativo</label>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-left">
                        <thead className="bg-slate-100 text-slate-700 font-semibold">
                            <tr>
                                {headers.map((head) => (
                                    <th key={head} className="px-4 py-2 border">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    {headers.map((key) => (
                                        <td key={key} className="px-4 py-2 border">
                                            {key === "data_devolucao" && row[key]
                                                ? new Date(row[key]).toLocaleString()
                                                : row[key] ?? "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
