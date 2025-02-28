import { createHeap } from '../heap';
import { createPredFnWithNull } from '../predFn';

export const findKthLargest = (nums: number[], k: number): number => {
    const heap = createHeap(createPredFnWithNull<number>((a, b) => a - b));
    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) {
            heap.take();
        }
    }
    return heap.take()!;
};
