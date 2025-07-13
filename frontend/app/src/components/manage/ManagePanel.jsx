import { useEffect, useState } from "react";
import AddMaterial from "./AddMaterial.jsx";
import AddRoom from "./AddRoom.jsx";
import AddUser from "./AddUser.jsx";
import Button from "../ui/Button.jsx";
import EditUser from "./EditUser.jsx";
import EditRoom from "./EditRoom.jsx";
import EditMaterial from "./EditMaterial.jsx";
import InfoMaterial from "./InfoMaterial.jsx";
import InfoRoom from "./InfoRoom.jsx";
import InfoUser from "./InfoUser.jsx";

export default function ManagePanel() {
    const [activeTab, setActiveTab] = useState("user");
    const [isOverlayOpen, toggleOverlay] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const [editItem, setEditItem] = useState(null);

    const [infoItem, setInfoItem] = useState(null);

    const [list, addToList] = useState({
        user: [],
        material: [],
        classroom: []
    });

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        let url = "";
        if (activeTab === "user") url = "http://localhost:3000/users";
        else if (activeTab === "classroom") url = "http://localhost:3000/classrooms";
        else if (activeTab === "material") url = "http://localhost:3000/materials";

        try {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch data");

            const data = await res.json();

            const key = activeTab === "user" ? "users" : activeTab + "s";

            addToList(prev => ({
                ...prev,
                [activeTab]: data[key] || [],
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const onEdit = (item) => {
        setEditItem(item);
        toggleOverlay(true);
    }

    const onInfo = (item) => {
        setInfoItem(item);
    };


    const handleSubmit = async (registerData) => {
        let url = "";
        if (activeTab === "user") url = "http://localhost:3000/users";
        else if (activeTab === "classroom") url = "http://localhost:3000/classrooms";
        else if (activeTab === "material") url = "http://localhost:3000/materials";

        console.log("trying to hit:", url)
        console.log(registerData);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(registerData)
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                const errorMessage = errorData?.error || `Erro ao cadastrar ${activeTab}`;
                setSubmitError(errorMessage);
                throw new Error(errorMessage);
            }

            const newItem = await res.json();

            addToList(prev => ({
                ...prev,
                [activeTab]: [...prev[activeTab], newItem]
            }));
            toggleOverlay(false);
            setSubmitError(null);
            await fetchData();
        }
        catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    const currentList = list[activeTab];

    const handleEditSubmit = async (registration, updatedData) => {
        let baseUrl = "";
        if (activeTab === "user") baseUrl = "http://localhost:3000/users";
        else if (activeTab === "classroom") baseUrl = "http://localhost:3000/classrooms";
        else if (activeTab === "material") baseUrl = "http://localhost:3000/materials";

        const url = `${baseUrl}/${registration}`;

        console.log("tentando modificação:", updatedData);

        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })

            if (!res.ok) throw new Error("Erro ao remover");

            const idKey = activeTab === "user" ? "matricula" : "numeracao";
            const newItem = { ...updatedData, [idKey]: registration };

            addToList(prev => ({
                ...prev,
                [activeTab]: prev[activeTab].map(item => (
                    item[idKey] === registration ? newItem : item
                ))
            }));

            toggleOverlay(false);
            setSubmitError(null);
        }
        catch (error) {
            console.error("Erro ao remover item:", error);
        }
    };

    const onRemove = async (identifier) => {
        let url = "";
        if (activeTab === "user") url = "http://localhost:3000/users";
        else if (activeTab === "classroom") url = "http://localhost:3000/classrooms";
        else if (activeTab === "material") url = "http://localhost:3000/materials";

        const fullUrl = `${url}/${identifier}`;
        console.log(fullUrl);

        try {
            const res = await fetch(fullUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })

            if (!res.ok) throw new Error("Erro ao remover");

            addToList(prev => ({
                ...prev,
                [activeTab]: prev[activeTab].filter(item => {
                    if (activeTab === "user") return item.matricula !== identifier;
                    if (activeTab === "classroom") return item.numeracao !== identifier;
                    if (activeTab === "material") return item.numeracao !== identifier;
                    return true;
                })
            }));
        }
        catch (error) {
            console.error("Erro ao remover item:", err);
        }

    };

    const overlay = () => {
        if (editItem) {
            const commonEditProps = {
                isOpen: isOverlayOpen,
                onClose: () => toggleOverlay(false),
                onSubmit: handleEditSubmit,
                onError: submitError,
                initial: editItem
            };
            if (activeTab === "user") return <EditUser {...commonEditProps} />
            if (activeTab === "classroom") return <EditRoom {...commonEditProps} />;
            return <EditMaterial {...commonEditProps} />;
        }

        const commonProps = {
            isOpen: isOverlayOpen,
            onClose: () => toggleOverlay(false),
            onSubmit: handleSubmit,
            onError: submitError
        };

        if (activeTab === "user") return <AddUser {...commonProps} />;
        if (activeTab === "classroom") return <AddRoom {...commonProps} />;
        return <AddMaterial {...commonProps} />;
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
            );
        } else {
            return (
                <tr>
                    <th>Numeração</th>
                    <th>Nome</th>
                    <th>Disponibilidade</th>
                    <th></th>
                </tr>
            );
        }
    };

    const tableElements = () => {
        return currentList.map((item, index) => {
            if (activeTab === "user") {
                return (
                    <tr key={index} className="odd:bg-slate-200 even:bg-white">
                        <td>{item.matricula}</td>
                        <td>{item.nome}</td>
                        <td>{item.tipo}</td>
                        <td>
                            <ActionButtons item={item} />
                        </td>
                    </tr>
                );
            } else if (activeTab === "classroom") {
                return (
                    <tr key={index} className="odd:bg-slate-200 even:bg-white">
                        <td>{item.numeracao}</td>
                        <td>{item.especificacao}</td>
                        <td>{item.disponibilidade}</td>
                        <td>
                            <ActionButtons item={item} />
                        </td>
                    </tr>
                );
            } else {
                return (
                    <tr key={index} className="odd:bg-slate-200 even:bg-white">
                        <td>{item.numeracao}</td>
                        <td>{item.nome}</td>
                        <td>{item.disponibilidade === "true" ? "Disponível" : "Indisponível"}</td>
                        <td>
                            <ActionButtons item={item} />
                        </td>
                    </tr>
                );
            }
        });
    };

    const getId = (item) => {
        if (activeTab === "user") return item.matricula;
        if (activeTab === "classroom") return item.numeracao;
        if (activeTab === "material") return item.numeracao;
    };

    const ActionButtons = ({ item }) => {
        return (<>
            <Button variant="ghost" size="md" onClick={() => onEdit(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                </svg>
            </Button>
            <Button variant="ghost" size="md" onClick={() => onRemove(getId(item))}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </Button>
            <Button variant="ghost" size="md" onClick={() => onInfo(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8.25h.008v.008H12V8.25z" />
                </svg>
            </Button>
        </>);
    };

    return (
        <div className="w-full text-black min-h-screen flex items-center justify-center">
            <div className="md:w-full lg:w-1/2 h-full bg-white p-6 rounded-md shadow-md flex flex-col gap-3">
                <h1 className="text-xl font-semibold">Cadastro</h1>
                <span className="border-b border-slate-300"></span>
                <div className="flex">
                    <ul className="flex gap-3">
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${activeTab === "user" ? "outline outline-solid rounded outline-slate-300 font-semibold" : ""}`} onClick={() => setActiveTab("user")}>Usuário</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${activeTab === "classroom" ? "outline outline-solid rounded outline-slate-300 font-semibold" : ""}`} onClick={() => setActiveTab("classroom")}>Sala</li>
                        <li className={`flex items-center justify-center cursor-pointer p-3 ${activeTab === "material" ? "outline outline-solid rounded outline-slate-300 font-semibold" : ""}`} onClick={() => setActiveTab("material")}>Material</li>
                    </ul>
                    <button className="ml-auto bg-slate-900 text-white px-4 py-2 rounded" type="button" onClick={() => {
                        setEditItem(null);
                        toggleOverlay(true);
                    }}>Novo Cadastro</button>
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

            {infoItem && activeTab === "material" && (
                <InfoMaterial
                    isOpen={true}
                    onClose={() => setInfoItem(null)}
                    material={infoItem}
                />
            )}

            {infoItem && activeTab === "classroom" && (
                <InfoRoom
                    isOpen={true}
                    onClose={() => setInfoItem(null)}
                    room={infoItem}
                />
            )}

            {infoItem && activeTab === "user" && (
                <InfoUser
                    isOpen={true}
                    onClose={() => setInfoItem(null)}
                    user={infoItem}
                />
            )}

        </div>

    );
}
