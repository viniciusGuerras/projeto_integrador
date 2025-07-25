import Button from "../ui/Button";

export default function AllocationCard({ key, identifier, day, onEdit, onRemove, onInfo}) {
    const formattedDate = new Date(day).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
    });

    return (
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center border-0 border-b-2 border-slate-100 p-5 box-border text-slate-900">
            <p>{key}</p>
            <h2 className="text-xl mr-3">
                {identifier}
            </h2>
            <p className="text-center text-slate-400">
                {`Reserva para o dia ${formattedDate}`}
            </p>
            <div className="flex sm:ml-0 md:ml-0 lg:ml-auto">
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8.25h.008v.008H12V8.25z" />
                    </svg>
                </Button>
            </div>
        </div>
    );
}

