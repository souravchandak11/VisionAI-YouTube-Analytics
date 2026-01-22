
import {
    Zap,
    TrendingUp,
    Calendar,
    Image,
    Clock,
    Layout
} from 'lucide-react';
import { useMemo } from 'react';

const KeyInsights = ({ data }) => {
    const insights = useMemo(() => {
        // 1. Best Category
        const categories = {};
        data.forEach(v => {
            if (!categories[v.category]) categories[v.category] = { views: 0, count: 0 };
            categories[v.category].views += v.views;
            categories[v.category].count += 1;
        });
        const bestCategory = Object.entries(categories)
            .map(([name, stats]) => ({ name, avg: stats.views / stats.count }))
            .sort((a, b) => b.avg - a.avg)[0].name;

        // 2. Best Time
        const times = {};
        data.forEach(v => {
            if (!times[v.uploadTime]) times[v.uploadTime] = { views: 0, count: 0 };
            times[v.uploadTime].views += v.views;
            times[v.uploadTime].count += 1;
        });
        const bestTime = Object.entries(times)
            .map(([name, stats]) => ({ name, avg: stats.views / stats.count }))
            .sort((a, b) => b.avg - a.avg)[0].name;

        // 3. Best Day
        const days = {};
        data.forEach(v => {
            if (!days[v.uploadDay]) days[v.uploadDay] = { views: 0, count: 0 };
            days[v.uploadDay].views += v.views;
            days[v.uploadDay].count += 1;
        });
        const bestDay = Object.entries(days)
            .map(([name, stats]) => ({ name, avg: stats.views / stats.count }))
            .sort((a, b) => b.avg - a.avg)[0].name;

        // 4. Thumbnail Impact
        const withThumb = data.filter(v => v.hasThumbnail);
        const withoutThumb = data.filter(v => !v.hasThumbnail);
        const thumbImpact = (
            (withThumb.reduce((a, b) => a + b.views, 0) / withThumb.length) /
            (withoutThumb.reduce((a, b) => a + b.views, 0) / withoutThumb.length) - 1
        ) * 100;

        return [
            { label: 'Best Category', value: bestCategory, icon: <Layout size={20} />, color: 'var(--accent-purple)' },
            { label: 'Optimal Time', value: bestTime, icon: <Clock size={20} />, color: 'var(--accent-orange)' },
            { label: 'Best Day', value: bestDay, icon: <Calendar size={20} />, color: 'var(--accent-green)' },
            { label: 'Thumb Impact', value: `+${thumbImpact.toFixed(0)}% Views`, icon: <Image size={20} />, color: 'var(--primary)' },
        ];
    }, [data]);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            {insights.map((insight, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        background: `${insight.color}20`,
                        padding: '10px',
                        borderRadius: '12px',
                        color: insight.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {insight.icon}
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{insight.label}</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{insight.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KeyInsights;
