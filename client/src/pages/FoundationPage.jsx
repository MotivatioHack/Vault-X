import React from 'react';
import HealthBadge from '../components/HealthBadge';

export default function FoundationPage({ healthState }) {
  const { loading, isConnected, data, error, refetch } = healthState;

  return (
    <div className="vault-main">
      {/* Foundation Status Pill */}
      <div className="hero-badge">
        <span className="hero-badge-dot"></span>
        <span className="hero-badge-text">Vault-X Foundation Ready • Brick 1</span>
      </div>

      {/* Hero Headline */}
      <h1 className="hero-heading">
        Zero-Knowledge Encrypted <span className="hero-gradient-text">Cloud Storage</span>
      </h1>

      {/* Hero Subtitle */}
      <p className="hero-description">
        Client-side cryptographic architecture engineered for total confidentiality.
        Files are encrypted in-memory before leaving your device, ensuring zero-knowledge
        cloud transmission and storage.
      </p>

      {/* Architectural Pillars Cards */}
      <div className="foundation-cards-grid">
        <div className="foundation-card">
          <div className="card-tag">Pillar 01</div>
          <h3 className="card-title">Client-Side Cryptography</h3>
          <p className="card-desc">
            Native Web Crypto API utilizing AES-256-GCM encryption with Argon2id and PBKDF2 key derivation.
          </p>
        </div>

        <div className="foundation-card">
          <div className="card-tag">Pillar 02</div>
          <h3 className="card-title">Decoupled Express Core</h3>
          <p className="card-desc">
            Modular REST backend designed for high-throughput stream handling and zero-leakage metadata orchestration.
          </p>
        </div>

        <div className="foundation-card">
          <div className="card-tag">Pillar 03</div>
          <h3 className="card-title">Incremental Brick Pipeline</h3>
          <p className="card-desc">
            Systematic incremental milestone architecture with isolated testability across each development phase.
          </p>
        </div>
      </div>

      {/* Real-time Health Check Verification */}
      <HealthBadge
        loading={loading}
        isConnected={isConnected}
        data={data}
        error={error}
        onRefresh={refetch}
      />
    </div>
  );
}
