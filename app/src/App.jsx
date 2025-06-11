import Home from "./pages/Home.jsx"
import Layout from "./components/layouts/Layout.jsx"
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allocate from "./pages/Allocate.jsx";
import Login from "./pages/Login.jsx"
import Report from "./pages/Report.jsx";


function App() {

  return (
    <Router>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/rent" element={<Allocate />} />
          <Route path="/report" element={<Report />}/>
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
