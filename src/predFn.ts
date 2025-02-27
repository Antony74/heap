export type PredicateFunction = (a: number | null, b: number | null) => boolean;

export const predFn = (a: number | null, b: number | null): boolean => {
    if (a === null) {
        return false;
    } else if (b === null) {
        return true;
    } else {
        return a < b;
    }
};
