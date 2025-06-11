import { useState } from "react";
export default function Home(){
    
    const [events, setEvent] = useState([]);

    return(
        <div className="w-full h-full text-slate-900 p-8 flex flex-col items-start justify-center">
        <h1 className="mb-3">
            Home
        </h1>
        <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-4">
            <div className="bg-slate-200 row-span-3 rounded" />
            <div className="bg-slate-200 row-span-2 rounded" />
            <div className="bg-slate-200 rounded" />
            <div className="bg-slate-200 rounded" />
            <div className="bg-slate-200 rounded" />
            <div className="bg-slate-200 rounded" />
        </div>
    </div>
    );
}