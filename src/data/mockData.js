
const CATEGORIES = [
  'Tech Review',
  'Tutorial',
  'Gaming',
  'Vlog',
  'Education',
  'Entertainment',
  'Music',
  'Lifestyle'
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['Morning', 'Afternoon', 'Evening', 'Night'];

const generateSyntheticData = (count = 1000) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const uploadDay = DAYS[Math.floor(Math.random() * DAYS.length)];
    const uploadTime = TIMES[Math.floor(Math.random() * TIMES.length)];
    const duration = Math.floor(Math.random() * 25) + 3; // 3 to 28 mins
    const hasThumbnail = Math.random() > 0.2;
    const hasEndScreen = Math.random() > 0.3;
    const hasCards = Math.random() > 0.4;
    const titleLength = Math.floor(Math.random() * 70) + 10;

    // Base engagement factors
    let baseMultiplier = 1;
    if (['Tech Review', 'Tutorial', 'Gaming'].includes(category)) baseMultiplier += 0.3;
    if (uploadTime === 'Evening') baseMultiplier += 0.2;
    if (['Sat', 'Sun'].includes(uploadDay)) baseMultiplier += 0.15;
    if (hasThumbnail) baseMultiplier += 0.4;
    if (duration >= 8 && duration <= 12) baseMultiplier += 0.1;

    const views = Math.floor((Math.random() * 50000 + 5000) * baseMultiplier);
    const likes = Math.floor(views * (0.04 + Math.random() * 0.04) * baseMultiplier);
    const comments = Math.floor(views * (0.005 + Math.random() * 0.01) * baseMultiplier);
    const shares = Math.floor(views * (0.002 + Math.random() * 0.005) * baseMultiplier);
    
    const engagementRate = ((likes + comments + shares) / views) * 100;
    const retentionRate = (30 + Math.random() * 40 + (duration > 15 ? -10 : 5)) ; // 20% to 75%

    data.push({
      id: `vid-${i}`,
      title: `${category} Video #${i + 1}`,
      category,
      views,
      likes,
      comments,
      shares,
      engagementRate,
      retentionRate,
      duration,
      uploadTime,
      uploadDay,
      titleLength,
      hasThumbnail,
      hasEndScreen,
      hasCards
    });
  }
  return data;
};

export const MOCK_DATA = generateSyntheticData();
export { CATEGORIES, DAYS, TIMES };
