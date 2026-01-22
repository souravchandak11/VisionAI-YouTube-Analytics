
const TopVideosTable = ({ data }) => {
    const topVideos = [...data]
        .sort((a, b) => b.views - a.views)
        .slice(0, 15);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Video Title</th>
                        <th>Category</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Engagement</th>
                        <th>Retention</th>
                    </tr>
                </thead>
                <tbody>
                    {topVideos.map((video, index) => (
                        <tr key={video.id}>
                            <td style={{ fontWeight: 800, color: index < 3 ? 'var(--primary)' : 'var(--text-muted)' }}>
                                #{index + 1}
                            </td>
                            <td style={{ fontWeight: 600 }}>{video.title}</td>
                            <td>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    {video.category}
                                </span>
                            </td>
                            <td style={{ fontWeight: 700 }}>{video.views.toLocaleString()}</td>
                            <td>{video.likes.toLocaleString()}</td>
                            <td style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                                {video.engagementRate.toFixed(2)}%
                            </td>
                            <td>{video.retentionRate.toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopVideosTable;
