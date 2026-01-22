
import { useState, useMemo } from 'react';
import {
    CATEGORIES,
    DAYS,
    TIMES
} from '../data/mockData';
import { predictEngagement } from '../utils/mlEngine';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Tooltip
} from 'recharts';
import {
    Sparkles,
    Lightbulb,
    Settings2,
    Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const PredictionEngine = () => {
    const [params, setParams] = useState({
        category: 'Tech Review',
        duration: 10,
        uploadTime: 'Evening',
        uploadDay: 'Sat',
        titleLength: 45,
        hasThumbnail: true,
        hasEndScreen: true,
        hasCards: true
    });

    const prediction = useMemo(() => predictEngagement(params), [params]);

    const updateParam = (key, value) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="prediction-container">
            <div className="glass-panel config-panel">
                <div className="chart-title">
                    <Settings2 size={18} color="var(--primary)" />
                    Video Configuration
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select value={params.category} onChange={(e) => updateParam('category', e.target.value)}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Video Duration (Minutes): {params.duration}</label>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={params.duration}
                        onChange={(e) => updateParam('duration', parseInt(e.target.value))}
                        style={{ accentColor: 'var(--primary)' }}
                    />
                </div>

                <div className="form-group">
                    <label>Upload Time</label>
                    <select value={params.uploadTime} onChange={(e) => updateParam('uploadTime', e.target.value)}>
                        {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Day of Week</label>
                    <select value={params.uploadDay} onChange={(e) => updateParam('uploadDay', e.target.value)}>
                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Title Length (Characters): {params.titleLength}</label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        value={params.titleLength}
                        onChange={(e) => updateParam('titleLength', parseInt(e.target.value))}
                        style={{ accentColor: 'var(--primary)' }}
                    />
                </div>

                <div className="form-group">
                    <label>Visual Features</label>
                    <div className="toggle-group">
                        <button
                            className={`toggle-btn ${params.hasThumbnail ? 'active' : ''}`}
                            onClick={() => updateParam('hasThumbnail', !params.hasThumbnail)}
                        >
                            Thumbnail
                        </button>
                        <button
                            className={`toggle-btn ${params.hasEndScreen ? 'active' : ''}`}
                            onClick={() => updateParam('hasEndScreen', !params.hasEndScreen)}
                        >
                            End Screen
                        </button>
                        <button
                            className={`toggle-btn ${params.hasCards ? 'active' : ''}`}
                            onClick={() => updateParam('hasCards', !params.hasCards)}
                        >
                            Video Cards
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel score-card">
                    <div className="chart-title" style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                        <Target size={18} color="var(--primary)" />
                        Predicted Engagement Score
                    </div>
                    <div className="score-circle">
                        <motion.span
                            key={prediction.score}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            {prediction.score}
                        </motion.span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
                        This score represents the potential virality of your video based on historical channel patterns.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div className="chart-title">
                            <Sparkles size={18} color="#fcd34d" />
                            Feature Importance
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart layout="vertical" data={prediction.importance}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} width={80} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {prediction.importance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value >= 0 ? 'var(--accent-green)' : 'var(--primary)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div className="chart-title">
                            <Lightbulb size={18} color="var(--accent-orange)" />
                            Optimization Tips
                        </div>
                        <div className="recommendations-list">
                            {prediction.recommendations.map((rec, i) => (
                                <div key={i} className="rec-item">
                                    <span>💡</span>
                                    {rec}
                                </div>
                            ))}
                            {prediction.recommendations.length === 0 && (
                                <div style={{ color: 'var(--accent-green)', padding: '1rem', textAlign: 'center' }}>
                                    Configuration is optimal! Ready to upload.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionEngine;
