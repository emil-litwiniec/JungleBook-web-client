import { Plant } from '@/api/types';
import { getProperty } from '@/utils/utils';

const compareTimestamps = (a: Plant, b: Plant, propertyName: 'last_watering' | 'last_dew') => {
    if (!propertyName) return;
    const timestampA = Date.parse(getProperty(a, propertyName)) || Infinity;
    const timestampB = Date.parse(getProperty(b, propertyName)) || Infinity;

    if (timestampA > timestampB) {
        return 1;
    }
    if (timestampA < timestampB) {
        return -1;
    }

    return 0;
};

export const sortByNameIncrementally = (plants: Plant[]) => {
    const plantsCopy = JSON.parse(JSON.stringify(plants));
    return plantsCopy.sort((a: Plant, b: Plant) => a.name.localeCompare(b.name));
};

export const sortByNameDecrementally = (plants: Plant[]) => {
    const plantsCopy = JSON.parse(JSON.stringify(plants));
    return plantsCopy.sort((a: Plant, b: Plant) => b.name.localeCompare(a.name));
};

export const sortByLastWatering = (plants: Plant[]) => {
    const plantsCopy = JSON.parse(JSON.stringify(plants));
    return plantsCopy.sort((a: Plant, b: Plant) => compareTimestamps(a, b, 'last_watering'));
};

export const sortByLastDew = (plants: Plant[]) => {
    const plantsCopy = JSON.parse(JSON.stringify(plants));
    return plantsCopy.sort((a: Plant, b: Plant) => compareTimestamps(a, b, 'last_dew'));
};
