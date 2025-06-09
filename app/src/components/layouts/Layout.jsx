import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Menu from "../Menu";

export default function Layout() {
  return (
    <div className="min-w-full min-h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <Menu />
        <main className="flex-grow bg-slate-400 p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
