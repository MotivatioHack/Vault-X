import React, { useState, useEffect } from 'react';

/**
 * 5-Stage Cinematic Identity Verification & Vault Unlock Sequence:
 * Stage A: Secure vault idle state (concentric security rings, orbital motion, center shield)
 * Stage B: Identity scanning (vertical luminous scanning laser beam, accelerating ring rotations, pulse)
 * Stage C: Vault access verification (mechanism alignment, cyan/violet ring energy trails, status transition)
 * Stage D: Secure state (radiant shield illumination, "Vault Secured" verification banner, soft particle glow)
 * Stage E: Smooth transition and seamless looping
 */
const IDENTITY_STAGES = {
  A_IDLE: 'A',
  B_SCANNING: 'B',
  C_VERIFYING: 'C',
  D_SECURED: 'D',
  E_LOOPING: 'E',
};

export default function VaultIdentityVisual() {
  const [currentStage, setCurrentStage] = useState(IDENTITY_STAGES.A_IDLE);

  useEffect(() => {
    let timer = null;

    if (currentStage === IDENTITY_STAGES.A_IDLE) {
      timer = setTimeout(() => {
        setCurrentStage(IDENTITY_STAGES.B_SCANNING);
      }, 2800);
    } else if (currentStage === IDENTITY_STAGES.B_SCANNING) {
      timer = setTimeout(() => {
        setCurrentStage(IDENTITY_STAGES.C_VERIFYING);
      }, 3200);
    } else if (currentStage === IDENTITY_STAGES.C_VERIFYING) {
      timer = setTimeout(() => {
        setCurrentStage(IDENTITY_STAGES.D_SECURED);
      }, 3000);
    } else if (currentStage === IDENTITY_STAGES.D_SECURED) {
      timer = setTimeout(() => {
        setCurrentStage(IDENTITY_STAGES.E_LOOPING);
      }, 3000);
    } else if (currentStage === IDENTITY_STAGES.E_LOOPING) {
      timer = setTimeout(() => {
        setCurrentStage(IDENTITY_STAGES.A_IDLE);
      }, 900);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStage]);

  return (
    <div className="cinematic-panel" aria-label="Illustrative identity verification and vault unlock simulation">
      {/* Background Matrix & Cyber Ambient Glows */}
      <div className="cinematic-bg-grid" aria-hidden="true" />
      <div className="cinematic-ambient-glow-1" aria-hidden="true" />
      <div className="cinematic-ambient-glow-2" aria-hidden="true" />

      {/* Top Branding Header */}
      <div className="cinematic-brand-header">
        <div className="brand-emblem-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="brand-emblem-svg">
            <path
              d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
              stroke="url(#vaultIdentityGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#00f2fe" strokeWidth="1.8" />
            <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#00f2fe" strokeWidth="1.8" />
            <defs>
              <linearGradient id="vaultIdentityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="brand-text-container">
          <span className="brand-name">VAULT-X</span>
          <span className="brand-tagline">ZERO-KNOWLEDGE ARCHITECTURE</span>
        </div>

        {/* Accuracy Requirement Label */}
        <div className="brand-protocol-pill" title="Demonstration only">
          <span className="protocol-pulse-dot" />
          <span>Illustrative security simulation</span>
        </div>
      </div>

      {/* Center Stage: Holographic Security Core & Vault Mechanism */}
      <div className="identity-stage-container">
        <div className={`identity-vault-core stage-${currentStage.toLowerCase()}`}>
          {/* Ring 1: Outermost Coordinate Orbit Ring with Sector Markers */}
          <div className="core-orbit-ring" aria-hidden="true">
            <div className="orbit-tick tick-0" />
            <div className="orbit-tick tick-90" />
            <div className="orbit-tick tick-180" />
            <div className="orbit-tick tick-270" />
            <span className="orbit-label label-n">00° SEC</span>
            <span className="orbit-label label-e">90° ENC</span>
            <span className="orbit-label label-s">180° AUTH</span>
            <span className="orbit-label label-w">270° ZERO</span>
          </div>

          {/* Ring 2: Segmented Holographic Geared Ring */}
          <div className="core-segmented-ring" aria-hidden="true">
            <svg viewBox="0 0 380 380" className="core-ring-svg">
              <circle
                cx="190"
                cy="190"
                r="174"
                fill="none"
                stroke="rgba(0, 242, 254, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="18 12 6 12 36 12"
              />
              <circle
                cx="190"
                cy="190"
                r="156"
                fill="none"
                stroke="rgba(139, 92, 246, 0.22)"
                strokeWidth="1.5"
                strokeDasharray="4 8 16 8"
              />
            </svg>
          </div>

          {/* Ring 3: Circuit Reticle Track */}
          <div className="core-circuit-ring" aria-hidden="true">
            <svg viewBox="0 0 300 300" className="core-circuit-svg">
              {/* Circuit conduits radiating outward */}
              <line x1="150" y1="20" x2="150" y2="45" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1.5" />
              <line x1="150" y1="255" x2="150" y2="280" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1.5" />
              <line x1="20" y1="150" x2="45" y2="150" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" />
              <line x1="255" y1="150" x2="280" y2="150" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" />
              <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 6" />
            </svg>
          </div>

          {/* Ring 4: Iris Mechanical Alignment Aperture */}
          <div className="core-iris-aperture" aria-hidden="true">
            <div className="iris-blade blade-1" />
            <div className="iris-blade blade-2" />
            <div className="iris-blade blade-3" />
            <div className="iris-blade blade-4" />
            <div className="iris-blade blade-5" />
            <div className="iris-blade blade-6" />
          </div>

          {/* Identity Scanning Beam (Active during Stage B & C) */}
          {(currentStage === IDENTITY_STAGES.B_SCANNING || currentStage === IDENTITY_STAGES.C_VERIFYING) && (
            <div className="identity-scanner-sweep" aria-hidden="true">
              <div className="scanner-line" />
              <div className="scanner-glow" />
              <div className="scanner-particles">
                <span className="scan-bit s1">01</span>
                <span className="scan-bit s2">10</span>
                <span className="scan-bit s3">11</span>
                <span className="scan-bit s4">00</span>
              </div>
            </div>
          )}

          {/* Central Security Core: Multi-layered Holographic Vault Shield */}
          <div className="core-shield-chamber">
            <div className="shield-halo-glow" />
            <div className="shield-emblem-container">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="none" className="identity-shield-svg">
                {/* Outer Shield Hull */}
                <path
                  d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                  fill={
                    currentStage === IDENTITY_STAGES.D_SECURED || currentStage === IDENTITY_STAGES.E_LOOPING
                      ? 'rgba(0, 242, 254, 0.22)'
                      : 'rgba(13, 18, 30, 0.85)'
                  }
                  stroke={
                    currentStage === IDENTITY_STAGES.D_SECURED || currentStage === IDENTITY_STAGES.E_LOOPING
                      ? '#00f2fe'
                      : currentStage === IDENTITY_STAGES.B_SCANNING
                      ? '#38bdf8'
                      : currentStage === IDENTITY_STAGES.C_VERIFYING
                      ? '#8b5cf6'
                      : 'rgba(0, 242, 254, 0.6)'
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner Lock / Keyway Mechanism */}
                <rect
                  x="9"
                  y="10.5"
                  width="6"
                  height="5"
                  rx="1.2"
                  fill={
                    currentStage === IDENTITY_STAGES.D_SECURED
                      ? '#00f2fe'
                      : 'rgba(0, 242, 254, 0.4)'
                  }
                  stroke="#00f2fe"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 10.5V9C10 7.9 10.9 7 12 7C13.1 7 14 7.9 14 9V10.5"
                  stroke="#00f2fe"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="13" r="0.8" fill="#07090e" />
              </svg>
            </div>

            {/* Stage D / E: Success Emblem Ring & Text */}
            <div className={`vault-access-badge ${currentStage === IDENTITY_STAGES.D_SECURED || currentStage === IDENTITY_STAGES.E_LOOPING ? 'active' : ''}`}>
              <div className="badge-ring-pulse" />
              <span className="badge-status-text">VAULT SECURED</span>
            </div>
          </div>
        </div>

        {/* Ambient Orbiting Cryptographic Fragment Badges */}
        <div className="identity-fragments-group" aria-hidden="true">
          <div className="identity-fragment f1">AUTH-TOKEN</div>
          <div className="identity-fragment f2">ECDSA-P256</div>
          <div className="identity-fragment f3">HTTPONLY</div>
          <div className="identity-fragment f4">KEY-DERIVATION</div>
          <div className="identity-fragment f5">ZERO-LEAK</div>
        </div>

        {/* Sleek Floating Telemetry Capsule below the Core */}
        <div className="identity-telemetry-capsule">
          <div className="identity-status-row">
            <span className={`identity-status-pill pill-stage-${currentStage.toLowerCase()}`}>
              <span className="status-indicator-dot" />
              {currentStage === IDENTITY_STAGES.A_IDLE && 'Vault Core Idle • Monitoring'}
              {currentStage === IDENTITY_STAGES.B_SCANNING && 'Verifying identity...'}
              {currentStage === IDENTITY_STAGES.C_VERIFYING && 'Access verification simulation'}
              {currentStage === IDENTITY_STAGES.D_SECURED && 'Vault secured • Access confirmed'}
              {currentStage === IDENTITY_STAGES.E_LOOPING && 'Vault secured • Access confirmed'}
            </span>
          </div>

          <div className="identity-metrics-grid">
            <div className="metric-box">
              <span className="metric-tag">MECHANISM</span>
              <span className="metric-data">
                {currentStage === IDENTITY_STAGES.A_IDLE && 'ARMED'}
                {currentStage === IDENTITY_STAGES.B_SCANNING && 'SCANNING'}
                {currentStage === IDENTITY_STAGES.C_VERIFYING && 'ALIGNING'}
                {currentStage === IDENTITY_STAGES.D_SECURED && 'SECURED'}
                {currentStage === IDENTITY_STAGES.E_LOOPING && 'SECURED'}
              </span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-tag">SESSION PROTOCOL</span>
              <span className="metric-data">HttpOnly JWT</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-tag">ISOLATION</span>
              <span className="metric-data">Zero-Knowledge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Illustrative Simulation Footnote Notice */}
      <div className="cinematic-footer-notice">
        <span className="notice-lock-icon">🔒</span>
        <span>
          Illustrative security simulation. Demonstrates client-side identity verification and vault unlock sequence. Authentication is verified exclusively by the secure backend session.
        </span>
      </div>
    </div>
  );
}
