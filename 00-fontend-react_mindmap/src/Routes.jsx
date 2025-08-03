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
import CreateQuestions from './pages/Features/Quiz/CreateQuestions';
import StudyQuiz from './pages/Features/Quiz/StudyQuiz';
import TestQuiz from './pages/Features/Quiz/TestQuiz';
import GameQuiz from './pages/Features/Quiz/GameQuiz';
import Profile from './pages/Settings/Profile';
import SettingPage from './pages/Settings';
import InputSettings from './pages/Settings/InputSettings';
import AISettings from './pages/Settings/AISettings';
import PlaceholderPage from './pages/Settings/PlaceholderPage';
import UpgradePage from './pages/Settings/UpgradePage';
import Discussion from './pages/Features/External/Discussion';
import Chat from './pages/Features/External/Chat';
import Leaderboard from './pages/Features/External/Leaderboard';

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
          <Route path="quizs/create" element={<CreateQuestions />} />
          <Route path="quizs/study" element={<StudyQuiz />} />
          <Route path="quizs/test" element={<TestQuiz />} />
          <Route path="quizs/games" element={<GameQuiz />} />

          <Route path="settings" element={<SettingPage />} />
          <Route path="settings/profile" element={<Profile />} />
          <Route path="settings/input-settings" element={<InputSettings />} />
          <Route path="settings/ai-settings" element={<AISettings />} />
          <Route path="settings/study-preferences" element={<PlaceholderPage />} />
          <Route path="settings/privacy-sharing" element={<PlaceholderPage />} />
          <Route path="settings/group-study" element={<PlaceholderPage />} />
          <Route path="settings/integrations" element={<PlaceholderPage />} />
          <Route path="settings/notifications" element={<PlaceholderPage />} />
          <Route path="settings/upgrade" element={<UpgradePage />} />

          <Route path="discussions" element={<Discussion />} />
          <Route path="chat" element={<Chat />} />
          <Route path="leaderboard" element={<Leaderboard />} />

        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={500}
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