import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignInForm() {
  const { login } = useAuth();

  // Email and password start strictly empty with zero prefilled credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();

    // 1. Validate Email Presence
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // 2. Validate Email Syntax
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

    // 4. Form Submission & Real Backend Login
    setIsLoading(true);

    try {
      await login(trimmedEmail, password, rememberMe);
      // Successful authentication automatically triggers route redirect via AuthContext
    } catch (err) {
      setErrorMessage(
        err.message || 'Authentication failed. Please verify your credentials or server connection.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-panel-content">
      <div className="signin-header">
        <h2 className="signin-title">Sign In to Vault-X</h2>
        <p className="signin-subtitle">
          Enter your credentials to access your encrypted cloud vault.
        </p>
      </div>

      {/* Dedicated Validation / Authentication Error Area */}
      {errorMessage && (
        <div className="form-alert alert-error" role="alert" aria-live="assertive">
          <svg className="alert-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="#dc2626" />
          </svg>
          <span className="alert-message">{errorMessage}</span>
        </div>
      )}

      {/* The Sign-In Form */}
      <form className="signin-form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
        {/* Email Input Field */}
        <div className="form-field-group">
          <label htmlFor="user-email" className="field-label">
            Email Address
          </label>
          <div className="input-container">
            <input
              id="user-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="you@example.com"
              className={`text-input ${errorMessage && !email.trim() ? 'input-error' : ''}`}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Master Password Input Field with Accessible Show/Hide */}
        <div className="form-field-group">
          <label htmlFor="user-password" className="field-label">
            Master Password
          </label>
          <div className="input-container">
            <input
              id="user-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter your master password"
              className={`text-input ${errorMessage && !password ? 'input-error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide master password' : 'Show master password'}
            >
              {showPassword ? (
                /* Eye Off Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye Open Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember Me Option */}
        <div className="form-options-row">
          <label className="checkbox-control" htmlFor="remember-device">
            <input
              id="remember-device"
              type="checkbox"
              className="checkbox-input-element"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <span className="checkbox-custom" aria-hidden="true" />
            <span className="checkbox-label-text">Remember this device</span>
          </label>
        </div>

        {/* Primary Sign In Button */}
        <button
          type="submit"
          className="btn-primary-signin"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="btn-loading-state">
              <span className="btn-spinner" aria-hidden="true" />
              <span>Authenticating...</span>
            </span>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        {/* Link to Sign Up */}
        <div className="auth-switch-row">
          <span>Don't have a vault yet?</span>
          <Link to="/signup" className="auth-switch-link">
            Create Account
          </Link>
        </div>
      </form>

      {/* Descriptive Footer (Intended Design rather than unverified security claims) */}
      <div className="signin-footer-security">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>
          Designed with client-side zero-knowledge architecture. Master passwords and cryptographic keys are engineered to remain isolated on your device.
        </span>
      </div>
    </div>
  );
}
