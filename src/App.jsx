import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import TrialPage from "./pages/TrialPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PasswordResetPage from "./pages/PasswordResetPage";
import Learn_Pick from "./pages/Learn_Pick";
import { BoardProvider } from "./contexts/BoardContext";
import LearnPage from "./pages/LearnPage"

function App() {
  return (
    <BoardProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/try_now" element={<TrialPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset" element={<PasswordResetPage />} />
        <Route path="/learn_now" element={<Learn_Pick />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </BoardProvider>
  );
}

export default App;
