// A simple concrete implementation of a min heap of numbers, all in one file.

const isLessThan = (a: number | null, b: number | null): boolean => {
    if (a === null) {
        return false;
    } else if (b === null) {
        return true;
    } else {
        return a < b;
    }
};

const createTreeArray = () => {
    const arr: (number | null)[] = [null];

    const treeArr = {
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

        swap: (index: number): boolean => {
            const value = arr[index];
            const parentIndex = treeArr.getParentIndex(index);
            const parentValue = arr[parentIndex];

            if (isLessThan(value, parentValue)) {
                arr[index] = arr[parentIndex];
                arr[parentIndex] = value;
                return true;
            } else {
                return false;
            }
        },
    };

    return treeArr;
};

type TreeArray = ReturnType<typeof createTreeArray>;

const createUpIterator = (treeArray: TreeArray, index: number) => {
    let prev = 0;

    return {
        next: () => {
            prev = index;
            index = treeArray.getParentIndex(index);
            return treeArray.inRange(index);
        },
        swap: (): boolean => {
            return treeArray.swap(prev);
        },
    };
};

type ListIterator = ReturnType<typeof createUpIterator>;

const createDownIterator = <T>(
    treeArray: TreeArray,
    index: number
): ListIterator => {
    return {
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
                if (isLessThan(leftValue, rightValue)) {
                    index = left;
                } else {
                    index = right;
                }
            }
            return treeArray.inRange(index);
        },
        swap: (): boolean => {
            return treeArray.swap(index);
        },
    };
};

const bubble = (iterator: ListIterator) => {
    while (iterator.next() && iterator.swap()) {}
};

export const createHeap = () => {
    const treeArray = createTreeArray();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: number) => {
            const arr = treeArray.getArray();
            let index = arr.length;
            // const parentIndex = treeArray.getParentIndex(index);

            // if (treeArray.inRange(parentIndex) && arr[parentIndex] === null) {
            //     index = parentIndex;
            //     arr[parentIndex] = value;
            // } else {
                arr.push(value);
            // }

            bubble(createUpIterator(treeArray, index));

            ++length;
        },

        take: (): number | null => {
            const arr = treeArray.getArray();
            const result = arr[1];
            arr[1] = null;

            bubble(createDownIterator(treeArray, 1));

            --length;

            return result;
        },
    };
    return heap;
};
