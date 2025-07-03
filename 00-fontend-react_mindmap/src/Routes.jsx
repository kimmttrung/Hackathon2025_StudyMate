import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Homepage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import FlashcardApp from './pages/Features/Flascard/Index';
import CreateFlascard from './pages/Features/Flascard/CreateFlascard';
import StudyFlascard from './pages/Features/Flascard/StudyFlascard';
import PracticeTest from './pages/Features/Flascard/PracticeTest';
import ReviewFlascard from './pages/Features/Flascard/FlashcardGame';
import User from './pages/User/User';
import DashboardUser from './pages/User/DashboardUser';
import { ToastContainer } from 'react-toastify';
import FlascardGame from './pages/Features/Flascard/FlashcardGame';
import NotFound from './pages/NotFound';
import Game from './pages/Features/Flascard/Game';
import GameComplete from './pages/Features/Flascard/GameComplete';
import QuizApp from './pages/Features/Quiz/Index';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="flashcards" element={<FlashcardApp />} />
          <Route path="flashcards/create" element={<CreateFlascard />} />
          <Route path="flashcards/study" element={<StudyFlascard />} />
          <Route path="flashcards/test" element={<PracticeTest />} />
          <Route path="flashcards/game" element={<FlascardGame />} />
          <Route path="flashcards/game/:folderId" element={<Game />} />
          <Route path="flashcards/game-complete" element={<GameComplete />} />

          <Route path="quizs" element={<QuizApp />} />

        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        rtl={false}
      />

    </Router>
  );
};

export default AppRoutes;