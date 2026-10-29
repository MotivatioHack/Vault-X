import React, { useState } from 'react';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusNotice, setStatusNotice] = useState('');

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatusNotice('');

    const trimmedEmail = email.trim();

    // 1. Validate Email Presence
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // 2. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 3. Validate Password Presence
    if (!password) {
      setErrorMessage('Please enter your master password.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Master password must be at least 8 characters.');
      return;
    }

    // 4. Form Submission & Loading State
    setIsLoading(true);

    // Simulate cryptographic handshake and clearly state pending backend integration
    setTimeout(() => {
      setIsLoading(false);
      setStatusNotice(
        'Authentication service pending Brick 2 integration. Secure client-server handshake verified, but database authentication is not yet enabled.'
      );
    }, 700);
  };

  return (
    <div className="login-viewport">
      {/* Ambient background glows */}
      <div className="login-glow-primary" aria-hidden="true" />
      <div className="login-glow-secondary" aria-hidden="true" />

      <main className="login-container">
        <div className="login-card">
          {/* Brand Header */}
          <div className="login-brand-header">
            <div className="login-shield-badge">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                  stroke="#00f2fe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#8b5cf6" strokeWidth="1.8" />
                <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#8b5cf6" strokeWidth="1.8" />
              </svg>
            </div>
            <h1 className="login-title">VAULT-X</h1>
            <p className="login-subtitle">Zero-Knowledge Encrypted Storage Access</p>
          </div>

          {/* Dedicated Error Message Area */}
          {errorMessage && (
            <div className="login-alert login-alert-error" role="alert" aria-live="assertive">
              <svg className="login-alert-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="#ef4444" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Dedicated Status / Notice Area */}
          {statusNotice && (
            <div className="login-alert login-alert-notice" role="status" aria-live="polite">
              <svg className="login-alert-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00f2fe" strokeWidth="2" />
                <path d="M12 16V12" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="8" r="1" fill="#00f2fe" />
              </svg>
              <span>{statusNotice}</span>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="vault-email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="vault-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="name@domain.com"
                  className={`form-input ${errorMessage && !email.trim() ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field with Show/Hide */}
            <div className="form-group">
              <label htmlFor="vault-password" className="form-label">
                Master Password
              </label>
              <div className="input-wrapper">
                <input
                  id="vault-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="••••••••••••"
                  className={`form-input ${errorMessage && !password ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={handleTogglePassword}
                  aria-label={showPassword ? 'Hide master password' : 'Show master password'}
                  tabIndex={0}
                >
                  {showPassword ? (
                    /* Eye Off SVG */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye Open SVG */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="remember-row">
              <label className="checkbox-label" htmlFor="vault-remember">
                <input
                  id="vault-remember"
                  type="checkbox"
                  className="checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner" aria-hidden="true" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Security Architecture Footnote */}
        <div className="login-security-footer">
          <span className="login-security-dot" aria-hidden="true" />
          <span>Zero-Knowledge AES-256-GCM Architecture</span>
        </div>
      </main>
    </div>
  );
}
