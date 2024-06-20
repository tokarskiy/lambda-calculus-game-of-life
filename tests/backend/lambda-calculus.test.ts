import {
    Any_id,
    Bool_and,
    Bool_false,
    Bool_ifThenElse,
    Bool_not,
    Bool_or,
    Bool_true,
    Fun2_flip,
    GameOfLife_nextGeneration,
    List_concat,
    List_cons,
    List_count,
    List_end,
    List_filter,
    List_flatMap,
    List_fold,
    List_index,
    List_init,
    List_map,
    List_mapi,
    List_natRange,
    List_reverse,
    Matrix2D_height,
    Matrix2D_index,
    Matrix2D_init,
    Matrix2D_map,
    Matrix2D_mapij,
    Matrix2D_width,
    Nat_add,
    Nat_areEqual,
    Nat_factorial,
    Nat_fibonacci,
    Nat_five,
    Nat_four,
    Nat_isGreater,
    Nat_isGreaterOrEqual,
    Nat_isLess,
    Nat_isLessOrEqual,
    Nat_isZero,
    Nat_mod,
    Nat_mul,
    Nat_one,
    Nat_pow,
    Nat_predOrZero,
    Nat_six,
    Nat_subOrZero,
    Nat_suc,
    Nat_three,
    Nat_two,
    Nat_zero,
    Optional_flatMap,
    Optional_isNone,
    Optional_isSome,
    Optional_map,
    Optional_none,
    Optional_some,
    Pair_fst,
    Pair_mk,
    Pair_snd,
} from "../../src/backend/lambda-calculus.js";
import { assertEquals } from "jsr:@std/assert/assert-equals";
import {
    matrixFromNumber2DArray,
    toBoolean,
    toNullableNumber,
    toNumber,
    toNumberArray,
    toNumberArray2D,
} from "../../src/frontend/lambda-calculus.frontend.ts";

export const assertNumbersEqual = (actual: unknown, expected: number) => {
    assertEquals(toNumber(actual), expected);
};

export const assertBooleansEqual = (actual: unknown, expected: boolean) => {
    assertEquals(toBoolean(actual), expected);
};

export const assertNullableNumberEqual = (
    actual: unknown,
    expected: number | null,
) => {
    assertEquals(toNullableNumber(actual), expected);
};

export const assertNumberListEqual = (actual: unknown, expected: number[]) => {
    assertEquals(toNumberArray(actual), expected);
};

export const assertNumberList2DEqual = (
    actual: unknown,
    expected: number[][],
) => {
    assertEquals(toNumberArray2D(actual), expected);
};

Deno.test("Basic arithmetic operations are correct", () => {
    assertNumbersEqual(Nat_zero, 0);
    assertNumbersEqual(Nat_one, 1);
    assertNumbersEqual(Nat_two, 2);
    assertNumbersEqual(Nat_suc(Nat_two), 3);
    assertNumbersEqual(Nat_suc(Nat_suc(Nat_suc(Nat_two))), 5);
    assertNumbersEqual(Nat_add(Nat_two)(Nat_one), 3);
    assertNumbersEqual(Nat_mul(Nat_two)(Nat_three), 6);
    assertNumbersEqual(Nat_predOrZero(Nat_three), 2);
    assertNumbersEqual(Nat_subOrZero(Nat_three)(Nat_two), 1);
    assertNumbersEqual(Nat_pow(Nat_two)(Nat_zero), 1);
    assertNumbersEqual(Nat_pow(Nat_two)(Nat_one), 2);
    assertNumbersEqual(Nat_pow(Nat_two)(Nat_two), 4);
    assertNumbersEqual(Nat_pow(Nat_two)(Nat_three), 8);
    assertNumbersEqual(Nat_pow(Nat_two)(Nat_four), 16);
    assertNumbersEqual(Nat_mod(Nat_five)(Nat_two), 1);
    assertNumbersEqual(Nat_mod(Nat_six)(Nat_two), 0);
    assertNumbersEqual(Nat_mod(Nat_five)(Nat_three), 2);
});

Deno.test("Basic logical operations are correct", () => {
    assertBooleansEqual(Bool_not(Bool_true), false);
    assertBooleansEqual(Bool_not(Bool_false), true);

    assertBooleansEqual(Bool_and(Bool_false)(Bool_false), false);
    assertBooleansEqual(Bool_and(Bool_true)(Bool_false), false);
    assertBooleansEqual(Bool_and(Bool_false)(Bool_true), false);
    assertBooleansEqual(Bool_and(Bool_true)(Bool_true), true);

    assertBooleansEqual(Bool_or(Bool_false)(Bool_false), false);
    assertBooleansEqual(Bool_or(Bool_true)(Bool_false), true);
    assertBooleansEqual(Bool_or(Bool_false)(Bool_true), true);
    assertBooleansEqual(Bool_or(Bool_true)(Bool_true), true);

    assertNumbersEqual(Bool_ifThenElse(Bool_true)(Nat_one)(Nat_two), 1);
    assertNumbersEqual(Bool_ifThenElse(Bool_false)(Nat_one)(Nat_two), 2);
});

Deno.test("Numbers comparison operations are correct", () => {
    assertBooleansEqual(Nat_isZero(Nat_one), false);
    assertBooleansEqual(Nat_isZero(Nat_two), false);
    assertBooleansEqual(Nat_isZero(Nat_three), false);
    assertBooleansEqual(Nat_isZero(Nat_zero), true);
    assertBooleansEqual(Nat_isZero(Nat_predOrZero(Nat_one)), true);

    assertBooleansEqual(Nat_isGreater(Nat_three)(Nat_two), true);
    assertBooleansEqual(Nat_isLess(Nat_three)(Nat_two), false);
    assertBooleansEqual(Nat_isGreaterOrEqual(Nat_three)(Nat_two), true);
    assertBooleansEqual(Nat_isLessOrEqual(Nat_three)(Nat_two), false);

    assertBooleansEqual(Nat_isGreater(Nat_three)(Nat_three), false);
    assertBooleansEqual(Nat_isLess(Nat_three)(Nat_three), false);
    assertBooleansEqual(Nat_isGreaterOrEqual(Nat_three)(Nat_three), true);
    assertBooleansEqual(Nat_isLessOrEqual(Nat_three)(Nat_three), true);

    assertBooleansEqual(Nat_areEqual(Nat_zero)(Nat_zero), true);
    assertBooleansEqual(Nat_areEqual(Nat_zero)(Nat_one), false);
    assertBooleansEqual(Nat_areEqual(Nat_one)(Nat_zero), false);
    assertBooleansEqual(Nat_areEqual(Nat_five)(Nat_four), false);
    assertBooleansEqual(Nat_areEqual(Nat_three)(Nat_three), true);
});

Deno.test("Pair tuple data type is implemented corectly", () => {
    assertNumbersEqual(Pair_fst(Pair_mk(Nat_two)(Nat_three)), 2);
    assertNumbersEqual(Pair_snd(Pair_mk(Nat_two)(Nat_three)), 3);
});

Deno.test("Factorial works correctly", () => {
    assertNumbersEqual(Nat_factorial(Nat_zero), 1);
    assertNumbersEqual(Nat_factorial(Nat_two), 2);
    assertNumbersEqual(Nat_factorial(Nat_three), 6);
    assertNumbersEqual(Nat_factorial(Nat_four), 24);
    assertNumbersEqual(Nat_factorial(Nat_five), 120);
});

Deno.test("Fibonacci works correctly", () => {
    assertNumbersEqual(Nat_fibonacci(Nat_zero), 0);
    assertNumbersEqual(Nat_fibonacci(Nat_one), 1);
    assertNumbersEqual(Nat_fibonacci(Nat_two), 1);
    assertNumbersEqual(Nat_fibonacci(Nat_three), 2);
    assertNumbersEqual(Nat_fibonacci(Nat_four), 3);
    assertNumbersEqual(Nat_fibonacci(Nat_five), 5);
    assertNumbersEqual(Nat_fibonacci(Nat_six), 8);
});

Deno.test("Optional type works correctly", () => {
    const x1 = Optional_some(Nat_five);
    assertNumbersEqual(Pair_fst(x1), 1);
    assertNumbersEqual(Pair_snd(x1), 5);
    assertNullableNumberEqual(x1, 5);
    assertBooleansEqual(Optional_isSome(x1), true);
    assertBooleansEqual(Optional_isNone(x1), false);

    const x2 = Optional_none;
    assertNumbersEqual(Pair_fst(x2), 0);
    assertBooleansEqual(Optional_isSome(x2), false);
    assertBooleansEqual(Optional_isNone(x2), true);

    const x3 = Optional_map(Nat_suc)(x1);
    assertNumbersEqual(Pair_fst(x3), 1);
    assertNumbersEqual(Pair_snd(x3), 6);
    assertNullableNumberEqual(x3, 6);
    assertBooleansEqual(Optional_isSome(x3), true);
    assertBooleansEqual(Optional_isNone(x3), false);

    const x4 = Optional_flatMap((x: unknown) => Optional_some(Nat_suc(x)))(x3);
    assertNumbersEqual(Pair_fst(x4), 1);
    assertNumbersEqual(Pair_snd(x4), 7);
    assertNullableNumberEqual(x4, 7);
    assertBooleansEqual(Optional_isSome(x4), true);
    assertBooleansEqual(Optional_isNone(x4), false);

    const x5 = Optional_flatMap((_x: unknown) => Optional_none)(x4);
    assertNumbersEqual(Pair_fst(x5), 0);
    assertBooleansEqual(Optional_isSome(x5), false);
    assertBooleansEqual(Optional_isNone(x5), true);

    const x6 = Optional_map(Nat_suc)(x5);
    assertNumbersEqual(Pair_fst(x6), 0);
    assertBooleansEqual(Optional_isSome(x6), false);
    assertBooleansEqual(Optional_isNone(x6), true);

    const x7 = Optional_flatMap((x: unknown) => Optional_some(Nat_suc(x)))(x6);
    assertNumbersEqual(Pair_fst(x7), 0);
    assertBooleansEqual(Optional_isSome(x7), false);
    assertBooleansEqual(Optional_isNone(x7), true);
});

Deno.test("Linked list works correctly", () => {
    const x1 = List_cons(Nat_zero)(
        List_cons(Nat_one)(
            List_cons(Nat_two)(
                List_cons(Nat_three)(
                    List_end,
                ),
            ),
        ),
    );

    assertNumberListEqual(x1, [0, 1, 2, 3]);
    assertNumbersEqual(List_count(x1), 4);

    const x2 = List_map(Nat_suc)(x1);
    assertNumberListEqual(x2, [1, 2, 3, 4]);
    assertNumbersEqual(List_count(x2), 4);

    const x3 = List_concat(x1)(x2);
    assertNumberListEqual(x3, [0, 1, 2, 3, 1, 2, 3, 4]);
    assertNumbersEqual(List_count(x3), 8);

    const isEven = (x: unknown) => Nat_areEqual(Nat_mod(x)(Nat_two))(Nat_zero);
    const x4 = List_filter(isEven)(x3);
    assertNumberListEqual(x4, [0, 2, 2, 4]);
    assertNumbersEqual(List_count(x4), 4);

    const x5 = List_reverse(x4);
    assertNumberListEqual(x5, [4, 2, 2, 0]);
    assertNumbersEqual(List_count(x5), 4);

    const x6 = List_init(Nat_five)(Any_id);
    assertNumberListEqual(x6, [0, 1, 2, 3, 4]);
    assertNumbersEqual(List_count(x6), 5);

    const elemAndZero = (x: unknown) =>
        List_cons(x)(List_cons(Nat_zero)(List_end));
    const x7 = List_flatMap(elemAndZero)(x6);
    assertNumberListEqual(x7, [0, 0, 1, 0, 2, 0, 3, 0, 4, 0]);
    assertNumbersEqual(List_count(x7), 10);

    const x7Sum_init = Nat_zero;
    const x7Sum_step = (x: unknown) => (acc: unknown) => Nat_add(x)(acc);
    const x7Sum = List_fold(x7Sum_init)(x7Sum_step)(x7);
    assertNumbersEqual(x7Sum, 10);

    const x8 = List_init(Nat_five)((_: unknown) => Nat_zero);
    const x9 = List_mapi(Nat_add)(x8);
    assertNumberListEqual(x9, [0, 1, 2, 3, 4]);
    assertNumbersEqual(List_count(x9), 5);

    const x6_0 = List_index(Nat_zero)(x6);
    const x6_1 = List_index(Nat_one)(x6);
    const x6_2 = List_index(Nat_two)(x6);
    const x6_3 = List_index(Nat_three)(x6);
    const x6_4 = List_index(Nat_four)(x6);
    const x6_5 = List_index(Nat_five)(x6);
    const x6_6 = List_index(Nat_six)(x6);

    assertNullableNumberEqual(x6_0, 0);
    assertNullableNumberEqual(x6_1, 1);
    assertNullableNumberEqual(x6_2, 2);
    assertNullableNumberEqual(x6_3, 3);
    assertNullableNumberEqual(x6_4, 4);
    assertNullableNumberEqual(x6_5, null);
    assertNullableNumberEqual(x6_6, null);

    const x10 = List_natRange(Nat_three)(Nat_six);
    assertNumberListEqual(x10, [3, 4, 5, 6]);
});

Deno.test("Matrix work correctly", () => {
    const x1 = Matrix2D_init(Nat_three)(Nat_four)(Nat_mul);
    assertNumberList2DEqual(x1, [
        [0, 0, 0, 0],
        [0, 1, 2, 3],
        [0, 2, 4, 6],
    ]);

    const x2 = Matrix2D_map(Nat_suc)(x1);
    assertNumberList2DEqual(x2, [
        [1, 1, 1, 1],
        [1, 2, 3, 4],
        [1, 3, 5, 7],
    ]);

    const x1_0_0 = Matrix2D_index(Nat_zero)(Nat_zero)(x1);
    const x1_2_2 = Matrix2D_index(Nat_two)(Nat_two)(x1);
    const x1_1_6 = Matrix2D_index(Nat_one)(Nat_six)(x1);
    const x1_6_1 = Matrix2D_index(Nat_six)(Nat_one)(x1);
    const x1_2_3 = Matrix2D_index(Nat_two)(Nat_three)(x1);
    const x1_3_2 = Matrix2D_index(Nat_three)(Nat_two)(x1);

    const x3 = Matrix2D_map(Fun2_flip(Nat_pow)(Nat_two))(x2);
    assertNumberList2DEqual(x3, [
        [1, 1, 1, 1],
        [1, 4, 9, 16],
        [1, 9, 25, 49],
    ]);

    assertNullableNumberEqual(x1_0_0, 0);
    assertNullableNumberEqual(x1_2_2, 4);
    assertNullableNumberEqual(x1_2_3, 6);
    assertNullableNumberEqual(x1_3_2, null);
    assertNullableNumberEqual(x1_1_6, null);
    assertNullableNumberEqual(x1_6_1, null);

    const x4 = Matrix2D_init(Nat_three)(Nat_four)((_: unknown) => Nat_zero);
    const x5 = Matrix2D_mapij((_: unknown) => (i: unknown) => (j: unknown) =>
        Nat_add(i)(j)
    )(x4);

    assertNumberList2DEqual(x5, [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
    ]);

    assertNumbersEqual(Matrix2D_width(x5), 4);
    assertNumbersEqual(Matrix2D_height(x5), 3);
});

Deno.test("Game of life works correctly", () => {
    const glider1Matr = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ];

    const glider2Matr = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ];

    const glider3Matr = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0],
    ];

    const glider1 = matrixFromNumber2DArray(glider1Matr);
    assertNumberList2DEqual(glider1, glider1Matr);

    const glider2 = GameOfLife_nextGeneration(glider1);
    assertNumberList2DEqual(glider2, glider2Matr);

    const glider3 = GameOfLife_nextGeneration(glider2);
    assertNumberList2DEqual(glider3, glider3Matr);

    const blockMatr = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ];

    const block1 = matrixFromNumber2DArray(blockMatr);
    assertNumberList2DEqual(block1, blockMatr);

    const block2 = GameOfLife_nextGeneration(block1);
    assertNumberList2DEqual(block2, blockMatr);

    const blockMatr2 = [
        [1, 1],
        [1, 1],
    ];

    const block3 = matrixFromNumber2DArray(blockMatr2);
    assertNumberList2DEqual(block3, blockMatr2);

    const block4 = GameOfLife_nextGeneration(block3);
    assertNumberList2DEqual(block4, blockMatr2);
});
