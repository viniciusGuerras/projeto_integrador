import AddMaterial from "./AddMaterial.jsx";
import AddRoom from "./AddRoom.jsx";
import AddUser from "./AddUser.jsx";
import Button from "../ui/Button.jsx";
import { useState } from "react";

export default function ManagePanel(){
    
    const handleSubmit = (registerData) => {
        addToList(prev => ({
            ...prev,
            [activeTab] : [...prev[activeTab], registerData]
        }));

        toggleOverlay(false);
    };

    const [activeTab, setActiveTab]      = useState("user");
    const [isOverlayOpen, toggleOverlay] = useState(false);

    const [list, addToList] = useState({
        user      : [],
        material  : [],
        classroom : []
    });

    const currentList = list[activeTab];

    const commonProps = {
        isOpen   : isOverlayOpen,
        onClose  : () => toggleOverlay(false),
        onSubmit : handleSubmit 
    };

    {/*Precisamos implementar estas funções*/}
    const onEdit = () =>{
        return null;
    }

    const onRemove = () => {
        return null;
    }
    
    const onInfo = () => {
        return null;
    }

    const overlay = () => {
        if (activeTab === "user"){
            return <AddUser     {...commonProps} />;
        }
        else if (activeTab === "classroom"){
            return <AddRoom     {...commonProps} />; 
        } 
        else{
            return <AddMaterial {...commonProps} />;
        }
    };

   const tableHeadings = () => {
        if (activeTab === "user") {
            return (
                <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th></th>
                </tr>
            );
        } else if (activeTab === "classroom") {
            return (
                <tr>
                    <th>Numeração</th>
                    <th>Especialização</th>
                    <th>Disponibilidade</th>
                    <th></th>
                </tr>
            )
        }  else {
            return (
                <tr>
                    <th>Numeração</th>
                    <th>Nome</th>
                    <th>Disponibilidade</th>
                    <th></th>
                </tr>
            )
        }
    };

    const tableElements = () => {
        if (activeTab === "user") {
            return currentList.map((item, index) => {
                return (
                    <tr key={index} 
                    className="odd:bg-slate-200 even:bg-white">
                        <td>{item.matricula}</td>
                        <td>{item.nome}</td>
                        <td>{item.tipo}</td>
                        <td>
                            <Button variant="ghost" size="md" onClick={onEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onRemove}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                            </Button>
                        </td>
                    </tr>
                );
            });
        } else if (activeTab === "classroom") {
            return currentList.map((item, index) => {
                return (
                    <tr key={index}
                    className="odd:bg-slate-200 even:bg-white">
                        <td>{item.numeracao}</td>
                        <td>{item.especializacao}</td>
                        <td>{item.disponibilidade}</td>
                        <td>
                            <Button variant="ghost" size="md" onClick={onEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onRemove}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                            </Button>
                        </td>
                    </tr>
                )
            })
        } else {
            return currentList.map((item, index) => {
                return (
                    <tr key={index}
                    className="odd:bg-slate-200 even:bg-white"> 
                        <td>{item.numeracao}</td>
                        <td>{item.nome}</td>
                        <td>{item.disponibilidade}</td>
                        <td>
                            <Button variant="ghost" size="md" onClick={onEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onRemove}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="md" onClick={onInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                            </Button>
                        </td>
                    </tr>
                )
            })
        }
    };


    return(
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="md:w-full lg:w-1/2 h-full bg-white p-6 rounded-md shadow-md flex flex-col gap-3">
                <h1 className="text-xl font-semibold">Cadastro</h1>
                <span className="border-b border-slate-300"></span> 
                <div className="flex">
                    <ul className="flex gap-3">
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "user" ? "outline outline-solid rounded outline-slate-300 font-semibold" : ""
                        }`}
                        onClick={ () => setActiveTab("user") }>Usuário</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "classroom" ? "outline outline-solid rounded outline-slate-300 font-semibold": ""
                        }`}
                       onClick={ () => setActiveTab("classroom") }>Sala</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${
                            activeTab === "material" ? "outline outline-solid rounded outline-slate-300 font-semibold": ""
                        }`}
                        onClick={ () => setActiveTab("material") }>Material</li>
                    </ul>
                    <button className= "ml-auto bg-slate-900 text-white" type="button" onClick={() => toggleOverlay(true)}>Novo Cadastro</button>
            </div>
                <table>
                    <thead>
                        {tableHeadings()}
                    </thead>
                    <tbody>
                        {tableElements()}
                    </tbody>
                </table>
            </div>
            {overlay()}
        </div>
    );
}
   