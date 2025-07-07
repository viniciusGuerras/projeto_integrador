import AddMaterial from "./AddMaterial.jsx"
import AddRoom from "./AddRoom.jsx"
import AddUser from "./AddUser.jsx"
import { useState } from "react";

export default function ManagePanel(){
    const [activeTab, setActiveTab] = useState("user");
    const [isOverlayOpen, toggleOverlay] = useState(false);

    const overlay = () => {
        if(activeTab === "user"){return <AddUser isOpen={isOverlayOpen} onClose={() => toggleOverlay(false)}/>; }
        else if(activeTab === "classroom"){ return <AddRoom isOpen={isOverlayOpen} onClose={() => toggleOverlay(false)}/>; } 
        else{ return <AddMaterial isOpen={isOverlayOpen} onClose={() => toggleOverlay(false)}/>; }
    };

    return(
        <div className="w-full min-h-screenS flex items-center justify-center">
            <div className="w-1/2 h-full bg-white p-6 rounded-md shadow-md flex flex-col gap-3">
                <h1 className="text-xl font-semibold">Cadastro</h1>
                <span className="border-b border-slate-300"></span> 
                <div className="flex">
                    <ul className="flex gap-3">
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "user" ? "outline outline-solid outline-slate-300 font-semibold" : ""
                        }`}
                        onClick={ () => setActiveTab("user") }>Usuário</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "classroom" ? "outline outline-solid outline-slate-300 font-semibold": ""
                        }`}
                       onClick={ () => setActiveTab("classroom") }>Sala</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "material" ? "outline outline-solid outline-slate-300 font-semibold": ""
                        }`}
                        onClick={ () => setActiveTab("material") }>Material</li>
                    </ul>
                    <button className= "ml-auto bg-slate-900 text-white" type="button" onClick={() => toggleOverlay(true)}> Novo Cadastro</button>
                </div>
            </div>
            {overlay()}
            <div>
                
            </div>
        </div>
    );
}
   