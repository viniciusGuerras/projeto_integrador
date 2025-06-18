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
        <div className="h-full w-full flex flex-col items-center justify-center px-16 gap-3">
            <div className="grid grid-cols-[1fr_.75fr_1fr] grid-rows-2 gap-3">

                <div className="bg-white text-slate-800 row-span-2 rounded-lg shadow-sm flex flex-col items-start justify-start p-6">
                    <div className="flex gap-2 items-center justify-center"> 
                        <h2 className="text-xl font-semibold mb-4">Notificações</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </div>
                    <div className="h-full w-full flex flex-col gap-2">
                        <div className="flex flex-col items-start border-b border-slate-200 p-4 bg-red-100 rounded-md"><h3 className="font-bold">Alerta</h3><p>Tranque a porta</p></div>
                        <div className="flex flex-col items-start border-b border-slate-200 p-4 bg-yellow-100 rounded-md"><h3 className="font-bold">Aviso</h3><p>Lambemos sua nuca</p></div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center text-slate-500 p-6">
                    <div className="text-center text-slate-900">
                        <p>Você possui</p>
                        <div className="text-9xl text-sky-500">21</div>
                        <p>reservas feitas</p>
                    </div>
                </div>



                <div className="bg-white rounded-lg shadow-sm p-6 h-full w-full flex flex-col items-start">
                    <div className="flex-grow w-full flex items-center justify-center">
                        <PieChart data={sampleData} colors={slateShades} />
                    </div>
                </div>


                <div className="bg-white text-slate-500 rounded-lg shadow-sm h-full w-full flex flex-col items-start justify-start">
                    <div className="flex-grow w-full flex items-center justify-center">
                        <Calendar />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-md text-slate-900 flex justify-center items-center p-6"><p className="text-center">Materiais</p></div>
                    <div className="bg-white rounded-md text-slate-900 flex justify-center items-center p-6"><p className="text-center">Salas</p></div>
                    <div className="bg-white rounded-md text-slate-900 flex justify-center items-center p-6"><p className="text-center">pendentes</p></div>
                </div>

        </div>
    </div>
    );
}
