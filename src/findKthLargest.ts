import { createHeap } from './heap';

const createMockHeap = () => {
    const arr: number[] = [];

    return {
        push: (value: number) => {
            arr.push(value);
            arr.sort();
        },
        pop: () => arr.shift(),
        size: () => arr.length
    };
};

export const findKthLargest = (nums: number[], k: number): number => {
    const heap = createMockHeap();
    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) {
            heap.pop();
        }
    }
    return heap.pop()!;
};
