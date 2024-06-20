import {
    Any_id,
    List_init,
    List_mapi,
    List_match,
    Nat_suc,
    Nat_zero,
    Optional_match,
} from "../backend/lambda-calculus.js";

// deno-lint-ignore no-explicit-any -- allowed for test
export const toNumber = (n: any) => {
    return n((x: number) => x + 1)(0);
};

export const toNat = (n: number) => {
    let ret = Nat_zero;
    while (n > 0) {
        ret = Nat_suc(ret);
        n--;
    }

    return ret;
};

// deno-lint-ignore no-explicit-any -- allowed for test
export const toBoolean = (b: any) => {
    return b(true)(false);
};

export const toNullableNumber = (optional: unknown) => {
    return Optional_match(toNumber)(() => null)(optional);
};

export const toNumberArray = (list: unknown): number[] => {
    const ret: number[] = [];
    while (true) {
        let cont: boolean = false;

        const ifCons = (x: unknown) => (xs: unknown) => {
            ret.push(toNumber(x));
            list = xs;
            cont = true;
        };

        const ifEnd = Any_id;

        List_match(ifCons)(ifEnd)(list);

        if (!cont) {
            break;
        }
    }

    return ret;
};

export const listFromNumberArray = (arr: number[]): unknown => {
    const len = toNat(arr.length);
    const list = List_init(len)(Any_id);
    const fromArray = (_: unknown) => (i: unknown) => {
        const numIndex = toNumber(i);
        const num = arr[numIndex];
        return toNat(num);
    };

    return List_mapi(fromArray)(list);
};

export const toNumberArray2D = (list2d: unknown): number[][] => {
    const ret: number[][] = [];
    while (true) {
        let cont: boolean = false;

        const ifCons = (x: unknown) => (xs: unknown) => {
            ret.push(toNumberArray(x));
            list2d = xs;
            cont = true;
        };

        const ifEnd = Any_id;

        List_match(ifCons)(ifEnd)(list2d);

        if (!cont) {
            break;
        }
    }

    return ret;
};

export const matrixFromNumber2DArray = (arr: number[][]): unknown => {
    const len = toNat(arr.length);
    const list = List_init(len)(Any_id);
    const fromArray = (_: unknown) => (i: unknown) => {
        const numIndex = toNumber(i);
        const num = arr[numIndex];
        return listFromNumberArray(num);
    };

    return List_mapi(fromArray)(list);
};
