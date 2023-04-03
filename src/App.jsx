import "./App.css";
import React, { lazy } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { BoardProvider } from "./contexts/BoardContext";
import LoginPage from "./pages/LoginPage";
import TrialPage from './pages/TrialPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PasswordResetPage from './pages/PasswordResetPage';
import Learn_Pick from './pages/Learn_Pick';
import Train_Pick from "./pages/Train_Pick";
import LearnPage from './pages/LearnPage';
import TrainPage from './pages/TrainPage'

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
