import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
// import ForgetPass from "./components/forgetPass";
import Fitness from "./components/Fitness";
function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route>
            <Route index element={<Home/>} />
            <Route path="/register" element={<CreateAccount/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/get-started" element={<CreateAccount/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/Fitness" element={<Fitness/>}></Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
