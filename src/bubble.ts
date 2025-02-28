import { SwapIterator } from './iterators';
import { PredicateFunction } from './predFn';

export const bubble = (iterator: SwapIterator, predFn: PredicateFunction) => {
    if (iterator === null) {
        return;
    }

    const prevValue = iterator.getValue();
    const next = iterator.next();

    if (next === false) {
        return;
    }

    const value = iterator.getValue();

    if (!predFn(prevValue, value)) {
        return;
    }

    iterator.swap();

    bubble(iterator, predFn);
};
