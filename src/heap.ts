import { bubble } from './bubble';
import {
    createDownIterator,
    createPrevIterator,
    createUpIterator,
} from './iterators';
import { predFn } from './predFn';
import { createTreeArray } from './treeArray';

export const createHeap = () => {
    const treeArray = createTreeArray();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: number) => {
            let index = treeArray.size();
            const parentIndex = treeArray.getParentIndex(index);

            if (
                treeArray.inRange(parentIndex) &&
                treeArray.getValue(parentIndex) === null
            ) {
                index = parentIndex;
                treeArray.setValue(parentIndex, value);
            } else {
                treeArray.push(value);
            }

            bubble(
                createPrevIterator(createUpIterator(treeArray, index)),
                predFn
            );

            ++length;
        },

        take: (): number | null => {
            const result = treeArray.getValue(1);
            if (result === null) {
                return null;
            }
            treeArray.setValue(1, null);

            bubble(
                createPrevIterator(createDownIterator(treeArray, 1)),
                (a, b) => !predFn(a, b)
            );

            --length;

            return result;
        },
    };
    return heap;
};
