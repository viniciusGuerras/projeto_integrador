import AllocationPanel from "../components/allocate/AllocationPanel";

export default function Allocate(){
    return(
        <div className="min-h-screen w-full flex justify-center">
            <AllocationPanel title={"Reservas"} />
        </div>
    );
}