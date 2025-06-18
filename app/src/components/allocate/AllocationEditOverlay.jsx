import { useState } from "react";
import Button from "../ui/Button";

export default function AllocationEditOverlay({open, tab, onClose, onSubmit, initialData }) {
    const [selectedDay, setSelectedDay] = useState("");

    const handleSubmit = () => {
        if (!selectedDay){
            return; 
        }

        onSubmit({
            day: selectedDay
        });

        setSelectedDay("");
    };

    if (!open) return null;
    return (
        <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
        >
        <div
            className="flex flex-col gap-3 bg-slate-50 rounded-lg p-6 w-80"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-xl font-semibold mb-2">{tab}</h2>

            <label className="block mb-2 text-sm font-medium">
            modificar data da reserva
            </label>

            <input type="date" className="w-full bg-slate-200 mb-2"
            onChange={(e) => setSelectedDay(e.target.value)}
            ></input>

            <div className="flex justify-end gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
                Cancelar
            </Button>
            <Button
                variant="terciary"
                size="md"
                onClick={handleSubmit}
                disabled={!selectedDay}
            >
                Modificar
            </Button>
            </div>
        </div>
        </div>
    );
}
