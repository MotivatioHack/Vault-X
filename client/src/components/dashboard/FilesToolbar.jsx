import React from 'react';

export default function FilesToolbar({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalItems = 0,
  searchQuery,
  onClearSearch,
}) {
  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'documents', label: 'Documents' },
    { id: 'images', label: 'Images' },
    { id: 'archives', label: 'Archives' },
    { id: 'media', label: 'Media' },
  ];

  return (
    <div className="files-toolbar">
      {/* Left side: Heading & Filter Pills */}
      <div className="toolbar-left">
        <div className="toolbar-heading-group">
          <h2 className="toolbar-title">My Encrypted Vault</h2>
          <span className="toolbar-count-badge">{totalItems} items</span>
        </div>

        <div className="filter-pills-group" role="tablist" aria-label="Filter by file type">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat.id}
              className={`filter-pill ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side: Sort Controls & View Mode Toggle */}
      <div className="toolbar-right">
        {/* Active Search Indicator & Clear */}
        {searchQuery && (
          <div className="active-search-indicator">
            <span className="search-tag-text">Query: "{searchQuery}"</span>
            <button
              type="button"
              className="btn-clear-search"
              onClick={onClearSearch}
              title="Clear search"
            >
              ✕
            </button>
          </div>
        )}

        {/* Sort Select Dropdown */}
        <div className="sort-dropdown-container">
          <label htmlFor="files-sort-select" className="sr-only">
            Sort files by
          </label>
          <div className="sort-select-wrapper">
            <svg className="sort-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18M6 12h12m-9 6h6" />
            </svg>
            <select
              id="files-sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest Uploads</option>
              <option value="date-asc">Oldest Uploads</option>
              <option value="name-asc">Filename (A-Z)</option>
              <option value="name-desc">Filename (Z-A)</option>
              <option value="size-desc">Size (Largest)</option>
              <option value="size-asc">Size (Smallest)</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle: List vs Grid */}
        <div className="view-mode-toggle" role="group" aria-label="View presentation style">
          <button
            type="button"
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
            title="List view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
