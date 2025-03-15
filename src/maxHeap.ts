// A simple concrete implementation of a max heap of numbers, all in one file.

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
    
export const bubble = <T>(iterator: SwapIterator<T>, predFn: PredFnWithNull<T>) => {
    if (iterator === null) {
        return;
    }

    const prevValue = iterator.getValue();
    const next = iterator.next();

    if (next === false) {
        return;
    }

    const value = iterator.getValue();

    if (predFn(prevValue, value) >= 0) {
        return;
    }

    iterator.swap();

    bubble(iterator, predFn);
};

export const createHeap = <T>(predFn: PredFnWithNull<T>) => {
    const treeArray = createTreeArray<T>();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: T) => {
            const arr = treeArray.getArray();
            let index = arr.length;
            const parentIndex = treeArray.getParentIndex(index);

            if (
                treeArray.inRange(parentIndex) &&
                arr[parentIndex] === null
            ) {
                index = parentIndex;
                arr[parentIndex] = value;
            } else {
                arr.push(value);
            }

            bubble<T>(
                createSwapIterator<T>(createUpIterator<T>(treeArray, index)),
                predFn
            );

            ++length;
        },

        take: (): T | null => {
            const arr = treeArray.getArray();
            const result = arr[1];
            if (result === null) {
                return null;
            }
            arr[1] = null;

            bubble(
                createSwapIterator(createDownIterator(treeArray, 1, predFn)),
                (a, b) => -predFn(a, b)
            );

            --length;

            return result;
        },
    };
    return heap;
};
