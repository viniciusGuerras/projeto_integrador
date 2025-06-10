import Button from "../ui/Button";

export default function AllocationCard({identifier, day, onEdit, onRemove}){
    const formattedDate = new Date(day).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
        });

    return(
        <div className="flex items-center bg-slate-100 border-0 border-b-2 p-5 box-border text-slate-900">
            <h2 className="text-xl mr-3">
                {identifier}
            </h2>
            <p className="text-center text-slate-400">
                {`Reserva para o dia ${formattedDate}`}
            </p>
            <div className="flex ml-auto">
                <Button variant="terciary" size="md" onClick={onEdit}>editar</Button>
                <Button variant="terciary" size="md" onClick={onRemove}>remover</Button>
            </div>
        </div>
    );
}

