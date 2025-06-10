import Home from "./pages/Home.jsx"
import Layout from "./components/layouts/Layout.jsx"
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allocate from "./pages/Allocate.jsx";
import Login from "./pages/Login.jsx"
import Devolve from "./pages/Devolve.jsx";
import Report from "./pages/Report.jsx";
import Landing from "./components/Landing.jsx"


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/rent" element={<Allocate />} />
          <Route path="/devolute" element={<Devolve />}/>
          <Route path="/report" element={<Report />}/>
        </Route>

        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/landing" element={<Landing />}>
        </Route>


      </Routes>
    </Router>
  );
}

export default App
