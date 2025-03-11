import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import Setup from "./components/Setup";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
