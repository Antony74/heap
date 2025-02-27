import { PrevIterator } from './iterators';
import { predFn, PredicateFunction } from './predFn';

export const bubble = (iterator: PrevIterator, predFn: PredicateFunction) => {
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

    iterator.setValue(prevValue);
    iterator.setPrevValue(value);

    bubble(iterator, predFn);
};
