import { useState } from "react";
import PieChart from "../components/home/PieChart.jsx";
import Calendar from "../components/home/Calendar.jsx";

export default function Home() {

    //placeholder data for pie chart
    const slateShades = [
        '#64748B', // slate-500
        '#94A3B8', // slate-400
        '#CBD5E1', // slate-300
    ];
    const sampleData = [10, 20, 30];

    return (
        <div className="px-16 grid grid-cols-[1fr_.75fr_1fr] grid-rows-2 gap-3">

            <div className="bg-white row-span-2 text-slate-800 row-span rounded-lg shadow-sm flex flex-col items-start justify-start p-6">
                <div className="flex gap-2 items-center justify-center"> 
                    <h2 className="text-xl font-semibold">Notificações</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>

                <div className="h-full w-full">
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center text-slate-500 p-6">
                <div className="text-center">
                    <p>Você possui</p>
                    <div className="text-9xl">21</div>
                    <p>reservas feitas</p>
                </div>
            </div>


            <div className="bg-white row-span-2 rounded-lg shadow-sm p-6 h-full w-full flex flex-col items-start">
                <h2 className="text-xl font-semibold mb-2">Distribuição de Reservas</h2>
                <div className="flex-grow w-full flex items-center justify-center">
                    <PieChart data={sampleData} colors={slateShades} />
                </div>
            </div>

            <div className="bg-white text-slate-500 rounded-lg shadow-sm h-full w-full flex flex-col items-start justify-start">
                <div className="flex-grow w-full flex items-center justify-center">
                    <Calendar />
                </div>
            </div>

        </div>
    );
}
