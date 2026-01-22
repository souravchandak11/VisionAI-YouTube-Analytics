
import { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  TrendingUp,
  Settings,
  Activity,
  Youtube,
  BarChart3,
  List
} from 'lucide-react';
import { MOCK_DATA } from './data/mockData';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PredictionEngine from './components/PredictionEngine';
import KPISection from './components/KPISection';
import TopVideosTable from './components/TopVideosTable';
import KeyInsights from './components/KeyInsights';
import ModelInfoModal from './components/ModelInfoModal';
import { exportToCSV } from './utils/exportUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Info as InfoIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo(() => {
    const totalViews = MOCK_DATA.reduce((acc, curr) => acc + curr.views, 0);
    const totalLikes = MOCK_DATA.reduce((acc, curr) => acc + curr.likes, 0);
    const totalComments = MOCK_DATA.reduce((acc, curr) => acc + curr.comments, 0);
    const avgEngagement = MOCK_DATA.reduce((acc, curr) => acc + curr.engagementRate, 0) / MOCK_DATA.length;
    const avgRetention = MOCK_DATA.reduce((acc, curr) => acc + curr.retentionRate, 0) / MOCK_DATA.length;

    return {
      totalViews,
      totalLikes,
      totalComments,
      avgEngagement,
      avgRetention
    };
  }, []);

  return (
    <div className="app-container">
      <div className="sidebar glass-panel">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Youtube size={32} color="#ff0000" fill="#ff0000" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Vision<span style={{ color: '#ff0000' }}>AI</span></h2>
        </div>

        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <LayoutDashboard size={20} />
            <span>Analytics</span>
          </div>
          <div
            className={`nav-link ${activeTab === 'prediction' ? 'active' : ''}`}
            onClick={() => setActiveTab('prediction')}
          >
            <BrainCircuit size={20} />
            <span>Prediction Mode</span>
          </div>
          <div className="nav-link">
            <TrendingUp size={20} />
            <span>Segments</span>
          </div>
        </nav>

        <div className="sidebar-footer" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
          <div className="nav-link">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </div>
      </div>

      <main className="main-content">
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              {activeTab === 'analytics' ? 'Channel Overview' : 'AI Prediction Engine'}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              {activeTab === 'analytics'
                ? 'Comprehensive analysis of your channel performance'
                : 'Simulate your next viral video with machine learning'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="glass-panel"
              style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'var(--transition-smooth)', border: '1px solid var(--glass-border)', background: 'var(--glass)' }}
            >
              <InfoIcon size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Model Info</span>
            </button>
            <button
              onClick={() => exportToCSV(MOCK_DATA)}
              className="glass-panel"
              style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-main)', cursor: 'pointer', transition: 'var(--transition-smooth)', border: '1px solid var(--glass-border)', background: 'var(--glass)' }}
            >
              <Download size={18} color="var(--accent-green)" />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Export Data</span>
            </button>
            <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Activity size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>VisionAI Live</span>
            </div>
          </div>
        </header>

        <ModelInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <AnimatePresence mode="wait">
          {activeTab === 'analytics' ? (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <KPISection stats={stats} />
              <KeyInsights data={MOCK_DATA} />
              <AnalyticsDashboard data={MOCK_DATA} />

              <div style={{ marginTop: '2.5rem' }}>
                <div className="chart-title">
                  <List size={20} color="var(--primary)" />
                  Top 15 Performing Videos
                </div>
                <TopVideosTable data={MOCK_DATA} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prediction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PredictionEngine />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
