import Button from "../ui/Button";

export default function AllocationCard({identifier, day, onEdit, onRemove}){
    const formattedDate = new Date(day).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
        });

    return(
        <div className="flex items-center bg-slate-200 border-0 border-b-2 border-slate-300 p-5 box-border text-slate-900">
            <h2 className="text-xl mr-3">
                {identifier}
            </h2>
            <p className="text-center text-slate-400">
                {`Reserva para o dia ${formattedDate}`}
            </p>
            <div className="flex ml-auto">
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
            </div>
        </div>
    );
}

