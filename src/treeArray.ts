export type TreeArray = {
    getValue: (index: number) => number | null;
    setValue: (index: number, value: number | null) => void;
    push: (value: number | null) => void;
    size: () => number;
    inRange: (index: number) => boolean;
    getParentIndex: (index: number) => number;
    getLeftIndex: (index: number) => number;
    getRightIndex: (index: number) => number;
};

export const createTreeArray = (): TreeArray => {
    const arr: (number | null)[] = [null];

    return {
        getValue: (index: number) => arr[index],

        setValue: (index: number, value: number | null) => {
            arr[index] = value;
        },

        push: (value: number | null) => arr.push(value),

        size: () => arr.length,

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
