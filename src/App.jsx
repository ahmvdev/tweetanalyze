import LandingPage from "@/pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
