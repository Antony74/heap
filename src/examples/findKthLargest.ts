import { createHeap } from '../heap';
import { predFn } from '../predFn';

export const findKthLargest = (nums: number[], k: number): number => {
    const heap = createHeap(predFn);
    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) {
            heap.take();
        }
    }
    return heap.take()!;
};
