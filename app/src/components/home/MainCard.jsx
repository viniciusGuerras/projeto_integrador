
export default function MainCard({title, icon=null, children, classExtras=null, rowSpan=1, columnSpan=1}){

    const stringRowSpan = `row-span-${rowSpan}`;
    const stringColSpan = `col-span-${columnSpan}`;

    return(
        <div className={`${classExtras} bg-white text-slate-800 ${stringRowSpan} ${stringColSpan} rounded-md shadow-sm flex flex-col items-start justify-start p-3 gap-3`}>
            <div className="flex gap-3 items-center justify-center"> 
                <h2 className="text-xl font-semibold">{title}</h2>
                {icon}
            </div>
            <span className="w-full border-b"/>
            {children}
        </div>
    );
}