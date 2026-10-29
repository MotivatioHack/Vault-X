import React, { useState, useRef, useEffect } from 'react';

export default function UploadModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showScopeNotice, setShowScopeNotice] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Keyboard accessibility: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedFile(null);
    setValidationError('');
    setShowScopeNotice(false);
    onClose();
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const processFile = (file) => {
    setValidationError('');
    setShowScopeNotice(false);

    if (!file) return;

    // Validation: Max 50 MB limit
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setValidationError('File size exceeds the 50 MB limit. Please select a smaller file.');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleTriggerUpload = () => {
    if (!selectedFile) return;
    // Brick 3 Strict Rule: Do not upload plaintext files. Display honest architectural notice!
    setShowScopeNotice(true);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="presentation"
    >
      <div
        className="modal-card"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-title-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <h3 id="upload-modal-title" className="modal-title">Secure Vault Upload</h3>
              <p className="modal-subtitle">Zero-knowledge encrypted cloud storage</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close upload dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Drag & Drop Target Area */}
          <div
            className={`dropzone-container ${isDraggingOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            aria-label="Drag and drop files here, or click to browse"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <div className="dropzone-center-content">
              <div className="dropzone-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m8 16 4-4 4 4" />
                </svg>
              </div>
              <h4 className="dropzone-prompt">
                {isDraggingOver ? 'Drop file to stage for encryption' : 'Drag & drop file here, or browse'}
              </h4>
              <p className="dropzone-limits">
                All document formats, images, and archives supported (Max 50 MB)
              </p>
            </div>
          </div>

          {/* Validation Error Alert */}
          {validationError && (
            <div className="modal-alert alert-error" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="#dc2626" />
              </svg>
              <span>{validationError}</span>
            </div>
          )}

          {/* Selected File Card Preview */}
          {selectedFile && (
            <div className="selected-file-preview-card">
              <div className="selected-file-left">
                <div className="selected-file-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
                    <path d="M14 2V8H20" />
                  </svg>
                </div>
                <div className="selected-file-meta">
                  <span className="selected-filename" title={selectedFile.name}>
                    {selectedFile.name}
                  </span>
                  <span className="selected-filesize font-mono">
                    {formatBytes(selectedFile.size)} • {selectedFile.type || 'Binary Document'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-remove-selection"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setShowScopeNotice(false);
                }}
                aria-label="Remove selected file"
              >
                ✕
              </button>
            </div>
          )}

          {/* Honest Milestone Scope Banner (Brick 3 Boundary) */}
          {showScopeNotice && (
            <div className="encryption-scope-banner" role="status" aria-live="polite">
              <div className="banner-top-badge">
                <span className="banner-lock-icon">🔒</span>
                <span>Brick 3 Architecture Notice • Client Encryption Pipeline Pending</span>
              </div>
              <p className="banner-text">
                To guarantee zero-knowledge privacy, Vault-X strictly prohibits sending unencrypted files to the server.
                The in-browser <strong>AES-256-GCM chunked encryption engine</strong> and <strong>Argon2id key derivation</strong> are scheduled for the next development brick.
              </p>
              <div className="banner-footer-status">
                <span className="status-indicator-dot" />
                <span>File transmission held locally. Plaintext will never touch the database.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn-modal-submit"
            disabled={!selectedFile}
            onClick={handleTriggerUpload}
          >
            <span>Encrypt & Store in Vault</span>
          </button>
        </div>
      </div>
    </div>
  );
}
