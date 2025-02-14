import { describe } from '@jest/globals';

describe('Case 1', () => {
    const result = findKthLargest([3,2,1,5,6,4], 2);
    expect(result).toEqual(5);
});
