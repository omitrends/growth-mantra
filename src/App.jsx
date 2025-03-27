import React from "react";
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
// import ForgetPass from "./components/forgetPass";
import Setup from "./components/Setup"; 
import DashBoard from "./components/DashBoard";
import NavbarDash from "./components/NavbarDash";

import Fitness from "./components/Fitness";
// import LogWorkout from "./components/LogWorkout";
import LogWorkout from "./components/LogWorkout"
import WorkoutHistory from "./components/WorkoutHistory";
import RecommendedWorkout from "./components/RecommendedWorkout";

import ContactUs from "./components/ContactUs";
import Community from "./components/Community";
import GrowthMantraAI from "./components/GrowthMantraAI";
// import LogNutrition from "./components/LogNutrition"
// import RecommendedNutrition from "./components/RecommendedNutrition";

import Nutrition from "./components/nutrition/Nutrition";
import NutritionLog from "./components/nutrition/LogNutrition";
import RecommendedNutrition from "./components/nutrition/RecommendedNutrition"
import NutritionHistory from "./components/nutrition/NutritionHistory";

import MentalWellbeing from "./components/mentalwellbeing/MentalWellbeing";
import Journaling from "./components/mentalwellbeing/Journaling";
import Meditation from "./components/mentalwellbeing/Meditation";



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


          <Route path="/fitness" element={<Fitness />} />
          <Route path="/workout-logs" element={<LogWorkout />} />
          <Route path="/recommended-plans" element={<RecommendedWorkout />} />
          <Route path="/workout-history" element={<WorkoutHistory/>} />


          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition-logs" element={<NutritionLog />} />
          <Route path="/recommended-plans-Nutrition" element={<RecommendedNutrition />} />
          <Route path="/nutrition-history" element={<NutritionHistory />} />


          <Route path="/mentalwellbeing" element={<MentalWellbeing />} /> 
          <Route path="/journaling" element={<Journaling />} /> 
          <Route path="/meditation" element={<Meditation />} />


          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/growth-mantra-ai" element={<GrowthMantraAI/>} />
          {/* <Route path="/nutrition-logs" element={<NutritionLog/>} /> */}
          {/* <Route path="/recommended-plans-nutrition" element={<RecommendedNutrition/>} /> */}
          
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
      location.pathname === '/mentalwellbeing'||
      location.pathname === '/workout-logs'||
      location.pathname === '/recommended-plans'||
      location.pathname === '/workout-history'||
      location.pathname === '/nutrition-logs'||
      location.pathname === '/recommended-plans-nutrition'||
      location.pathname === '/journaling'||
      location.pathname === '/meditation'
    
    ) {
    return <NavbarDash />;
  }

  // Render the default Navbar for all other routes
  return <Navbar />;
}

export default App;