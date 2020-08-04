import { Plant } from '@/api/types';

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
    return plantsCopy.sort((a: Plant, b: Plant) => {
        const timestampA = Date.parse(a.last_watering);
        const timestampB = Date.parse(b.last_watering);

        if (timestampA > timestampB) {
            return 1;
        }
        if (timestampA < timestampB) {
            return -1;
        }
        return 0;
    });

};

export const sortByLastDew = (plants: Plant[]) => {
    const plantsCopy = JSON.parse(JSON.stringify(plants));
    return plantsCopy.sort((a: Plant, b: Plant) => {
        const timestampA = Date.parse(a.last_dew);
        const timestampB = Date.parse(b.last_dew);

        if (timestampA > timestampB) {
            return 1;
        }
        if (timestampA < timestampB) {
            return -1;
        }
        return 0;
    });
}
