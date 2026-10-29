import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpForm() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  // Inputs strictly initialize to empty strings
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

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

    // 3. Validate Master Password Presence
    if (!password) {
      setErrorMessage('Please enter a master password.');
      return;
    }

    // 4. Validate Master Password Length
    if (password.length < 8) {
      setErrorMessage('Master password must be at least 8 characters long.');
      return;
    }

    // 5. Validate Password Confirmation
    if (!confirmPassword) {
      setErrorMessage('Please confirm your master password.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Master passwords do not match. Please re-enter.');
      return;
    }

    // 6. Form Submission & Real Backend Registration
    setIsLoading(true);

    try {
      await register(trimmedEmail, password);
      setSuccessMessage('Account registered successfully! Accessing your encrypted vault...');

      // Seamlessly log in newly created user and redirect to vault
      try {
        await login(trimmedEmail, password, false);
      } catch {
        // If auto-login encounters an issue, route user to sign in
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setErrorMessage(
        err.message || 'Registration failed. An account with this email may already exist.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-panel-content">
      <div className="signin-header">
        <h2 className="signin-title">Create Your Vault</h2>
        <p className="signin-subtitle">
          Set up zero-knowledge end-to-end encrypted cloud storage.
        </p>
      </div>

      {/* Dedicated Validation / Registration Error Area */}
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

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="form-alert alert-success" role="status" aria-live="polite">
          <svg className="alert-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" />
            <path d="M8 12l2.5 2.5L16 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="alert-message">{successMessage}</span>
        </div>
      )}

      {/* The Sign-Up Form */}
      <form className="signin-form" onSubmit={handleFormSubmit} noValidate autoComplete="off">
        {/* Email Input Field */}
        <div className="form-field-group">
          <label htmlFor="signup-email" className="field-label">
            Email Address
          </label>
          <div className="input-container">
            <input
              id="signup-email"
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
          <label htmlFor="signup-password" className="field-label">
            Master Password
          </label>
          <div className="input-container">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="At least 8 characters"
              className={`text-input ${errorMessage && (!password || password.length < 8) ? 'input-error' : ''}`}
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

        {/* Confirm Master Password Field */}
        <div className="form-field-group">
          <label htmlFor="signup-confirm-password" className="field-label">
            Confirm Master Password
          </label>
          <div className="input-container">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Re-enter your master password"
              className={`text-input ${errorMessage && password !== confirmPassword ? 'input-error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              className="toggle-visibility-btn"
              onClick={toggleConfirmPasswordVisibility}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? (
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

        {/* Password Hint */}
        <p className="password-policy-hint">
          Password must be at least 8 characters. Make sure to remember it, as Vault-X uses zero-knowledge encryption and cannot reset it for you.
        </p>

        {/* Primary Register Button */}
        <button
          type="submit"
          className="btn-primary-signin"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="btn-loading-state">
              <span className="btn-spinner" aria-hidden="true" />
              <span>Creating Vault Account...</span>
            </span>
          ) : (
            <span>Create Vault Account</span>
          )}
        </button>

        {/* Link back to Sign In */}
        <div className="auth-switch-row">
          <span>Already have a vault?</span>
          <Link to="/login" className="auth-switch-link">
            Sign In
          </Link>
        </div>
      </form>

      {/* Descriptive Footer */}
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
