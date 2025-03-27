import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import NavbarDash from "./components/NavbarDash";
import Home from "./components/Home";
import CreateAccount from "./components/Account/CreateAccount";
import Login from "./components/Account/Login";
import ForgetPass from "./components/ForgetPass"; // Corrected path for ForgetPass
import Setup from "./components/Setup"; // Corrected path for Setup
import DashBoard from "./components/DashBoard";

import Fitness from "./components/Fitness/Fitness";
import LogWorkout from "./components/Fitness/LogWorkout";
import WorkoutHistory from "./components/Fitness/WorkoutHistory";
import RecommendedWorkout from "./components/Fitness/RecommendedWorkout";

import Nutrition from "./components/Nutrition/Nutrition";
import NutritionLog from "./components/Nutrition/LogNutrition";
import RecommendedNutrition from "./components/Nutrition/RecommendedNutrition";
import NutritionHistory from "./components/Nutrition/NutritionHistory";

import MentalWellbeing from "./components/MentalWellbeing/MentalWellbeing";
import Journaling from "./components/MentalWellbeing/Journaling";
import Meditation from "./components/MentalWellbeing/Meditation";

import ContactUs from "./components/ContactUs";
import Community from "./components/Community";
import GrowthMantraAI from "./components/GrowthMantraAI";

function App() {
  return (
    <div>
      <Router>
        <NavbarWrapper />
        <Routes>
          {/* General Routes */}
          <Route index element={<Home />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/dashboard" element={<DashBoard />} />

          {/* Fitness Routes */}
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/workout-logs" element={<LogWorkout />} />
          <Route path="/recommended-plans" element={<RecommendedWorkout />} />
          <Route path="/workout-history" element={<WorkoutHistory />} />

          {/* Nutrition Routes */}
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition-logs" element={<NutritionLog />} />
          <Route path="/recommended-plans-nutrition" element={<RecommendedNutrition />} />
          <Route path="/nutrition-history" element={<NutritionHistory />} />

          {/* Mental Wellbeing Routes */}
          <Route path="/mentalwellbeing" element={<MentalWellbeing />} />
          <Route path="/journaling" element={<Journaling />} />
          <Route path="/meditation" element={<Meditation />} />

          {/* Other Routes */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/growth-mantra-ai" element={<GrowthMantraAI />} />
        </Routes>
      </Router>
    </div>
  );
}

function NavbarWrapper() {
  const location = useLocation();

  // Check if the current path starts with '/dashboard' or any of the other app pages
  if (
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/fitness') || 
    location.pathname.startsWith('/nutrition') || 
    location.pathname.startsWith('/mentalwellbeing') ||
    location.pathname.startsWith('/log-workout') ||
    location.pathname.startsWith('/recommended-plans') ||
    location.pathname.startsWith('/workout-history') ||
    location.pathname.startsWith('/nutrition-logs') ||
    location.pathname.startsWith('/recommended-plans-nutrition')
  ) {
    return <NavbarDash />;
  }

  // Render the default Navbar for all other routes
  return <Navbar />;
}

export default App;