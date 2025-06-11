import { useState } from "react";
import PieChart from "../components/home/PieChart.jsx"
import Calendar from "../components/home/Calendar.jsx";

export default function Home(){
    const slateShades = [
        '#64748B', // slate-500
        '#94A3B8', // slate-400
        '#CBD5E1', // slate-300
    ];
    
    const [events, setEvent] = useState([]);
    const sampleData = [10, 20, 30];
    return(
        <div className="w-full h-full text-slate-900 p-8 flex flex-col items-start justify-center">
        <h1 className="mb-3">
            Home
        </h1>
        <div className="h-full w-full grid grid-cols-[.75fr_1fr_1fr] grid-rows-2 gap-4">
            <div className="w-full h-full bg-slate-200 row-span-2 rounded flex flex-col items-start justify-center p-6">
                <h2 className="text-2xl">Notificações</h2>
                <div className="h-full w-full">

                </div>
            </div> 
            <div className="bg-slate-200 rounded ">
            </div>
            <div className="bg-slate-200 row-span-2 rounded p-6 h-full w-full flex items-center justify-center">
                 <PieChart data={sampleData} colors={slateShades} />
            </div>

            <div className="bg-slate-200 rounded p-6 h-full w-full flex items-center justify-center"/>
        </div>
    </div>
    );
}