
export const createTreeArray = <T>() => {
    const arr: (T | null)[] = [null];

    return {
        getArray: () => arr,

        inRange: (index: number) => index > 0 && index < arr.length,

        getParentIndex: (index: number): number => {
            const result = Math.floor(index * 0.5);
            return result;
        },

        getLeftIndex: (index: number): number => {
            const result = index * 2;
            return result;
        },

        getRightIndex: (index: number): number => {
            const result = index * 2 + 1;
            return result;
        },
    };
};

export type TreeArray<T> = ReturnType<typeof createTreeArray<T>>;
