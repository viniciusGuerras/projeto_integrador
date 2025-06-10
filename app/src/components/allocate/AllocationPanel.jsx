import AllocationCard from "./AllocationCard.jsx"; 
import MaterialAllocationOverlay from "./MaterialAllocationOverlay.jsx"
import Button from "../ui/Button";
import { useState } from "react";
import ClassroomAllocationOverlay from "./ClassroomAllocationOverlay.jsx";

export default function AllocationPanel(){
    const [activeTab, setActiveState] = useState("salas");
    const [overlayOpen, toggleOverlay] = useState(false);
    const [classroomAllocations, setClassroomItems] = useState([])
    const [materialsAllocations, setMaterialsItems] = useState([])

    const handleEdit = () => {
        return

    };

    const handleRemove = () => {
        return

    };

    const handleClassroomAllocation = (reservationData) => {
        const newAllocation = {
            identifier: reservationData.identifier,
            day: reservationData.day,
        }; 

        setClassroomItems(prevAllocations => [...prevAllocations, newAllocation])
        toggleOverlay(false)
    };

    const handleMaterialsAllocation = (reservationData) => {
        const newAllocation = {
            identifier: reservationData.identifier,
            day: reservationData.day,
        }; 

        setMaterialsItems(prevAllocations => [...prevAllocations, newAllocation])
        toggleOverlay(false)
    };

    const onSubmit = activeTab === "salas" 
        ? handleClassroomAllocation 
        : handleMaterialsAllocation;

    const Overlay = activeTab === "salas"  ?
            ClassroomAllocationOverlay:    
            MaterialAllocationOverlay;

    const list = activeTab === "salas"
        ? classroomAllocations 
        : materialsAllocations;

    return (
        <div className="w-4/6 h-full rounded-xl p-3  flex flex-col gap-3 items-end bg-slate-100">
            <ul className="w-full h-auto gap-3 flex text-slate-800 items-center justify-start">

                <li
                className={`cursor-pointer px-3 py-1 rounded ${
                activeTab === "salas" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                }`}
                onClick={() => setActiveState("salas")}
                >salas
                </li>

                <li
                className={`cursor-pointer px-3 py-1 rounded ${
                activeTab === "materiais" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                }`}
                onClick={() => setActiveState("materiais")}
                >materiais
                </li>

                <span className="w-full"></span>

                <Button variant="terciary" size="md" onClick={() => toggleOverlay(true)}>Nova Reserva</Button>

                <Overlay 
                    open={overlayOpen}
                    onClose={() => toggleOverlay(false)}
                    onSubmit={onSubmit}
                />

            </ul>

            <div className="w-full flex-1 rounded-lg"> 
                {list.map(
                    item => (
                        <AllocationCard 
                            key={item.identifier}
                            identifier={item.identifier}
                            day={item.day}
                            onEdit={handleEdit(item.identifier)}
                            onRemove={handleRemove(item.identifier)}
                        />
                ))}
            </div>
        </div>
    );
}