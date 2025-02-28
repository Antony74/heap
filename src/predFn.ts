export const predFn = (a: number | null, b: number | null): number => {
    if (a === null) {
        return 1;
    } else if (b === null) {
        return -1;
    } else {
        return a - b;
    }
};

export type PredicateFunction = typeof predFn;
