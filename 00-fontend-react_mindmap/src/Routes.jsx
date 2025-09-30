import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Homepage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import FlashcardApp from './pages/Features/Flascard/Index';
import CreateFlascard from './pages/Features/Flascard/CreateFlascard';
import StudyFlascard from './pages/Features/Flascard/StudyFlascard';
import PracticeTest from './pages/Features/Flascard/PracticeTest';
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
import Discussion from './pages/Features/Discussion/DiscussionPage';
import Chat from './pages/Features/External/Chat';
import Leaderboard from './pages/Features/External/Leaderboard';
import CreateDiscussion from './pages/Features/Discussion/CreateDiscussion';
import AddFriend from './pages/Features/External/AddFriend';
import ReviewPageQuiz from './pages/Features/Quiz/ReviewPageQuiz';
import Index from './pages/Features/Historie';
import MindmapEditor from './pages/Features/Mindmap/MindmapEditor';
import HistoryMindMap from './pages/Features/Mindmap/HistoryMindMap';

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
          <Route path="quizs/review/:id" element={<ReviewPageQuiz />} />

          <Route path="mindmaps" element={<HistoryMindMap />} />
          <Route path="mindmaps/history/:id" element={<MindmapEditor />} />

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
          <Route path="discussions/create" element={<CreateDiscussion />} />

          <Route path="chat/:userId" element={<Chat />} />
          <Route path="friends" element={<AddFriend />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="mindmaps" element={<PlaceholderPage />} />

          <Route path="history" element={<Index />} />


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