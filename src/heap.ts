import { bubble } from './bubble';
import {
    createDownIterator,
    createSwapIterator,
    createUpIterator,
} from './iterators';
import { PredFnWithNull } from './predFn';
import { createTreeArray } from './treeArray';

export const createHeap = (predFn: PredFnWithNull) => {
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
