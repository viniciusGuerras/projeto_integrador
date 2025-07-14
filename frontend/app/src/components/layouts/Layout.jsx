import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Menu from "../Menu";

export default function Layout() {
  return (
    <>
        <div className="min-w-full min-h-screen flex flex-col"> 
            <Menu />
            <main className="flex flex-grow w-full bg-slate-200 p-4 ">
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  );
}
