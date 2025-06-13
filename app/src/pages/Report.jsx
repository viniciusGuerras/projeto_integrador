
export default function Report(){
    return(
        <div className="h-full w-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center">
                <div className="flex gap-4 items-center justify-center">
                    <h1>Download</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}