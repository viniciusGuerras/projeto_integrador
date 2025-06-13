import AllocationCard from "./AllocationCard.jsx"; 
import Button from "../ui/Button";
import {useRef, useState } from "react";
import AllocationOverlay from "./AllocationOverlay.jsx";
import AllocationEditOverlay from "./AllocationEditOverlay.jsx"

export default function AllocationPanel(){
    const idCounter = useRef(1);

    const [activeTab, setActiveState] = useState("classrooms");
    const [overlayOpen, toggleOverlay] = useState(false);

    const [edittOverlayOpen, toggleEditOverlay] = useState(false);
    const [editTarget, setEditTarget] = useState(null); 

    const classroomOptions = [{label:"sala", value:"sala"}];
    const materialOptions = [{label:"material",value:"material"}];

    const [allocations, setAllocations] = useState({
        classrooms:[],
        materials:[],
    });

    const handleEdit = (key) => {
        const toEdit = allocations[activeTab].find(i => i.key == key);
        setEditTarget(toEdit);
        toggleEditOverlay(true);
    };

    const handleEditSubmit = (updateData) => {
        setAllocations(prev => ({
            ...prev,
            [activeTab] : prev[activeTab].map(item => item.key == editTarget.key ? {...item, ...updateData} : item)
        }));
        toggleEditOverlay(false);
        setEditTarget(null);
    }

    const handleRemove = key => {
        setAllocations(prev => (
            {...prev, 
            [activeTab]: [...prev[activeTab].filter(i => i.key != key)]
            }
        ))

    };

    const handleAllocations = (reservationData) => {
        const newAllocation = {
            key: idCounter.current++,
            identifier: reservationData.identifier,
            day: reservationData.day,
        }; 

        setAllocations(prev => ({
            ...prev,
            [activeTab]: [...prev[activeTab], newAllocation],
        }));

        toggleOverlay(false)
    };

    const list = allocations[activeTab];

    return (
        <div className="w-4/6 h-full rounded-md p-3  flex flex-col gap-3 items-end bg-slate-200">
            <ul className="w-full h-auto gap-3 flex text-slate-800 items-center justify-start">

                <li
                className={`cursor-pointer px-3 py-1 rounded ${
                activeTab === "classrooms" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                }`}
                onClick={() => setActiveState("classrooms")}
                >salas
                </li>

                <li
                className={`cursor-pointer px-3 py-1 rounded ${
                activeTab === "materials" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                }`}
                onClick={() => setActiveState("materials")}
                >materiais
                </li>

                <span className="w-full"></span>

                <Button variant="terciary" size="md" onClick={() => toggleOverlay(true)}>Nova Reserva</Button>

                <AllocationOverlay 
                    tab= {activeTab === "classrooms" ? "salas" : "materiais"}
                    options = {activeTab === "classrooms" ? classroomOptions : materialOptions}
                    open={overlayOpen}
                    onClose={() => toggleOverlay(false)}
                    onSubmit={handleAllocations}
                />

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