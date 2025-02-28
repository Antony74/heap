export type PredFn = (a: number, b: number) => number;

export const createPredFnWithNull = (predFn: PredFn) => {
    return (a: number | null, b: number | null): number => {
        if (a === null) {
            return 1;
        } else if (b === null) {
            return -1;
        } else {
            return predFn(a, b);
        }
    };
};

export type PredFnWithNull = ReturnType<typeof createPredFnWithNull>;
