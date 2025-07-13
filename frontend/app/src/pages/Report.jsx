import { useEffect, useState } from "react";

export default function Report() {
    const [activeTab, setActiveTab] = useState("classrooms");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const type = activeTab === "classrooms" ? "sala" : "material";

        try {
            const res = await fetch(`h?type=${type}`);
            const json = await res.json();
            setData(json.rows || []);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

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
                        className={`cursor-pointer px-4 py-2 rounded ${
                            activeTab === "classrooms" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                        }`}
                        onClick={() => setActiveTab("classrooms")}
                    >
                        Salas
                    </li>
                    <li
                        className={`cursor-pointer px-4 py-2 rounded ${
                            activeTab === "materials" ? "bg-slate-200 font-semibold" : "hover:bg-slate-100"
                        }`}
                        onClick={() => setActiveTab("materials")}
                    >
                        Materiais
                    </li>
                </ul>

                <div className="overflow-x-auto">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
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
                                                {row[key] ?? "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3M12 3v9" />
                        </svg>
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
