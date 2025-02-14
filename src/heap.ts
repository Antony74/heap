const createHeap = () => {
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
                const swapped = swap(item, parent);

                if (!swapped) {
                    break;
                }

                item = parent;
            }

            ++length;
            treeArray.print();
        },

        pop: (): number | undefined => {
            console.log('popping');
            let item = treeArray.getRoot();
            if (item === null) {
                console.log('pop empty/null');
                return undefined;
            }
            const result = item.getValue();
            item.setValue(null);

            while (true) {
                const left = item.left();
                const right = item.right();
                const leftIsNull = left === null || left.getValue() === null;
                let child: TreeItem | null = null;
                if (leftIsNull || (left.getValue() > right.getValue())) {
                    child = right;
                } else {
                    child = left;
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
}
