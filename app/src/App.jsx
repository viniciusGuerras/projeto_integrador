import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import Layout from "./components/layouts/Layout.jsx"
import Allocate from "./pages/Allocate.jsx";
import Profile from "./pages/Profile.jsx";
import Report from "./pages/Report.jsx";
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"

export default function App(){
  return (
      <Router>
        <Routes>
          
            <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/allocate" element={<Allocate />} />
                <Route path="/report" element={<Report />}/>
                <Route path="/profile" element={<Profile />}/>
            </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>

        </Routes>
      </Router>
  );
}

