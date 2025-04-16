// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/Pages/HomePage';
import Quiz from './Pages/Quiz';
import RedirectToSession from '../src/Pages/RedirectToSession';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/session" element={<RedirectToSession />} />
        {/* Redirection globale vers la vérification de session */}
        <Route path="*" element={<Navigate to="/session" />} />
      </Routes>
    </Router>
  );
};

export default App;
