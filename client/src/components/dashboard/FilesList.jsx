import React from 'react';

export default function FilesList({
  files = [],
  viewMode = 'list',
  searchQuery = '',
  onClearSearch,
  onOpenUpload,
  onSelectDelete,
}) {
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  // 1. Empty State (Real State: Zero files stored)
  if (files.length === 0 && !searchQuery) {
    return (
      <div className="empty-vault-container">
        <div className="empty-vault-illustration" aria-hidden="true">
          <div className="empty-outer-ring" />
          <div className="empty-mid-ring" />
          <div className="empty-vault-icon-circle">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z"
                fill="rgba(0, 242, 254, 0.12)"
                stroke="#00f2fe"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" stroke="#8b5cf6" strokeWidth="1.8" />
              <path d="M10.5 10.5V9C10.5 8.17 11.17 7.5 12 7.5C12.83 7.5 13.5 8.17 13.5 9V10.5" stroke="#8b5cf6" strokeWidth="1.8" />
            </svg>
          </div>
        </div>

        <h3 className="empty-vault-title">Your Encrypted Vault is Ready</h3>
        <p className="empty-vault-subtext">
          No files have been added yet. Your personal cloud storage space is ready to safeguard confidential documents, images, and archives.
        </p>

        <div className="empty-vault-actions">
          <button
            type="button"
            className="btn-empty-upload"
            onClick={onOpenUpload}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Upload Your First File</span>
          </button>
        </div>

        <div className="empty-vault-badge">
          <span className="empty-badge-dot" />
          <span>ZERO-KNOWLEDGE STORAGE LAYER ACTIVE</span>
        </div>
      </div>
    );
  }

  // 2. Empty Search Result State
  if (files.length === 0 && searchQuery) {
    return (
      <div className="empty-search-container">
        <div className="empty-search-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="8" x2="14" y2="14" />
            <line x1="14" y1="8" x2="8" y2="14" />
          </svg>
        </div>
        <h3 className="empty-search-title">No Matching Files Found</h3>
        <p className="empty-search-subtext">
          No items in your vault match the query "<strong>{searchQuery}</strong>".
        </p>
        <button
          type="button"
          className="btn-reset-search"
          onClick={onClearSearch}
        >
          Clear Search Query
        </button>
      </div>
    );
  }

  // 3. Render Files (List View vs Grid View)
  return (
    <div className={`files-presentation ${viewMode === 'grid' ? 'view-grid' : 'view-list'}`}>
      {viewMode === 'list' ? (
        <div className="files-table-wrapper">
          <table className="files-table">
            <thead>
              <tr>
                <th scope="col" className="col-name">Name</th>
                <th scope="col" className="col-type">Format</th>
                <th scope="col" className="col-size">Size</th>
                <th scope="col" className="col-date">Uploaded</th>
                <th scope="col" className="col-security">Security</th>
                <th scope="col" className="col-actions"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id || file._id} className="file-row">
                  <td className="col-name">
                    <div className="file-name-cell">
                      <div className="file-icon-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
                          <path d="M14 2V8H20" />
                        </svg>
                      </div>
                      <span className="file-name-text" title={file.name}>
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="col-type">
                    <span className="file-format-badge">{file.extension || 'FILE'}</span>
                  </td>
                  <td className="col-size font-mono">
                    {formatBytes(file.size)}
                  </td>
                  <td className="col-date font-mono">
                    {formatDate(file.uploadedAt || file.createdAt)}
                  </td>
                  <td className="col-security">
                    <span className="file-encryption-badge">
                      <span className="badge-lock-icon">🔒</span>
                      <span>AES-256-GCM</span>
                    </span>
                  </td>
                  <td className="col-actions">
                    <button
                      type="button"
                      className="btn-file-delete"
                      onClick={() => onSelectDelete(file)}
                      title={`Delete ${file.name}`}
                      aria-label={`Delete ${file.name}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="files-cards-grid">
          {files.map((file) => (
            <div key={file.id || file._id} className="file-grid-card">
              <div className="card-top-header">
                <div className="card-icon-large">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
                    <path d="M14 2V8H20" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="btn-file-delete-card"
                  onClick={() => onSelectDelete(file)}
                  aria-label={`Delete ${file.name}`}
                >
                  ✕
                </button>
              </div>

              <div className="card-body">
                <span className="card-filename" title={file.name}>
                  {file.name}
                </span>
                <span className="card-meta font-mono">
                  {formatBytes(file.size)} • {formatDate(file.uploadedAt || file.createdAt)}
                </span>
              </div>

              <div className="card-footer">
                <span className="file-encryption-badge">
                  <span className="badge-lock-icon">🔒</span>
                  <span>AES-256-GCM</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
