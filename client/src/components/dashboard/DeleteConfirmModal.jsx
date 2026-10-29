import React, { useEffect } from 'react';

export default function DeleteConfirmModal({ file, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!file) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-card delete-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-title-icon delete-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" />
              </svg>
            </div>
            <div>
              <h3 id="delete-dialog-title" className="modal-title">Delete File Confirmation</h3>
              <p className="modal-subtitle">Permanent vault file removal</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="delete-warning-text">
            Are you sure you want to permanently delete the file <strong className="delete-target-filename">"{file.name}"</strong>?
          </p>

          <div className="delete-notice-box">
            <span className="notice-icon">ℹ️</span>
            <span>
              <strong>Brick 3 Scope Notice:</strong> Active file deletion will be wired to MongoDB and GridFS storage in a later milestone once encrypted file storage is deployed.
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-delete-confirm"
            onClick={onClose}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
