import React from 'react';
import VaultCinematicVisual from '../components/VaultCinematicVisual';
import SignUpForm from '../components/SignUpForm';
import '../styles/split-login.css';

export default function SignUpPage() {
  return (
    <div className="split-viewport-wrapper">
      {/* Left Visual Panel: Cinematic Vault-X Cryptographic Experience (55% desktop width) */}
      <VaultCinematicVisual />

      {/* Right Sign-Up Panel: Contrast Light Luxury Form (45% desktop width) */}
      <section className="signin-panel" aria-label="Sign Up Portal">
        <SignUpForm />
      </section>
    </div>
  );
}
