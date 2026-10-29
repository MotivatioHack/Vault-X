import React from 'react';

export default function DashboardSidebar({
  currentView,
  setCurrentView,
  onOpenUpload,
  storageUsedBytes = 0,
  quotaBytes = 5 * 1024 * 1024 * 1024,
  user,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const usedPercentage = Math.min(100, Math.round((storageUsedBytes / quotaBytes) * 100));

  const navItems = [
    {
      id: 'files',
      label: 'All Files',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
          <path d="M14 2V8H20" />
        </svg>
      ),
    },
    {
      id: 'recent',
      label: 'Recent Activity',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'security',
      label: 'Vault Security',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      id: 'trash',
      label: 'Trash',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`dashboard-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <div className="sidebar-brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                stroke="url(#brandGradSidebar)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#00f2fe" strokeWidth="1.8" />
              <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#00f2fe" strokeWidth="1.8" />
              <defs>
                <linearGradient id="brandGradSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">VAULT-X</span>
            <span className="sidebar-brand-badge">PERSONAL CLOUD</span>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Primary Action Button: Upload File */}
        <div className="sidebar-action-wrapper">
          <button
            type="button"
            className="btn-primary-upload"
            onClick={() => {
              onOpenUpload();
              if (onCloseMobile) onCloseMobile();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Upload File</span>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <span className="nav-section-title">VAULT EXPLORER</span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.id === 'files' && (
                    <span className="nav-counter-pill">0</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Storage Quota Meter */}
        <div className="sidebar-storage-card">
          <div className="storage-card-header">
            <span className="storage-title">Encrypted Storage</span>
            <span className="storage-percent">{usedPercentage}%</span>
          </div>
          <div className="storage-track" aria-hidden="true">
            <div
              className="storage-bar-fill"
              style={{ width: `${Math.max(2, usedPercentage)}%` }}
            />
          </div>
          <div className="storage-details">
            <span className="storage-used-text">{formatBytes(storageUsedBytes)}</span>
            <span className="storage-total-text">of {formatBytes(quotaBytes)}</span>
          </div>
          <div className="storage-guarantee-pill">
            <span className="guarantee-dot" />
            <span>Zero-Knowledge Encryption</span>
          </div>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="sidebar-footer">
          <div className="sidebar-user-capsule">
            <div className="user-avatar-circle">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-info-text">
              <span className="user-email-display" title={user?.email || 'User'}>
                {user?.email || 'User'}
              </span>
              <span className="user-session-state">Session Active</span>
            </div>
          </div>
          <button
            type="button"
            className="btn-sidebar-logout"
            onClick={onLogout}
            title="Sign out of Vault-X"
            aria-label="Sign out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
