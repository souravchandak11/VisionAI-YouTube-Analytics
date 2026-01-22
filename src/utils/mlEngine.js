
export const predictEngagement = (features) => {
    const {
        category,
        duration,
        uploadTime,
        uploadDay,
        titleLength,
        hasThumbnail,
        hasEndScreen,
        hasCards
    } = features;

    let score = 50; // Base score

    // Weights (mimicking coefficients)
    const weights = {
        category: {
            'Tech Review': 15,
            'Tutorial': 12,
            'Gaming': 10,
            'Education': 8,
            'Vlog': 5,
            'Entertainment': 7,
            'Music': 6,
            'Lifestyle': 4
        },
        uploadTime: {
            'Morning': 2,
            'Afternoon': 5,
            'Evening': 12,
            'Night': -5
        },
        uploadDay: {
            'Mon': 2,
            'Tue': 3,
            'Wed': 4,
            'Thu': 5,
            'Fri': 7,
            'Sat': 10,
            'Sun': 10
        },
        thumbnail: 25,
        endScreen: 5,
        cards: 3,
        durationRange: (d) => (d >= 8 && d <= 12 ? 8 : d > 20 ? -5 : 2),
        titleLengthEffect: (l) => (l >= 30 && l <= 60 ? 5 : -3)
    };

    score += weights.category[category] || 0;
    score += weights.uploadTime[uploadTime] || 0;
    score += weights.uploadDay[uploadDay] || 0;
    score += hasThumbnail ? weights.thumbnail : 0;
    score += hasEndScreen ? weights.endScreen : 0;
    score += hasCards ? weights.cards : 0;
    score += weights.durationRange(duration);
    score += weights.titleLengthEffect(titleLength);

    // Normalize to 0-100
    score = Math.min(100, Math.max(0, score));

    // Feature Importance mapping for chart
    const importance = [
        { name: 'Thumbnail', value: weights.thumbnail },
        { name: 'Category', value: weights.category[category] || 0 },
        { name: 'Upload Time', value: weights.uploadTime[uploadTime] || 0 },
        { name: 'Day of Week', value: weights.uploadDay[uploadDay] || 0 },
        { name: 'Duration', value: weights.durationRange(duration) },
        { name: 'End Screen', value: hasEndScreen ? weights.endScreen : 0 },
        { name: 'Video Cards', value: hasCards ? weights.cards : 0 },
        { name: 'Title Length', value: weights.titleLengthEffect(titleLength) }
    ];

    // Recommendations
    const recommendations = [];
    if (!hasThumbnail) recommendations.push("Add a high-contrast custom thumbnail to boost CTR.");
    if (uploadTime !== 'Evening') recommendations.push("Consider uploading in the Evening (6PM-9PM) for maximum reach.");
    if (duration < 8 || duration > 12) recommendations.push("Aim for 8-12 minutes for optimal retention.");
    if (titleLength < 30 || titleLength > 60) recommendations.push("Keep titles between 40-60 characters for better readability.");
    if (!hasEndScreen) recommendations.push("Add an end screen to increase viewer session time.");

    return {
        score: Math.round(score),
        importance: importance.sort((a, b) => Math.abs(b.value) - Math.abs(a.value)),
        recommendations
    };
};
