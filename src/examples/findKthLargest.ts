import { createHeap } from '../minHeap';

export const findKthLargest = (nums: number[], k: number): number => {
    const heap = createHeap();
    for (const num of nums) {
        heap.push(num);
        if (heap.size() > k) {
            heap.take();
        }
    }
    return heap.take()!;
};
