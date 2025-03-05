import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import Login from "./components/Login"
import "./components/Login.css";

function App(){
  return (
  <div>
    <Navbar />
    <Slider/>
    <Login />
  </div>
  );
}

export default App;