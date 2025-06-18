import { useState } from "react";

export default function Report(){
    const [activeTab, setActiveTab] = useState("classrooms")

    return(
        <div className="w-full flex items-center justify-center gap-3">
            <div className="w-1/3 h-1/3 p-6 bg-white text-slate-500 rounded-xl flex flex-col">
                <ul className="flex w-full items-start">
                    <li
                    className={`cursor-pointer px-3 py-1 rounded ${
                    activeTab === "classrooms" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                    }`}
                    onClick={() => setActiveTab("classrooms")}
                    >salas
                    </li>

                    <li
                    className={`cursor-pointer px-3 py-1 rounded ${
                    activeTab === "materials" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                    }`}
                    onClick={() => setActiveTab("materials")}
                    >materiais
                    </li>
                </ul>

                <div className="flex flex-grow gap-4 items-center justify-center">
                    <h1>Download</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}