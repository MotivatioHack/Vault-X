import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryCards from '../components/dashboard/SummaryCards';
import FilesToolbar from '../components/dashboard/FilesToolbar';
import FilesList from '../components/dashboard/FilesList';
import UploadModal from '../components/dashboard/UploadModal';
import DeleteConfirmModal from '../components/dashboard/DeleteConfirmModal';
import '../styles/dashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function VaultDashboard() {
  const { user, logout } = useAuth();

  // Navigation & View State
  const [currentView, setCurrentView] = useState('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('list');

  // Modals & Mobile Drawer State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Files Data (Fetched from backend)
  const [filesData, setFilesData] = useState({
    files: [],
    count: 0,
    storageUsedBytes: 0,
    quotaBytes: 5 * 1024 * 1024 * 1024,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real file inventory from backend on mount
  useEffect(() => {
    let isMounted = true;

    async function loadFiles() {
      try {
        const response = await fetch(`${API_BASE_URL}/files`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include', // Include HttpOnly session cookie
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted && data.success) {
            setFilesData({
              files: data.files || [],
              count: data.count || 0,
              storageUsedBytes: data.storageUsedBytes || 0,
              quotaBytes: data.quotaBytes || 5 * 1024 * 1024 * 1024,
            });
          }
        }
      } catch {
        // Fallback to baseline initialized state
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadFiles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort files based on state
  const displayedFiles = useMemo(() => {
    let result = [...filesData.files];

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((f) => f.name && f.name.toLowerCase().includes(q));
    }

    // 2. Category Filter
    if (activeFilter !== 'all') {
      result = result.filter((f) => {
        const ext = (f.extension || '').toLowerCase();
        if (activeFilter === 'documents') {
          return ['pdf', 'docx', 'doc', 'txt', 'rtf', 'xlsx'].includes(ext);
        }
        if (activeFilter === 'images') {
          return ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(ext);
        }
        if (activeFilter === 'archives') {
          return ['zip', 'tar', 'gz', '7z', 'rar'].includes(ext);
        }
        if (activeFilter === 'media') {
          return ['mp4', 'mov', 'mp3', 'wav'].includes(ext);
        }
        return true;
      });
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
      if (sortBy === 'size-asc') return (a.size || 0) - (b.size || 0);
      if (sortBy === 'size-desc') return (b.size || 0) - (a.size || 0);
      if (sortBy === 'date-asc') {
        return new Date(a.uploadedAt || 0) - new Date(b.uploadedAt || 0);
      }
      // default: date-desc
      return new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0);
    });

    return result;
  }, [filesData.files, searchQuery, activeFilter, sortBy]);

  return (
    <div className="dashboard-layout-wrapper">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenUpload={() => setIsUploadOpen(true)}
        storageUsedBytes={filesData.storageUsedBytes}
        quotaBytes={filesData.quotaBytes}
        user={user}
        onLogout={logout}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="dashboard-content-viewport">
        {/* Sticky Header */}
        <DashboardHeader
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogout={logout}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        {/* Scrollable Dashboard Body */}
        <main className="dashboard-main-scrollable">
          {/* Top Metric Summary Cards */}
          <SummaryCards
            fileCount={filesData.count}
            storageUsedBytes={filesData.storageUsedBytes}
            quotaBytes={filesData.quotaBytes}
            user={user}
          />

          {/* Files Explorer Section */}
          <section className="vault-files-section" aria-label="Encrypted File Inventory">
            <FilesToolbar
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalItems={displayedFiles.length}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />

            <FilesList
              files={displayedFiles}
              viewMode={viewMode}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onOpenUpload={() => setIsUploadOpen(true)}
              onSelectDelete={(file) => setFileToDelete(file)}
            />
          </section>

          {/* Milestone Scope Footer Banner */}
          <div className="dashboard-scope-footer">
            <div className="scope-footer-content">
              <span className="scope-footer-icon">🔒</span>
              <span className="scope-footer-text">
                <strong>Brick 3 Milestone Active:</strong> Authenticated dashboard foundation and file management interface deployed. Client-side cryptographic key derivation and AES-256-GCM chunked file encryption will be integrated in Brick 4.
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal Dialog */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      {/* Delete Confirmation Modal Dialog */}
      <DeleteConfirmModal
        file={fileToDelete}
        onClose={() => setFileToDelete(null)}
      />
    </div>
  );
}
