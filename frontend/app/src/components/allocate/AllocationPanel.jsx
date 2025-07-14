import AllocationCard from "./AllocationCard.jsx";
import Button from "../ui/Button";
import { act, useRef, useState } from "react";
import AllocationEditOverlay from "./AllocationEditOverlay.jsx"
import PrgAulaOverlay from "./PrgAulaOverlay.jsx";
import MaterialOverlay from "./MaterialOverlay.jsx";
import { useEffect } from "react";

export default function AllocationPanel({ title }) {
    const idCounter = useRef(1);

    const [activeTab, setActiveState] = useState("classrooms");
    const [overlayOpen, toggleOverlay] = useState(false);

    const [edittOverlayOpen, toggleEditOverlay] = useState(false);
    const [editTarget, setEditTarget] = useState(null);

    const classroomOptions = [{ label: "sala", value: "sala" }];
    const materialOptions = [{ label: "material", value: "material" }];

    const [allocations, setAllocations] = useState({
        classrooms: [],
        materials: [],
    });

    const fetchData = async () => {
        try {
            const classResponse = await fetch(`http://localhost:3000/reservation/classroom/user/${localStorage.getItem("identifier")}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const classData = await classResponse.json();
            console.log(classData);

            const materialResponse = await fetch(`http://localhost:3000/reservation/material/user/${localStorage.getItem("identifier")}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const materialData = await materialResponse.json();
            console.log(materialData);

            const formatAllocationClassrooms = (item) => ({
                key: idCounter.current++,
                subject: item.disciplina,
                identifier: `Sala ${item.nmrsala} - ${item.disciplina}`,
                day: item.dthoradevolus,
            });

            const formatAllocationMaterials = (item) => ({
                key: idCounter.current++,
                identifier: item.nome,
                day: item.dtddevolum,
            });

            let classrooms = []; let materials = [];
            if (classData.classreservations.length > 0) {
                classrooms = classData.classreservations.map(formatAllocationClassrooms);
            }
            if (materialData.materialsreservations.length > 0) {
                materials = materialData.materialsreservations.map(formatAllocationMaterials);
            }

            setAllocations({
                classrooms,
                materials,
            });
        } catch (error) {
            console.error("Erro ao carregar reservas:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (key) => {
        const toEdit = allocations[activeTab].find(i => i.key == key);
        setEditTarget(toEdit);
        toggleEditOverlay(true);
    };

    const handleEditSubmit = (updateData) => {
        setAllocations(prev => ({
            ...prev,
            [activeTab]: prev[activeTab].map(item => item.key == editTarget.key ? { ...item, ...updateData } : item)
        }));
        toggleEditOverlay(false);
        setEditTarget(null);
    }

    const handleRemove = key => {
        setAllocations(prev => (
            {
                ...prev,
                [activeTab]: [...prev[activeTab].filter(i => i.key != key)]
            }
        ))

    };

    const handleAllocations = async (reservationData) => {
        if (activeTab === "classrooms") {
            try {
                await fetch('http://localhost:3000/reservation/classroom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(reservationData),
                });

                await fetch(`http://localhost:3000/classrooms/${reservationData.nmrsala}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });

                console.log(reservationData)
            } catch (error) {
                console.error('Erro ao salvar alocação:', error);
            }
        }
        else {
            try {
                await fetch('http://localhost:3000/reservation/classroom', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(reservationData.prg_aula),
                });
                await fetch('http://localhost:3000/reservation/material', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(reservationData.rsr_material),
                });
                await fetch(`http://localhost:3000/materials/${reservationData.rsr_material.nmrm}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                console.log(reservationData)
            } catch (error) {
                console.error('Erro ao salvar alocação:', error);
            }
        }

        await fetchData();
        toggleOverlay(false)
    };

    const list = allocations[activeTab];

    return (
        <div className="w-4/6 h-full rounded-md p-3  flex flex-col gap-3 items-end bg-white shadow-sm">
            <h1 className="self-start text-slate-800 text-xl font-semibold px-3">{title}</h1>
            <span className="w-full border-b border-slate-300"></span>
            <ul className="w-full h-auto gap-3 flex flex-col sm:flex-row md:flex-row lg:flex-row text-slate-800 items-center justify-start">
                <li
                    className={`cursor-pointer px-3 py-1 rounded ${activeTab === "classrooms" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                        }`}
                    onClick={() => setActiveState("classrooms")}
                >salas
                </li>

                <li
                    className={`cursor-pointer px-3 py-1 rounded ${activeTab === "materials" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                        }`}
                    onClick={() => setActiveState("materials")}
                >materiais
                </li>

                <span className="w-full"></span>

                <Button variant="terciary" size="md" onClick={() => toggleOverlay(true)}>Nova Reserva</Button>

                {activeTab === "classrooms" ? (
                    <PrgAulaOverlay
                        tab="salas"
                        open={overlayOpen}
                        onClose={() => toggleOverlay(false)}
                        onSubmit={handleAllocations}
                    />
                ) : (
                    <MaterialOverlay
                        tab="materiais"
                        open={overlayOpen}
                        onClose={() => toggleOverlay(false)}
                        onSubmit={handleAllocations}
                    />
                )}

                <AllocationEditOverlay
                    tab={activeTab === "classrooms" ? "salas" : "materiais"}
                    options={activeTab === "classrooms" ? classroomOptions : materialOptions}
                    open={edittOverlayOpen}
                    onClose={() => {
                        toggleEditOverlay(false);
                        setEditTarget(null);
                    }}
                    onSubmit={handleEditSubmit}
                    initialData={editTarget}
                />
            </ul>

            <div className="w-full flex-1 rounded-lg">
                {list.map(
                    item => (
                        <AllocationCard
                            key={item.key}
                            identifier={item.identifier}
                            day={item.day}
                            onEdit={() => handleEdit(item.key)}
                            onRemove={() => handleRemove(item.key)}
                        />
                    ))}
            </div>
        </div>
    );
}