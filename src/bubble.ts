import { SwapIterator } from './iterators';
import { PredFnWithNull } from './predFn';

export const bubble = (iterator: SwapIterator, predFn: PredFnWithNull) => {
    if (iterator === null) {
        return;
    }

    const prevValue = iterator.getValue();
    const next = iterator.next();

    if (next === false) {
        return;
    }

    const value = iterator.getValue();

    if (predFn(prevValue, value) >= 0) {
        return;
    }

    iterator.swap();

    bubble(iterator, predFn);
};
