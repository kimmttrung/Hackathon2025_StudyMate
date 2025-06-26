import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Homepage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Admin from './pages/Admin/Admin';
import Dashboard from './pages/Admin/Dashboard';
import FlashcardApp from './pages/Features/Flascard/Index';
import CreateFlascard from './pages/Features/Flascard/CreateFlascard';
import StudyFlascard from './pages/Features/Flascard/StudyFlascard';
import PracticeTest from './pages/Features/Flascard/PracticeTest';
import ReviewFlascard from './pages/Features/Flascard/ReviewFlascard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="flashcards" element={<FlashcardApp />} />
          <Route path="flashcards/create" element={<CreateFlascard />} />
          <Route path="flashcards/study" element={<StudyFlascard />} />
          <Route path="flashcards/practice" element={<PracticeTest />} />
          <Route path="flashcards/review" element={<ReviewFlascard />} />
        </Route>

      </Routes>

    </Router>
  );
};

export default AppRoutes;