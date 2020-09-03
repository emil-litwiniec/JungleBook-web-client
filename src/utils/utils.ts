export function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}