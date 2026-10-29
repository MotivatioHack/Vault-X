import React, { useState, useEffect } from 'react';

/**
 * 5-Stage Encryption Animation Lifecycle:
 * Stage 1: FILE_DETECTED  (0s - 2.8s)  - Plaintext file detected with file metadata
 * Stage 2: ENCRYPTING     (2.8s - 5.8s) - Laser scanning beam, particle telemetry, progress 0-100%
 * Stage 3: TRANSFORMING   (5.8s - 8.4s) - Visual transformation into encrypted ciphertext (.enc)
 * Stage 4: VAULT_SECURED  (8.4s - 11.2s)- Holographic lock snaps into place, status 'Vault Secured'
 * Stage 5: RE-LOOP        (11.2s - 12s) - Cross-fade transition and loop restart
 */
const STAGES = {
  DETECTED: 1,
  ENCRYPTING: 2,
  TRANSFORMED: 3,
  SECURED: 4,
};

export default function VaultCinematicVisual() {
  const [currentStage, setCurrentStage] = useState(STAGES.DETECTED);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval = null;
    let stageTimeout = null;

    if (currentStage === STAGES.DETECTED) {
      setProgress(0);
      stageTimeout = setTimeout(() => {
        setCurrentStage(STAGES.ENCRYPTING);
      }, 2600);
    } else if (currentStage === STAGES.ENCRYPTING) {
      const startTime = Date.now();
      const duration = 2800;
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setCurrentStage(STAGES.TRANSFORMED);
        }
      }, 50);
    } else if (currentStage === STAGES.TRANSFORMED) {
      setProgress(100);
      stageTimeout = setTimeout(() => {
        setCurrentStage(STAGES.SECURED);
      }, 2600);
    } else if (currentStage === STAGES.SECURED) {
      stageTimeout = setTimeout(() => {
        setCurrentStage(STAGES.DETECTED);
      }, 3000);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stageTimeout) clearTimeout(stageTimeout);
    };
  }, [currentStage]);

  return (
    <div className="cinematic-panel" aria-label="Vault-X Cryptographic Simulation">
      {/* Background Matrix/Grid & Ambient Glows */}
      <div className="cinematic-bg-grid" aria-hidden="true" />
      <div className="cinematic-ambient-glow-1" aria-hidden="true" />
      <div className="cinematic-ambient-glow-2" aria-hidden="true" />

      {/* Top Branding Header */}
      <div className="cinematic-brand-header">
        <div className="brand-emblem-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="brand-emblem-svg">
            <path
              d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
              stroke="url(#shieldGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#00f2fe" strokeWidth="1.8" />
            <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#00f2fe" strokeWidth="1.8" />
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="brand-text-container">
          <span className="brand-name">VAULT-X</span>
          <span className="brand-tagline">ZERO-KNOWLEDGE CRYPTOGRAPHY</span>
        </div>
        <div className="brand-protocol-pill">
          <span className="protocol-pulse-dot" />
          <span>AES-256-GCM / SHIELD</span>
        </div>
      </div>

      {/* Center Stage: Digital Vault & Encryption Chamber */}
      <div className="encryption-stage-container">
        {/* Holographic Ring Structure */}
        <div className={`holo-ring outer-ring ${currentStage === STAGES.SECURED ? 'secured' : ''}`} />
        <div className={`holo-ring middle-ring ${currentStage === STAGES.ENCRYPTING ? 'active' : ''}`} />
        <div className="holo-ring inner-ring" />

        {/* Central File & Transformation Card */}
        <div className={`floating-file-card stage-${currentStage}`}>
          {/* Scanning Laser Beam (Active during Stage 2) */}
          {currentStage === STAGES.ENCRYPTING && (
            <div className="laser-scanning-beam" aria-hidden="true">
              <div className="laser-glow" />
            </div>
          )}

          {/* Secure Lock Overlay (Active during Stage 4) */}
          <div className={`vault-secure-stamp ${currentStage === STAGES.SECURED ? 'visible' : ''}`}>
            <div className="stamp-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                  fill="rgba(0, 242, 254, 0.15)"
                  stroke="#00f2fe"
                  strokeWidth="2"
                />
                <path d="M9 12L11 14L15 10" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="stamp-text">VAULT SECURED</span>
          </div>

          {/* File Card Top Header */}
          <div className="file-card-header">
            <div className="file-type-icon">
              {currentStage >= STAGES.TRANSFORMED ? (
                /* Encrypted File Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="14" r="2" fill="#00f2fe" />
                  <path d="M10 16H14" stroke="#00f2fe" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                /* Plaintext PDF Document Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#00f2fe" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M14 2V8H20" stroke="#00f2fe" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="file-meta">
              <span className="file-name">
                {currentStage >= STAGES.TRANSFORMED ? 'confidential_document.enc' : 'confidential_document.pdf'}
              </span>
              <span className="file-format-tag">
                {currentStage >= STAGES.TRANSFORMED ? 'AES-256-GCM CIPHERTEXT' : 'APPLICATION / PDF'}
              </span>
            </div>
            <div className="file-status-indicator">
              <span className={`status-pill stage-${currentStage}`}>
                {currentStage === STAGES.DETECTED && 'Detected'}
                {currentStage === STAGES.ENCRYPTING && 'Processing'}
                {currentStage === STAGES.TRANSFORMED && 'Encrypted'}
                {currentStage === STAGES.SECURED && 'Secured'}
              </span>
            </div>
          </div>

          {/* Cipher Matrix / Data Hex Inspection Area */}
          <div className="file-card-body">
            <div className="cipher-matrix-box">
              {currentStage >= STAGES.TRANSFORMED ? (
                <div className="ciphertext-stream">
                  <div className="cipher-row"><code>0x7E3A9F • 8B9C421A • 90D2E14F</code></div>
                  <div className="cipher-row"><code>TAG: 5c8b21... • IV: 96-BIT GCM</code></div>
                  <div className="cipher-row"><code>KEY: CLIENT-SIDE ISOLATED</code></div>
                </div>
              ) : (
                <div className="plaintext-stream">
                  <div className="plain-row"><code>Content-Type: application/pdf</code></div>
                  <div className="plain-row"><code>Payload: 2.45 MB • Unencrypted</code></div>
                  <div className="plain-row"><code>Origin: Client Memory Buffer</code></div>
                </div>
              )}
            </div>

            {/* Scanning Progress Bar */}
            <div className="encryption-progress-wrapper">
              <div className="progress-labels">
                <span className="progress-stage-title">
                  {currentStage === STAGES.DETECTED && 'Source File Ready'}
                  {currentStage === STAGES.ENCRYPTING && `Encrypting Streams (${progress}%)`}
                  {currentStage === STAGES.TRANSFORMED && 'Cipher Transformation Complete'}
                  {currentStage === STAGES.SECURED && 'Digital Vault Sealed'}
                </span>
                <span className="progress-value">
                  {currentStage === STAGES.DETECTED ? '0%' : currentStage === STAGES.ENCRYPTING ? `${progress}%` : '100%'}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: currentStage === STAGES.DETECTED ? '0%' : currentStage === STAGES.ENCRYPTING ? `${progress}%` : '100%',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card Footer Telemetry */}
          <div className="file-card-footer">
            <div className="telemetry-item">
              <span className="telemetry-label">ALGORITHM</span>
              <span className="telemetry-val">AES-256-GCM</span>
            </div>
            <div className="telemetry-separator" />
            <div className="telemetry-item">
              <span className="telemetry-label">DERIVATION</span>
              <span className="telemetry-val">Argon2id</span>
            </div>
            <div className="telemetry-separator" />
            <div className="telemetry-item">
              <span className="telemetry-label">STORAGE</span>
              <span className="telemetry-val">Zero-Knowledge</span>
            </div>
          </div>
        </div>

        {/* Data Stream Circuit Fragments */}
        <div className="floating-fragments-container" aria-hidden="true">
          <div className="fragment-particle p1">0x8F</div>
          <div className="fragment-particle p2">AES</div>
          <div className="fragment-particle p3">GCM</div>
          <div className="fragment-particle p4">256-BIT</div>
          <div className="fragment-particle p5">ZERO-LEAK</div>
        </div>
      </div>

      {/* Illustrative Simulation Notice Footnote */}
      <div className="cinematic-footer-notice">
        <span className="notice-lock-icon">🔒</span>
        <span>
          Illustrative simulation. Client-side zero-knowledge encryption guarantees plaintext files and keys never leave your machine unencrypted.
        </span>
      </div>
    </div>
  );
}
