export type PredFn<T> = (a: T, b: T) => number;

export const createPredFnWithNull = <T>(predFn: PredFn<T>) => {
    return (a: T | null, b: T | null): number => {
        if (a === null) {
            return 1;
        } else if (b === null) {
            return -1;
        } else {
            return predFn(a, b);
        }
    };
};

export type PredFnWithNull<T> = ReturnType<typeof createPredFnWithNull<T>>;
