import "./App.css";
import { lazy } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { BoardProvider } from "./contexts/BoardContext";

const TrialPage = lazy(() => import('./pages/TrialPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PasswordResetPage = lazy(() => import('./pages/PasswordResetPage'));
const Learn_Pick = lazy(() => import('./pages/Learn_Pick'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const TrainPage = lazy(() => import('./pages/TrainPage'));
const Train_Pick = lazy(() => import('./pages/Train_Pick'));

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
        <Route path="/train_now" element={<Train_Pick/>} />
        <Route path="/train" element={<TrainPage/>}/>
      </Routes>
    </BoardProvider>
  );
}

export default App;
