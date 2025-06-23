import AddMaterial from "./AddMaterial.jsx";
import AddRoom from "./AddRoom.jsx";
import AddUser from "./AddUser.jsx";
import { useState } from "react";

export default function ManagePanel(){
    {/* precisamos fazer um estado para cada lista de items {usuarios, materiais e salas} */}
    
    {/* função utilizada ao submeter o pop-up de criação (chamada no commonProps)*/}
    const handleSubmit = (registerData) => {
        addToList(prev => ({
            ...prev,
            [activeTab] : [...prev[activeTab], registerData]
        }));

        toggleOverlay(false);
    };

    {/*salva a boolean activeTab (usuario, sala ou material) e a boolean isOverlayOpen (se o pop-up esta aparecendo)*/}
    const [activeTab, setActiveTab]      = useState("user");
    const [isOverlayOpen, toggleOverlay] = useState(false);


    {/*lista que salva as três listas principais*/}
    const [list, addToList] = useState({
        user      : [],
        material  : [],
        classroom : []
    });

    {/*currentList vai guardar a lista atual utilizada (list[user], list[material], list[classroom]*/}
    const currentList = list[activeTab];

    {/*commonProps são coisas que os pop-ups usam em comum como a função de submenter, de fechar e a boolean para saber se esta aberta (isOpen)*/}
    const commonProps = {
        isOpen   : isOverlayOpen,
        onClose  : () => toggleOverlay(false),
        onSubmit : handleSubmit 
    };

    {/*gera um popup com base na tab ativa*/}
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

    {/*
        para fazer a 1. precisamos criar uma variável que depende do activeTab para trocar o <thead>
    */}

   const tableHeadings = () => {
        if (activeTab === "user") {
            return (
                <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                </tr>
            );
        } else if (activeTab === "classroom") {
            return (
                <tr>
                    <th>Numeração</th>
                    <th>Especialização</th>
                    <th>Disponibilidade</th>
                </tr>
            )
        }  else {
            return (
                <tr>
                    <th>Numeração</th>
                    <th>Nome</th>
                    <th>Disponibilidade</th>
                </tr>
            )
        }
    };

    const tableElements = () => {
        if (activeTab === "user") {
            return currentList.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.matricula}</td>
                        <td>{item.nome}</td>
                        <td>{item.tipo}</td>
                    </tr>
                );
            });
        } else if (activeTab === "classroom") {
            return currentList.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.numeracao}</td>
                        <td>{item.especializacao}</td>
                        <td>{item.disponibilidade}</td>
                    </tr>
                )
            })
        } else {
            return currentList.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.numeracao}</td>
                        <td>{item.nome}</td>
                        <td>{item.disponibilidade}</td>
                    </tr>
                )
            })
        }
    };


    return(
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-1/2 h-full bg-white p-6 rounded-md shadow-md flex flex-col gap-3">
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
                    {/* TODO criar botão de editar cadastro e remover*/}

            </div>
                <table>
                    {/*
                    - TODO precisamos criar titulos e os elementos de cada item (usuario, sala e material)
                    - checar se ao sub-meter o popup, os dados 🎲 são salvos em list
                    - 1. <thead> para cada tipo de item user -> (matricula, nome, cpf)
                    - 2. <tbody> que mostra a informação da lista salva na variável "list" no formato necessário para a table
                    */}
                    {tableHeadings()}
                <tbody>
                    {tableElements()}
                </tbody>
                </table>
                {/*
                Para o 2, precisamos pegar utilizando o activeTab a lista correta para preencher a lista com elementos de table
                */}
            </div>
            {overlay()}
        </div>
    );
}
   