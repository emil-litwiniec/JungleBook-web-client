export const formatDays = (days: number | null): string => {
    switch (days) {
        case null:
            return 'n/a';
        case 1:
            return '1 day';
        default:
            return `${days} days`;
    }
};
