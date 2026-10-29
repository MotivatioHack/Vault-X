import React from 'react';
import VaultCinematicVisual from '../components/VaultCinematicVisual';
import SignInForm from '../components/SignInForm';
import '../styles/split-login.css';

export default function LoginPage() {
  return (
    <div className="split-viewport-wrapper">
      {/* Left Visual Panel: Cinematic Vault-X Cryptographic Experience (55% desktop width) */}
      <VaultCinematicVisual />

      {/* Right Sign-In Panel: Contrast Light Luxury Form (45% desktop width) */}
      <section className="signin-panel" aria-label="Sign In Portal">
        <SignInForm />
      </section>
    </div>
  );
}
