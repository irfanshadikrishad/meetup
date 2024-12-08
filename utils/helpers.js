function getFormattedDateTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const dayOfWeek = now.toLocaleString("en-US", { weekday: "short" });

    const dayOfMonth = now.getDate();

    const month = now.toLocaleString("en-US", { month: "short" });

    return `${hours}:${minutes} • ${dayOfWeek} ${dayOfMonth} ${month}`;
}

function convertLocalTimeToTimestamp(localTimeInput) {
    const localDate = new Date(localTimeInput);

    if (isNaN(localDate.getTime())) {
        return "Invalid Date";
    }

    const utcTimestampInMilliseconds = localDate.getTime();

    const utcTimestampInSeconds = Math.floor(utcTimestampInMilliseconds / 1000);

    return utcTimestampInSeconds;
}

function convertTimestampToLocalDate(unixTimestampInSeconds) {
    const localDate = new Date(unixTimestampInSeconds * 1000);

    if (isNaN(localDate.getTime())) {
        return "Invalid Date";
    }

    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const date = localDate.getDate();
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const seconds = localDate.getSeconds();

    return (
        `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")} ` +
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
}


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


export { getFormattedDateTime }