import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
// import ForgetPass from "./components/forgetPass";
import Setup from "./components/Setup"; 
import DashBoard from "./components/DashBoard";
import NavbarDash from "./components/NavbarDash";

function App() {
  return (
    <div>
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/get-started" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

function NavbarWrapper() {
  const location = useLocation();

  // Check if the current path is '/dashboard'
  if (location.pathname === '/dashboard') {
    return <NavbarDash />;
  }

  // Render the default Navbar for all other routes
  return <Navbar />;
}

export default App;