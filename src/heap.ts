import { swap } from './swap';
import { createTreeArray, TreeItem } from './treeArray';

export const createHeap = () => {
    const treeArray = createTreeArray();
    let length = 0;

    const heap = {
        size: () => length,

        push: (value: number) => {
            console.log(`push ${value}`);
            let item = treeArray.createNext();
            item.setValue(value);

            while (true) {
                const parent = item.up();

                if (parent === null) {
                    break;
                }

                const swapped = swap(item, parent);

                if (!swapped) {
                    break;
                }

                item = parent;
            }

            ++length;
            treeArray.print();
        },

        pop: (): number | null | undefined => {
            console.log('popping');
            let item = treeArray.getRoot();
            if (item === null) {
                console.log('pop empty/null');
                return undefined;
            }
            const result = item.getValue();
            item.setValue(null);

            while (true) {
                const leftValue = item.left().getValue();
                const rightValue = item.right().getValue();

                let child: TreeItem | null = null;
                if (leftValue === null) {
                    child = item.right();
                } else if (rightValue === null) {
                    child = item.left();
                } else if (leftValue > rightValue) {
                    child = item.right();
                } else {
                    child = item.left();
                }

                const swapped = swap(child, item);

                if (!swapped) {
                    break;
                }
            }

            --length;

            console.log(`pop ${result}`);
            treeArray.print();
            return result;
        },
    };
    return heap;
};
