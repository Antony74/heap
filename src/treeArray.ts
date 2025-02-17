import { TreeItem } from "./types";

export const createTreeArray = () => {
    const arr: (number | null)[] = [null];

    const getParentIndex = (index: number): number => {
        const result = Math.floor(index * 0.5);
        return result;
    };

    const getLeftIndex = (index: number): number => {
        const result = index * 2;
        return result;
    };

    const getRightIndex = (index: number): number => {
        const result = index * 2 + 1;
        return result;
    };

    const getItem = (index: number): TreeItem | null => {
        if (index < 1 || index >= arr.length) {
            return null;
        }

        return {
            getValue: () => arr[index],
            setValue: (value: number | null) => {
                arr[index] = value;
            },
            up: () => getItem(getParentIndex(index)),
            left: () => getItem(getLeftIndex(index)),
            right: () => getItem(getRightIndex(index)),
        };
    };

    const treeArray = {
        createNext: (): TreeItem => {
            const index = arr.length;
            const parent = getItem(getParentIndex(index));
            if (parent !== null && parent.getValue() === null) {
                return parent;
            } else {
                arr.push(null);
                return getItem(index)!;
            }
        },
        getRoot: (): TreeItem | null => {
            return getItem(1);
        },
    };

    return treeArray;
};
