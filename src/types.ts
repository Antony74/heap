export type TreeItem = {
    getValue: () => number | null;
    setValue: (value: number | null) => void;
    up: () => TreeItem | null;
    left: () => TreeItem | null;
    right: () => TreeItem | null;
};

export type ListItem = {
    getValue: () => number | null;
    setValue: (value: number | null) => void;
    getNext: () => ListItem | null;
};

export type PredicateFunction = (a: number | null, b: number | null) => boolean;
