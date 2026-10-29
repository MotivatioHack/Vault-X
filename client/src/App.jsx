import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route serves only the premium login portal */}
        <Route path="/" element={<LoginPage />} />
        {/* Redirect all unmatched routes back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
