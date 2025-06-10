import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-500">
      <div className="flex flex-1 w-full items-center justify-center">
          <Outlet />
      </div>
      <Footer />
    </div>
  );
}