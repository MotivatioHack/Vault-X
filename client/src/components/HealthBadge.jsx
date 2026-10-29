import React from 'react';

export default function HealthBadge({ loading, isConnected, data, error, onRefresh }) {
  return (
    <div className="health-box">
      <div className="health-status-info">
        <div
          className={`status-indicator-light ${
            loading ? 'connecting' : isConnected ? 'connected' : 'disconnected'
          }`}
        />
        <div>
          <div className="health-status-title">
            {loading
              ? 'Checking Core API Connection...'
              : isConnected
              ? 'Backend API Connection: Operational'
              : 'Backend API Connection: Disconnected'}
          </div>
          <div className="health-status-detail">
            {isConnected && data
              ? `Endpoint: /api/health • Mode: ${data.environment || 'development'} • Synced: ${new Date(
                  data.timestamp
                ).toLocaleTimeString()}`
              : error
              ? `Connection error: ${error}`
              : 'Waiting for response from localhost:5000...'}
          </div>
        </div>
      </div>

      <div className="health-badge-meta">
        {isConnected && data && (
          <span className="meta-pill">HTTP 200 OK</span>
        )}
        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
          type="button"
        >
          {loading ? 'Pinging...' : 'Ping API'}
        </button>
      </div>
    </div>
  );
}
