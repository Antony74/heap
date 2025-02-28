import { bubble } from './bubble';
import {
    createDownIterator,
    createSwapIterator,
    createUpIterator,
} from './iterators';
import { PredFnWithNull } from './predFn';
import { createTreeArray } from './treeArray';

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
