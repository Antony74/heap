import { predFn } from './predFn';
import { TreeArray } from './treeArray';

export type ListIterator = {
    getTreeArray: () => TreeArray,
    getIndex: () => number;
    getValue: () => number | null;
    setValue: (value: number | null) => void;
    next: () => boolean;
};

export type PrevIterator = ListIterator & {
    getPrevValue: () => number | null;
    setPrevValue: (value: number | null) => void;
};

export const createUpIterator = (
    treeArray: TreeArray,
    index: number
): ListIterator => {
    return {
        getTreeArray: () => treeArray,
        getIndex: () => index,
        getValue: () => treeArray.getValue(index),
        setValue: (value) => {
            treeArray.setValue(index, value);
        },
        next: () => {
            index = treeArray.getParentIndex(index);
            return treeArray.inRange(index);
        },
    };
};

export const createDownIterator = (
    treeArray: TreeArray,
    index: number
): ListIterator => {
    return {
        getTreeArray: () => treeArray,
        getIndex: () => index,
        getValue: () => treeArray.getValue(index),
        setValue: (value) => {
            treeArray.setValue(index, value);
        },
        next: () => {
            const left = treeArray.getLeftIndex(index);
            const right = treeArray.getRightIndex(index);
            if (!treeArray.inRange(left) && !treeArray.inRange(right)) {
                return false;
            } else if (!treeArray.inRange(right)) {
                index = left;
            } else {
                const leftValue = treeArray.getValue(left);
                const rightValue = treeArray.getValue(right);
                if (predFn(leftValue, rightValue)) {
                    index = left;
                } else {
                    index = right;
                }
            }
            return treeArray.inRange(index);
        },
    };
};

export const createPrevIterator = (iterator: ListIterator): PrevIterator => {
    let prev = 0;
    return {
        ...iterator,
        next: () => {
            prev = iterator.getIndex();
            return iterator.next();
        },
        getPrevValue: () => iterator.getTreeArray().getValue(prev),
        setPrevValue: (value: number | null) => {
            iterator.getTreeArray().setValue(prev, value);
        },
    };
};
