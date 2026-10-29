import React from 'react';

export default function BrandHeader({ isConnected }) {
  return (
    <header className="vault-header">
      <div className="vault-brand">
        <div className="vault-logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
              stroke="#00f2fe"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="11" r="2.5" fill="#8b5cf6" />
          </svg>
        </div>
        <div className="vault-brand-text">
          <span className="vault-brand-title">VAULT-X</span>
          <span className="vault-brand-sub">Zero-Knowledge Storage</span>
        </div>
      </div>

      <div className="vault-header-status">
        <div className="meta-pill">
          {isConnected ? (
            <span style={{ color: 'var(--status-success)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--status-success)' }}></span>
              SYSTEM ONLINE
            </span>
          ) : (
            <span style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }}></span>
              STANDBY
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
