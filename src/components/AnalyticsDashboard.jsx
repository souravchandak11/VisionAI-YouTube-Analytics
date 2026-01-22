
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    ScatterChart,
    Scatter,
    ZAxis,
    Cell
} from 'recharts';
import { BarChart3, Clock, Calendar, MoveHorizontal } from 'lucide-react';
import { useMemo } from 'react';

const AnalyticsDashboard = ({ data }) => {
    const categoryData = useMemo(() => {
        const categories = {};
        data.forEach(v => {
            if (!categories[v.category]) categories[v.category] = { name: v.category, views: 0, count: 0 };
            categories[v.category].views += v.views;
            categories[v.category].count += 1;
        });
        return Object.values(categories).map(c => ({
            ...c,
            avgViews: Math.round(c.views / c.count)
        })).sort((a, b) => b.avgViews - a.avgViews);
    }, [data]);

    const timeData = useMemo(() => {
        const times = {};
        data.forEach(v => {
            if (!times[v.uploadTime]) times[v.uploadTime] = { name: v.uploadTime, views: 0, count: 0 };
            times[v.uploadTime].views += v.views;
            times[v.uploadTime].count += 1;
        });
        return ['Morning', 'Afternoon', 'Evening', 'Night'].map(t => ({
            name: t,
            avgViews: Math.round(times[t].views / times[t].count)
        }));
    }, [data]);

    const dayData = useMemo(() => {
        const days = {};
        data.forEach(v => {
            if (!days[v.uploadDay]) days[v.uploadDay] = { name: v.uploadDay, views: 0, count: 0 };
            days[v.uploadDay].views += v.views;
            days[v.uploadDay].count += 1;
        });
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => ({
            name: d,
            avgViews: Math.round(days[d].views / days[d].count)
        }));
    }, [data]);

    const scatterData = useMemo(() => {
        return data.slice(0, 200).map(v => ({
            duration: v.duration,
            engagement: v.engagementRate,
            views: v.views
        }));
    }, [data]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-panel" style={{ padding: '10px', border: '1px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{label}</p>
                    <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                        {payload[0].value.toLocaleString()} {payload[0].name === 'avgViews' ? 'Avg Views' : 'Value'}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="charts-grid">
            <div className="glass-panel chart-container">
                <div className="chart-title">
                    <BarChart3 size={18} color="var(--accent-purple)" />
                    Category Performance
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="avgViews" radius={[4, 4, 0, 0]}>
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : 'var(--secondary)'} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="glass-panel chart-container">
                <div className="chart-title">
                    <Clock size={18} color="var(--accent-orange)" />
                    Upload Time Analysis
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="avgViews" fill="var(--accent-orange)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="glass-panel chart-container">
                <div className="chart-title">
                    <Calendar size={18} color="var(--accent-green)" />
                    Day of Week Trends
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={dayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="avgViews" stroke="var(--accent-green)" strokeWidth={3} dot={{ fill: 'var(--accent-green)', r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="glass-panel chart-container">
                <div className="chart-title">
                    <MoveHorizontal size={18} color="var(--secondary)" />
                    Duration vs Engagement
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" dataKey="duration" name="Duration" unit="m" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis type="number" dataKey="engagement" name="Engagement" unit="%" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <ZAxis type="number" dataKey="views" range={[50, 400]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Videos" data={scatterData} fill="var(--secondary)" fillOpacity={0.6} stroke="#3b82f6" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
