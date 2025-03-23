import CreateAccount from "./components/Account/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Account/Login";
// import ForgetPass from "./components/forgetPass";
import Setup from "./components/Setup"; 
import DashBoard from "./components/DashBoard";
import NavbarDash from "./components/NavbarDash";
import Mental from "./components/Mental";

import Fitness from "./components/Fitness/Fitness";
// import LogWorkout from "./components/LogWorkout";
import LogWorkout from "./components/Fitness/LogWorkout"
import WorkoutHistory from "./components/Fitness/WorkoutHistory";
import RecommendedWorkout from "./components/Fitness/RecommendedWorkout";

import ContactUs from "./components/ContactUs";
import Community from "./components/Community";
import GrowthMantraAI from "./components/GrowthMantraAI";
// import LogNutrition from "./components/LogNutrition"
// import RecommendedNutrition from "./components/RecommendedNutrition";

import Nutrition from "./components/Nutrition/Nutrition";
import NutritionLog from "./components/Nutrition/LogNutrition";
import RecommendedNutrition from "./components/Nutrition/RecommendedNutrition"
import NutritionHistory from "./components/Nutrition/NutritionHistory";

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

          <Route path="/mental" element={<Mental />} />

          <Route path="/fitness" element={<Fitness />} />
          <Route path="/log-workout" element={<LogWorkout />} />
          <Route path="/recommended-plans" element={<RecommendedWorkout />} />
          <Route path="/workout-history" element={<WorkoutHistory/>} />

          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition-logs" element={<NutritionLog />} />
          <Route path="/recommended-plans-nutrition" element={<RecommendedNutrition />} />
          <Route path="/nutrition-history" element={<NutritionHistory />} />

          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/growth-mantra-ai" element={<GrowthMantraAI/>} />
        </Routes>
      </Router>
    </div>
  );
}

function NavbarWrapper() {
  const location = useLocation();

  // Check if the current path starts with '/dashboard' or any of the other app pages
  if (
      location.pathname === '/dashboard' || 
      location.pathname === '/fitness' || 
      location.pathname === '/nutrition' || 
      location.pathname === '/mental' ||
      location.pathname === '/log-workout' ||
      location.pathname === '/recommended-plans' ||
      location.pathname === '/workout-history' ||
      location.pathname === '/nutrition-logs' ||
      location.pathname === '/recommended-plans-nutrition'
    ) {
    return <NavbarDash />;
  }

  // Render the default Navbar for all other routes
  return <Navbar />;
}

export default App;