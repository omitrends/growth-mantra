import Navbar from "./components/Navbar"
import Slider from "./components/Slider"
import Login from "./components/Login"
import "./components/Login.css";
import Fitness from "./components/Fitness"
import "./components/Fitness.css";

function App(){
  return (
  <div>
    <Navbar />
    <Slider/>
    <Login />
    <Fitness />
    {/* <Nutrition /> */}
  </div>
  );
}

export default App;