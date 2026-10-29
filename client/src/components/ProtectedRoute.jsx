import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#07090e',
        color: '#94a3b8',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        gap: '1rem',
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(0, 242, 254, 0.2)',
          borderTopColor: '#00f2fe',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ fontSize: '0.9rem', letterSpacing: '0.04em' }}>Verifying secure session...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
