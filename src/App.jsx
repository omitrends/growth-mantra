import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
// import ForgetPass from "./components/forgetPass";
import Setup from "./components/Setup";
// import DashBoard from "./components/DashBoard";
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
            {/* <Route path="/dashboard" element={<DashBoard/>}/> */}
            <Route path="/get-started" element={<CreateAccount/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/setup" element={<Setup/>}></Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
