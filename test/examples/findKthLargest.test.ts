import { findKthLargest } from '../../src/examples/findKthLargest';

describe('findKthLargest', () => {
    test('Case 1', () => {
        const result = findKthLargest([3, 2, 1, 5, 6, 4], 2);
        expect(result).toEqual(5);
    });
});
