import { bubble } from './bubble';
import { createTreeArray } from './treeArray';
import { ListItem, PredicateFunction, TreeItem } from './types';

const wrapTreeItemUp = (treeItem: TreeItem | null): ListItem | null => {
    if (treeItem === null) {
        return null;
    }

    return {
        ...treeItem,
        getNext() {
            return wrapTreeItemUp(treeItem.up());
        },
    };
};

const predFn: PredicateFunction = (a, b) => {
    if (a === null) {
        return false;
    } else if (b === null) {
        return true;
    } else {
        return a < b;
    }
}

const wrapTreeItemDown = (treeItem: TreeItem | null): ListItem | null => {
    if (treeItem === null) {
        return null;
    }

    return {
        ...treeItem,
        getNext() {
            const left = treeItem.left();
            const right = treeItem.right();

            if (left === null && right === null) {
                return null;
            }

            if (left === null) {
                return wrapTreeItemDown(right);
            } else if (right === null) {
                return wrapTreeItemDown(left);
            }

            const leftValue = left.getValue();
            const rightValue = right.getValue();

            const child = predFn(leftValue, rightValue) ? left : right; 

            return wrapTreeItemDown(child);
        },
    };
};

export const createHeap = () => {
    const treeArray = createTreeArray();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: number) => {
            let item = treeArray.createNext();
            item.setValue(value);

            bubble(wrapTreeItemUp(item), predFn);

            ++length;
        },

        take: (): number | null => {
            let item = treeArray.getRoot();
            if (item === null) {
                return null;
            }
            const result = item.getValue();
            item.setValue(null);

            bubble(wrapTreeItemDown(item), (a, b) => !predFn(a, b));

            --length;

            return result;
        },
    };
    return heap;
};
