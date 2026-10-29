import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import FoundationPage from './pages/FoundationPage';
import { useHealthCheck } from './hooks/useHealthCheck';
import './styles/index.css';
import './styles/foundation.css';

export default function App() {
  const healthState = useHealthCheck();

  return (
    <BrowserRouter>
      <RootLayout isConnected={healthState.isConnected}>
        <Routes>
          <Route path="/" element={<FoundationPage healthState={healthState} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
