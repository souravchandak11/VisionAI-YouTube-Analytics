
export const exportToCSV = (data) => {
    const headers = [
        'Title', 'Category', 'Views', 'Likes', 'Comments',
        'Engagement Rate (%)', 'Retention Rate (%)', 'Duration (min)',
        'Upload Day', 'Upload Time', 'Has Thumbnail'
    ];

    const rows = data.map(v => [
        `"${v.title}"`,
        v.category,
        v.views,
        v.likes,
        v.comments,
        v.engagementRate.toFixed(2),
        v.retentionRate.toFixed(1),
        v.duration,
        v.uploadDay,
        v.uploadTime,
        v.hasThumbnail
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `youtube_analytics_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
