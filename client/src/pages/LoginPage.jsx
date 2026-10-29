import React from 'react';
import VaultIdentityVisual from '../components/VaultIdentityVisual';
import SignInForm from '../components/SignInForm';
import '../styles/split-login.css';

export default function LoginPage() {
  return (
    <div className="split-viewport-wrapper">
      {/* Left Visual Panel: Distinct Cinematic Identity Verification & Vault Unlock Experience (55% desktop width) */}
      <VaultIdentityVisual />

      {/* Right Sign-In Panel: Contrast Light Luxury Form (45% desktop width) */}
      <section className="signin-panel" aria-label="Sign In Portal">
        <SignInForm />
      </section>
    </div>
  );
}
