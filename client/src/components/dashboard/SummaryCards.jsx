import React from 'react';

export default function SummaryCards({
  fileCount = 0,
  storageUsedBytes = 0,
  quotaBytes = 5 * 1024 * 1024 * 1024,
  user,
}) {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0.00 MB';
    const mb = bytes / (1024 * 1024);
    if (mb < 1024) {
      return `${mb.toFixed(2)} MB`;
    }
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };

  const formatQuota = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const cards = [
    {
      id: 'files',
      title: 'Stored Files',
      value: `${fileCount}`,
      subtext: fileCount === 0 ? 'Zero plaintext items stored' : `${fileCount} encrypted item${fileCount > 1 ? 's' : ''}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
          <path d="M14 2V8H20" />
          <path d="M10 13H14" />
          <path d="M10 17H14" />
        </svg>
      ),
      badgeText: 'REAL DATA',
      badgeClass: 'badge-cyan',
    },
    {
      id: 'storage',
      title: 'Vault Storage Used',
      value: formatBytes(storageUsedBytes),
      subtext: `of ${formatQuota(quotaBytes)} allocated cloud tier`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      badgeText: 'AVAILABLE',
      badgeClass: 'badge-violet',
    },
    {
      id: 'security',
      title: 'Security Architecture',
      value: 'Zero-Knowledge',
      subtext: 'Client-side key derivation planned',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      badgeText: 'ISOLATED',
      badgeClass: 'badge-cyan',
    },
    {
      id: 'session',
      title: 'Session Status',
      value: 'Active & Verified',
      subtext: 'HttpOnly cookie authorization',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      badgeText: 'CONNECTED',
      badgeClass: 'badge-green',
    },
  ];

  return (
    <section className="summary-cards-section" aria-label="Vault Statistics">
      <div className="summary-cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="summary-card">
            <div className="card-top-row">
              <span className="card-title">{card.title}</span>
              <div className="card-icon-wrapper">
                {card.icon}
              </div>
            </div>
            <div className="card-middle-row">
              <span className="card-main-value">{card.value}</span>
              <span className={`card-badge ${card.badgeClass}`}>{card.badgeText}</span>
            </div>
            <div className="card-bottom-row">
              <span className="card-subtext">{card.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
