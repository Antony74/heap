import { PredFnWithNull } from './predFn';
import { TreeArray } from './treeArray';

export const createUpIterator = <T>(treeArray: TreeArray<T>, index: number) => {
    return {
        getArray: () => treeArray.getArray(),
        getIndex: () => index,
        getValue: () => treeArray.getArray()[index],
        setValue: (value: T | null) => {
            treeArray.getArray()[index] = value;
        },
        next: () => {
            index = treeArray.getParentIndex(index);
            return treeArray.inRange(index);
        },
    };
};

type ListIterator<T> = ReturnType<typeof createUpIterator<T>>;

export const createDownIterator = <T>(
    treeArray: TreeArray<T>,
    index: number,
    predFn: PredFnWithNull<T>
): ListIterator<T> => {
    return {
        getArray: () => treeArray.getArray(),
        getIndex: () => index,
        getValue: () => treeArray.getArray()[index],
        setValue: (value: T | null) => {
            treeArray.getArray()[index] = value;
        },
        next: () => {
            const left = treeArray.getLeftIndex(index);
            const right = treeArray.getRightIndex(index);
            if (!treeArray.inRange(left) && !treeArray.inRange(right)) {
                return false;
            } else if (!treeArray.inRange(right)) {
                index = left;
            } else {
                const leftValue = treeArray.getArray()[left];
                const rightValue = treeArray.getArray()[right];
                if (predFn(leftValue, rightValue) < 0) {
                    index = left;
                } else {
                    index = right;
                }
            }
            return treeArray.inRange(index);
        },
    };
};

export const createSwapIterator = <T>(iterator: ListIterator<T>) => {
    let prev = 0;
    return {
        ...iterator,
        next: () => {
            prev = iterator.getIndex();
            return iterator.next();
        },
        swap: () => {
            const arr = iterator.getArray();
            const value = iterator.getValue();
            iterator.setValue(arr[prev]);
            arr[prev] = value;
        },
    };
};

export type SwapIterator<T> = ReturnType<typeof createSwapIterator<T>>;
    