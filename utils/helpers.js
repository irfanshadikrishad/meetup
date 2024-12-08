

export const getCurrentTime = () => {
    const now = new Date();
    return {
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        day: now.toLocaleString('en-US', { day: '2-digit' }),
        month: now.toLocaleString('en-US', { month: 'short' }),
        dayOfWeek: now.toLocaleString('en-US', { weekday: 'short' }),
    };
};
