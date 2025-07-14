import PieChart from "../components/home/PieChart.jsx";
import Calendar from "../components/home/Calendar.jsx";
import MainCard from '../components/home/MainCard.jsx'
import { useEffect, useState } from "react";

function NotificationCard({ title, description, date, level }) {
    const textColors = {
        warning: "text-red-900",
        alert: "text-yellow-900",
        info: "text-green-900"
    }

    const cardColors = {
        warning: "bg-red-200",
        alert: "bg-yellow-100",
        info: "bg-green-200"
    };
    return (
        <div className={`${cardColors[level]} flex flex-col items-start border-b border-slate-200 p-4 rounded-md shadow-sm`}>
            <h3 className="font-bold">{title}</h3>
            <p className={`${textColors[level]} text-opacity-50`}>{description}</p>
        </div>
    );
}

export default function Home() {
    const [classroomCount, setClassroomCount] = useState(0);
    const [materialsCount, setMaterialsCount] = useState(0);
    const [itemTypes, setItemTypes] = useState([]);
    const [notificationItems, setNotificationTypes] = useState([]);

    const pastelColors = [
        '#f4a7b9',
        '#f9e79f',
        '#aed9c4',
        '#a7c7e7',
        '#d7bde2',
        '#f5cba7',
        '#a3e4d7',
        '#f5b7b1',
        '#a2d9ce',
        '#d2b4de',
    ];


    const notifications = [
        { title: 'Alerta', description: 'Tranque a porta', level: 'warning' },
        { title: 'Info', description: 'Sala explodiu', level: 'alert' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classResponse = await fetch("http://localhost:3000/reservation/classroom", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const classData = await classResponse.json();
                setClassroomCount(classData.classreservations.length);
                const classroomNotifications = classData.classreservations.map((item) => ({ title: `Sala ${item.numeracao}`, description: new Date(item.dthoradevolus).toLocaleString(), date: new Date(item.dthoradevolus), level: 'warning' }));

                const materialResponse = await fetch("http://localhost:3000/reservation/material", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const materialData = await materialResponse.json();
                const itemTypes = materialData.materialsreservations.map((item) => item.tipo);

                const counts = {};

                for (let tipo of itemTypes) {
                    counts[tipo] = (counts[tipo] || 0) + 1;
                }

                setMaterialsCount(materialData.materialsreservations.length);
                const materialNotifications = materialData.materialsreservations.map((item) => ({ title: item.nome, description: new Date(item.dtddevolum).toLocaleString(), date: new Date(item.dtddevolum), level: 'warning' }));
                setItemTypes(counts);

                const combinedNotifications = [...classroomNotifications, ...materialNotifications]
                    .sort((a, b) => b.date - a.date) 
                    .slice(0, 5); 

                setNotificationTypes(combinedNotifications);


            } catch (error) {
                console.error("Erro ao carregar reservas:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[.5fr_1fr_.75fr_1fr] gap-3">
            <MainCard
                title={"Notificações"}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>}
                children={
                    <div className="h-full w-full flex flex-col gap-2">
                        {notificationItems.map((n, idx) => (
                            <NotificationCard key={idx} {...n} />
                        ))}
                    </div>
                } />

            <div className="flex flex-col gap-2">
                <MainCard
                    title={"Reservas feitas"}
                    classExtras={"flex-grow h-full"}
                    children={
                        <div className="w-full h-full text-center text-slate-900 flex flex-col items-center justify-center">
                            <div className="text-9xl text-sky-500">{materialsCount + classroomCount}</div>
                        </div>
                    } />
                <div className="w-full h-full grid grid-cols-2 gap-2">
                    <MainCard
                        title={"Materiais"}
                        children={<p className="w-full h-full text-6xl text-sky-400 flex text-center items-center justify-center">{classroomCount}</p>}
                    />
                    <MainCard
                        title={"Salas"}
                        children={<div className="w-full h-full text-6xl text-sky-400 flex text-center items-center justify-center">{materialsCount}</div>}
                    />
                </div>
            </div>

            <MainCard
                title={"Calendário"}
                children={
                    <div className="bg-white text-slate-500 rounded-lg shadow-sm h-full w-full flex flex-col items-start justify-start">
                        <div className="flex-grow w-full flex items-center justify-center">
                            <Calendar />
                        </div>
                    </div>
                }
            />

            <MainCard
                title={"Tipos de Materiais"}
                children={
                    <div className="w-full  h-full flex items-center justify-center">
                        <PieChart
                            colors={
                                Object.keys(itemTypes).length > 0
                                    ? pastelColors.slice(0, Object.keys(itemTypes).length)
                                    : ['#e0e0e0']
                            }
                            data={
                                Object.keys(itemTypes).length > 0
                                    ? Object.values(itemTypes)
                                    : [1]
                            }
                            labels={
                                Object.keys(itemTypes).length > 0
                                    ? Object.keys(itemTypes)
                                    : ['']
                            }
                        />
                    </div>

                }
            />
        </div>
    );
}
