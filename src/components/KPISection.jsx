
import {
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Percent,
    Timer
} from 'lucide-react';

const KPISection = ({ stats }) => {
    const kpis = [
        { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: <Eye size={20} />, color: '#6366f1' },
        { label: 'Total Likes', value: stats.totalLikes.toLocaleString(), icon: <Heart size={20} />, color: '#ec4899' },
        { label: 'Total Comments', value: stats.totalComments.toLocaleString(), icon: <MessageCircle size={20} />, color: '#8b5cf6' },
        { label: 'Engagement Rate', value: `${stats.avgEngagement.toFixed(2)}%`, icon: <Percent size={20} />, color: '#10b981' },
        { label: 'Retention Rate', value: `${stats.avgRetention.toFixed(1)}%`, icon: <Timer size={20} />, color: '#f59e0b' },
    ];

    return (
        <div className="kpi-grid">
            {kpis.map((kpi, index) => (
                <div key={index} className="glass-panel kpi-card">
                    <div style={{ color: kpi.color, marginBottom: '5px' }}>
                        {kpi.icon}
                    </div>
                    <span className="kpi-label">{kpi.label}</span>
                    <span className="kpi-value">{kpi.value}</span>
                </div>
            ))}
        </div>
    );
};

export default KPISection;
