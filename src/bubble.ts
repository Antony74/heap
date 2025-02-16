import { ListItem, PredicateFunction } from "./types";

export const bubble = (item: ListItem | null, predFn: PredicateFunction) => {
    if (item === null) {
        return;
    }

    const next = item.getNext();

    if (next === null) {
        return;
    }

    const value = item.getValue();
    const nextValue = next.getValue();

    if (!predFn(value, nextValue)) {
        return;
    }

    next.setValue(value);
    item.setValue(nextValue);

    bubble(next, predFn);
}

