import { useState } from "react";
import Button from "../ui/Button";

export default function AllocationOverlay({ open, onClose, onSubmit }) {
    const [selectedIdentifier, setSelectedIdentifier] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const handleSubmit = () => {
        if (!selectedIdentifier || !selectedDay){
            return; 
        }

        onSubmit({
            identifier: selectedIdentifier,
            day: selectedDay
        });

        setSelectedIdentifier("");
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
            <h2 className="text-xl font-semibold mb-2">Nova Reserva</h2>

            <label className="block mb-2 text-sm font-medium">
            Selecione o material
            </label>
            <select
            className="block w-full mb-4 px-3 py-2 bg-slate-100 border rounded focus:outline-none"
            value={selectedIdentifier}
            onChange={(e) => setSelectedIdentifier(e.target.value)}
            >
            <option value="">--ESCOLHA--</option>
            <option value="material">material</option>
            </select>

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
                disabled={!selectedIdentifier || !selectedDay}
            >
                Reservar
            </Button>
            </div>
        </div>
        </div>
    );
}
