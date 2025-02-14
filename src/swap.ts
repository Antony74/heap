import { TreeItem } from './treeArray';

export const swap = (
    child: TreeItem | null,
    parent: TreeItem | null
): boolean => {
    console.log(
        `swapping`,
        child && child.getValue(),
        parent && parent.getValue()
    );

    if (child === null || parent === null) {
        console.log('not swapping due to null');
        return false;
    }

    const childValue = child.getValue();
    const parentValue = parent.getValue();

    let result = false;
    if (parentValue === null && childValue === null) {
        // null no action needed
    } else if (parentValue === null) {
        result = true;
    } else if (childValue === null) {
        // result already null no action needed
    } else if (child.getValue()! < parent.getValue()!) {
        result = true;
    }

    if (result) {
        console.log('swapping');
        const childValue = child.getValue();
        const parentValue = parent.getValue();
        child.setValue(parentValue);
        parent.setValue(childValue);
    } else {
        console.log('not swapping');
    }

    return result;
};
