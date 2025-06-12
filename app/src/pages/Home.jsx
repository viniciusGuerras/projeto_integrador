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
        <div className="box-border h-full w-full pl-6 pr-6  grid grid-cols-[1fr_.75fr_1fr] grid-rows-2 gap-2">
            <div className="w-full h-full bg-slate-200 text-slate-500 row-span-2 rounded flex flex-col items-start justify-center p-6">
                <h2 className="text-2xl">Notificações</h2>
                <div className="h-full w-full">
                </div>
            </div> 
            <div className=" bg-slate-200 rounded flex flex-col items-center justify-center  text-slate-500">
                Você possui
                <div className="text-9xl">
                    21
                </div>
                reservas feitas
            </div>
            <div className="bg-slate-200 row-span-2 rounded p-6 h-full w-full flex items-center justify-center">
                 <PieChart data={sampleData} colors={slateShades} />
            </div>

            <div className="bg-slate-200 text-slate-500 rounded h-full w-full flex items-center justify-center ">
                <Calendar />
            </div>

        </div>
    );
}