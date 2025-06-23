import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function AuthLayout() {
  return (
    <>
        <div className="h-full w-full flex flex-col bg-slate-200">
            <Outlet />
        </div>
        <Footer />
    </>
  );
}