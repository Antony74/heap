// A simple concrete implementation of a max heap of numbers, all in one file.

const predFn = (a: number | null, b: number | null): number => {
        if (a === null) {
            return 1;
        } else if (b === null) {
            return -1;
        } else {
            return a - b;
        }
    };

type PredFnWithNull = typeof predFn;

const createTreeArray = () => {
    const arr: (number | null)[] = [null];

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

type TreeArray = ReturnType<typeof createTreeArray>;

const createUpIterator = (treeArray: TreeArray, index: number) => {
    return {
        getArray: () => treeArray.getArray(),
        getIndex: () => index,
        getValue: () => treeArray.getArray()[index],
        setValue: (value: number | null) => {
            treeArray.getArray()[index] = value;
        },
        next: () => {
            index = treeArray.getParentIndex(index);
            return treeArray.inRange(index);
        },
    };
};

type ListIterator = ReturnType<typeof createUpIterator>;

const createDownIterator = <T>(
    treeArray: TreeArray,
    index: number,
    predFn: PredFnWithNull
): ListIterator => {
    return {
        getArray: () => treeArray.getArray(),
        getIndex: () => index,
        getValue: () => treeArray.getArray()[index],
        setValue: (value: number | null) => {
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

const createSwapIterator = (iterator: ListIterator) => {
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

type SwapIterator = ReturnType<typeof createSwapIterator>;
    
const bubble = (iterator: SwapIterator, predFn: PredFnWithNull) => {
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

export const createHeap = () => {
    const treeArray = createTreeArray();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: number) => {
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

            bubble(
                createSwapIterator(createUpIterator(treeArray, index)),
                predFn
            );

            ++length;
        },

        take: (): number | null => {
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
