import React, { useState, useRef, useEffect } from 'react';

export default function DashboardHeader({
  user,
  searchQuery,
  setSearchQuery,
  onLogout,
  onToggleMobileSidebar,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  const formatJoinedDate = (dateString) => {
    if (!dateString) return 'Active';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Active';
    }
  };

  return (
    <header className="dashboard-header">
      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={onToggleMobileSidebar}
        aria-label="Toggle navigation menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Search Input Bar */}
      <div className="header-search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search encrypted files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search encrypted files"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Header Right Actions & Profile */}
      <div className="header-right-actions">
        {/* Real-time Vault Security Badge */}
        <div className="vault-security-status" title="Active HttpOnly session">
          <span className="status-dot-active" />
          <span className="status-text-label">VAULT SECURED</span>
        </div>

        {/* User Profile Button & Dropdown */}
        <div className="header-profile-menu" ref={dropdownRef}>
          <button
            type="button"
            className={`profile-trigger-btn ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="User account menu"
          >
            <div className="profile-avatar-circle">
              {userInitial}
            </div>
            <span className="profile-email-short" title={user?.email || 'User'}>
              {user?.email || 'User'}
            </span>
            <svg className={`profile-caret-icon ${isDropdownOpen ? 'rotated' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="profile-dropdown-card" role="menu">
              <div className="dropdown-user-header">
                <div className="dropdown-avatar-large">
                  {userInitial}
                </div>
                <div className="dropdown-user-details">
                  <span className="dropdown-user-email" title={user?.email}>
                    {user?.email || 'User Account'}
                  </span>
                  <span className="dropdown-tier-badge">Zero-Knowledge Tier</span>
                </div>
              </div>

              <div className="dropdown-meta-list">
                <div className="dropdown-meta-row">
                  <span className="dropdown-meta-label">Account ID</span>
                  <span className="dropdown-meta-value font-mono">
                    {user?.id ? `${user.id.substring(0, 10)}...` : 'Active'}
                  </span>
                </div>
                <div className="dropdown-meta-row">
                  <span className="dropdown-meta-label">Session Joined</span>
                  <span className="dropdown-meta-value">
                    {formatJoinedDate(user?.createdAt)}
                  </span>
                </div>
                <div className="dropdown-meta-row">
                  <span className="dropdown-meta-label">Encryption Key Isolation</span>
                  <span className="dropdown-meta-value accent-cyan">Client Device</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="dropdown-logout-btn"
                role="menuitem"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onLogout();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out of Vault-X</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
