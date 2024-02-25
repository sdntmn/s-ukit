export declare const byKey: (key: string, isNumber: boolean | undefined) => (a: {
    [x: string]: {
        toLowerCase: () => number;
    };
}, b: {
    [x: string]: {
        toLowerCase: () => number;
    };
}) => number;
export declare const byKey2: (key: string) => (a: {
    [x: string]: number;
}, b: {
    [x: string]: number;
}) => number;
