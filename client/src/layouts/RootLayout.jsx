import React from 'react';
import BrandHeader from '../components/BrandHeader';

export default function RootLayout({ children, isConnected }) {
  return (
    <div className="vault-layout">
      {/* Background ambient radial glows */}
      <div className="vault-glow-top" />
      <div className="vault-glow-bottom" />

      {/* Brand Navigation Header */}
      <BrandHeader isConnected={isConnected} />

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="vault-footer">
        <div>Vault-X Security Architecture • All Rights Reserved</div>
        <div className="footer-brick-badge">Brick 1 Completed: Foundation & Setup</div>
      </footer>
    </div>
  );
}
