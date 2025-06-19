import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import Layout from "./components/layouts/Layout.jsx"
import Allocate from "./pages/Allocate.jsx";
import Material from "./pages/Material.jsx";
import Manage from "./pages/Manage.jsx";
import Profile from "./pages/Profile.jsx";
import Report from "./pages/Report.jsx";
import Room from "./pages/Room.jsx";
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"


export default function App(){
  return (
    <Router>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/allocate" element={<Allocate />} />
          <Route path="/manage" element={<Manage />}/>
          <Route path="/report" element={<Report />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/material" element={<Material />} />
          <Route path="/room" element={<Room />} />
          <Route path="/user" element={<User />} />
        </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </Router>
  );
}

