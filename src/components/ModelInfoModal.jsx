
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModelInfoModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="glass-panel"
                        style={{
                            maxWidth: '700px',
                            width: '100%',
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            padding: '2.5rem',
                            position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Model Methodology</h2>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Algorithm Overview</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                VisionAI uses a weighted multi-variate scoring system to predict engagement. Each feature is assigned a coefficient based on historical patterns derived from the generated dataset of 1,000 videos.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Weights & Coefficients</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                <div className="glass-panel" style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Visual Features</div>
                                    <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', listStyle: 'none' }}>
                                        <li>• Custom Thumbnail: +25%</li>
                                        <li>• End Screens: +5%</li>
                                        <li>• Video Cards: +3%</li>
                                    </ul>
                                </div>
                                <div className="glass-panel" style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Audience Habit</div>
                                    <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', listStyle: 'none' }}>
                                        <li>• Evening Upload: +12%</li>
                                        <li>• Weekend Upload: +10%</li>
                                        <li>• Optimal Duration: +8%</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Data Generation Philosophy</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                The synthetic data is modeled using a Gaussian distribution for base views, with category-specific multipliers applied to simulate real YouTube niche dynamics. Tech and Tutorials are modeled with +30% higher base reach to reflect current market demand.
                            </p>
                        </section>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModelInfoModal;
