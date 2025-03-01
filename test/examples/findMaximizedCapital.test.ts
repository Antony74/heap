import { findMaximizedCapital } from '../../src/examples/findMaximizedCapital';

describe('findKthLargest', () => {
    test('Case 1', () => {
        const result = findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]);
        expect(result).toEqual(4);
    });
});
