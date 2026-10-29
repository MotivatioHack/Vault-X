import React, { useState, useEffect } from 'react';

/**
 * 5-Stage Cinematic Encryption Simulation Sequence:
 * Stage A: File detected (confidential_document.pdf) with smooth entrance animation
 * Stage B: Encryption processing with scanning beam, ciphertext fragments, and 0->100% progress
 * Stage C: File transformation into confidential_document.enc with an elegant light pulse
 * Stage D: Vault secured with illuminated shield/lock and restrained cyan/violet glow
 * Stage E: Smooth transition and seamless looping
 */
const STAGES = {
  A_DETECTED: 'A',
  B_PROCESSING: 'B',
  C_TRANSFORM: 'C',
  D_SECURED: 'D',
  E_LOOPING: 'E',
};

export default function VaultCinematicVisual() {
  const [currentStage, setCurrentStage] = useState(STAGES.A_DETECTED);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressTimer = null;
    let stageTimer = null;

    if (currentStage === STAGES.A_DETECTED) {
      setProgress(0);
      stageTimer = setTimeout(() => {
        setCurrentStage(STAGES.B_PROCESSING);
      }, 3000);
    } else if (currentStage === STAGES.B_PROCESSING) {
      const startTime = Date.now();
      const duration = 3600; // 3.6s smooth easing to 100%
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentVal = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(currentVal);
        if (currentVal >= 100) {
          clearInterval(progressTimer);
          setCurrentStage(STAGES.C_TRANSFORM);
        }
      }, 40);
    } else if (currentStage === STAGES.C_TRANSFORM) {
      setProgress(100);
      stageTimer = setTimeout(() => {
        setCurrentStage(STAGES.D_SECURED);
      }, 3200);
    } else if (currentStage === STAGES.D_SECURED) {
      stageTimer = setTimeout(() => {
        setCurrentStage(STAGES.E_LOOPING);
      }, 3200);
    } else if (currentStage === STAGES.E_LOOPING) {
      stageTimer = setTimeout(() => {
        setCurrentStage(STAGES.A_DETECTED);
      }, 1000);
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (stageTimer) clearTimeout(stageTimer);
    };
  }, [currentStage]);

  const isEncrypted =
    currentStage === STAGES.C_TRANSFORM ||
    currentStage === STAGES.D_SECURED ||
    currentStage === STAGES.E_LOOPING;

  return (
    <div className="cinematic-panel" aria-label="Illustrative encryption simulation">
      {/* Background Matrix & Subtle Cyber Ambient Glows */}
      <div className="cinematic-bg-grid" aria-hidden="true" />
      <div className="cinematic-ambient-glow-1" aria-hidden="true" />
      <div className="cinematic-ambient-glow-2" aria-hidden="true" />

      {/* Top Branding Header with Explicit Simulation Label */}
      <div className="cinematic-brand-header">
        <div className="brand-emblem-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="brand-emblem-svg">
            <path
              d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
              stroke="url(#vaultShieldGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#00f2fe" strokeWidth="1.8" />
            <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#00f2fe" strokeWidth="1.8" />
            <defs>
              <linearGradient id="vaultShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
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

        {/* Clear Accuracy Requirement Label */}
        <div className="brand-protocol-pill" title="Demonstration only">
          <span className="protocol-pulse-dot" />
          <span>Illustrative encryption simulation</span>
        </div>
      </div>

      {/* Center Stage: Holographic Chamber & Central Floating File */}
      <div className="encryption-stage-container">
        {/* Holographic Ring Structure */}
        <div
          className={`holo-ring outer-ring ${
            currentStage === STAGES.D_SECURED ? 'secured-pulse' : ''
          }`}
        />
        <div
          className={`holo-ring middle-ring ${
            currentStage === STAGES.B_PROCESSING ? 'processing-active' : ''
          }`}
        />
        <div className="holo-ring inner-ring" />

        {/* Floating File Representation */}
        <div
          className={`floating-file-card stage-${currentStage.toLowerCase()} ${
            currentStage === STAGES.C_TRANSFORM ? 'transforming-pulse' : ''
          }`}
        >
          {/* Stage B: Cyan / Violet Scanning Laser Beam */}
          {currentStage === STAGES.B_PROCESSING && (
            <div className="laser-scanning-beam" aria-hidden="true">
              <div className="laser-glow" />
            </div>
          )}

          {/* Stage D: Illuminated Vault Secured Overlay */}
          <div
            className={`vault-secure-stamp ${
              currentStage === STAGES.D_SECURED || currentStage === STAGES.E_LOOPING
                ? 'visible'
                : ''
            }`}
          >
            <div className="stamp-icon-circle">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                  fill="rgba(0, 242, 254, 0.18)"
                  stroke="#00f2fe"
                  strokeWidth="2.2"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#00f2fe"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="stamp-text-group">
              <span className="stamp-main-text">VAULT SECURED</span>
              <span className="stamp-sub-text">Encrypted</span>
            </div>
          </div>

          {/* File Card Top Header */}
          <div className="file-card-header">
            <div className={`file-type-icon ${isEncrypted ? 'icon-encrypted' : 'icon-plaintext'}`}>
              {isEncrypted ? (
                /* Encrypted Document Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M14 2V8H20" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="14" r="2.2" fill="#00f2fe" />
                  <path d="M10 16.5H14" stroke="#00f2fe" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                /* Plaintext Document Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                    stroke="#00f2fe"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M14 2V8H20" stroke="#00f2fe" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </div>

            <div className="file-meta">
              <span className="file-name">
                {isEncrypted ? 'confidential_document.enc' : 'confidential_document.pdf'}
              </span>
              <span className="file-format-tag">
                {isEncrypted ? 'AES-256-GCM CIPHERTEXT' : 'APPLICATION / PDF'}
              </span>
            </div>

            <div className="file-status-indicator">
              <span className={`status-pill pill-${currentStage.toLowerCase()}`}>
                {currentStage === STAGES.A_DETECTED && 'Detected'}
                {currentStage === STAGES.B_PROCESSING && 'Processing'}
                {currentStage === STAGES.C_TRANSFORM && 'Encrypted'}
                {currentStage === STAGES.D_SECURED && 'Vault secured'}
                {currentStage === STAGES.E_LOOPING && 'Vault secured'}
              </span>
            </div>
          </div>

          {/* Cipher Matrix & Visual Transformation Body */}
          <div className="file-card-body">
            <div className="cipher-matrix-box">
              {isEncrypted ? (
                <div className="ciphertext-stream">
                  <div className="cipher-row"><code>0x7E3A9F • 8B9C421A • 90D2E14F</code></div>
                  <div className="cipher-row"><code>TAG: 5c8b21e4 • IV: 96-BIT GCM</code></div>
                  <div className="cipher-row"><code>PAYLOAD: AUTHENTICATED CIPHERTEXT</code></div>
                </div>
              ) : (
                <div className="plaintext-stream">
                  <div className="plain-row"><code>Source: confidential_document.pdf</code></div>
                  <div className="plain-row"><code>Status: Unencrypted plaintext memory buffer</code></div>
                  <div className="plain-row"><code>Target: Client AES-256-GCM encryption</code></div>
                </div>
              )}
            </div>

            {/* Stage B & C: Progress Indicator with Explicit Coordinated Status */}
            <div className="encryption-progress-wrapper">
              <div className="progress-labels">
                <span className="progress-stage-title">
                  {currentStage === STAGES.A_DETECTED && 'File detected'}
                  {currentStage === STAGES.B_PROCESSING && 'Encrypting file...'}
                  {currentStage === STAGES.C_TRANSFORM && 'Transformation complete'}
                  {currentStage === STAGES.D_SECURED && 'Vault secured'}
                  {currentStage === STAGES.E_LOOPING && 'Vault secured'}
                </span>
                <span className="progress-value">
                  {currentStage === STAGES.A_DETECTED
                    ? '0%'
                    : currentStage === STAGES.B_PROCESSING
                    ? `${progress}%`
                    : '100%'}
                </span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{
                    width:
                      currentStage === STAGES.A_DETECTED
                        ? '0%'
                        : currentStage === STAGES.B_PROCESSING
                        ? `${progress}%`
                        : '100%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card Footer Telemetry */}
          <div className="file-card-footer">
            <div className="telemetry-item">
              <span className="telemetry-label">CIPHER</span>
              <span className="telemetry-val">AES-256-GCM</span>
            </div>
            <div className="telemetry-separator" />
            <div className="telemetry-item">
              <span className="telemetry-label">DERIVATION</span>
              <span className="telemetry-val">Argon2id</span>
            </div>
            <div className="telemetry-separator" />
            <div className="telemetry-item">
              <span className="telemetry-label">KEY ISOLATION</span>
              <span className="telemetry-val">Client Device</span>
            </div>
          </div>
        </div>

        {/* Ambient Floating Fragment Particles */}
        <div className="floating-fragments-container" aria-hidden="true">
          <div className="fragment-particle p1">0x8F</div>
          <div className="fragment-particle p2">AES-256</div>
          <div className="fragment-particle p3">GCM</div>
          <div className="fragment-particle p4">ZERO-LEAK</div>
          <div className="fragment-particle p5">IV-96</div>
        </div>
      </div>

      {/* Illustrative Simulation Footnote Notice */}
      <div className="cinematic-footer-notice">
        <span className="notice-lock-icon">🔒</span>
        <span>
          Illustrative encryption simulation. Demonstrates client-side zero-knowledge transformation. No real files are uploaded or encrypted during preview.
        </span>
      </div>
    </div>
  );
}
