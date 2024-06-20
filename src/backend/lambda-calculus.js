export const Any_id = (x) => x;
export const Fun2_flip = (f) => (x) => (y) => f(y)(x);

// Numeric (Nat type)

export const Nat_zero = (_) => (x) => x;
export const Nat_one = (f) => (x) => f(x);
export const Nat_two = (f) => (x) => f(f(x));
export const Nat_three = (f) => (x) => f(f(f(x)));
export const Nat_four = (f) => (x) => f(f(f(f(x))));
export const Nat_five = (f) => (x) => f(f(f(f(f(x)))));
export const Nat_six = (f) => (x) => f(f(f(f(f(f(x))))));

export const Nat_suc = (n) => {
    return (f) => (x) => f(n(f)(x));
};

export const Nat_add = (m) => (n) => {
    return (f) => (x) => m(f)(n(f)(x));
};

export const Nat_mul = (m) => (n) => {
    return (f) => m(n(f));
};

export const Nat_pow = (m) => (n) => {
    return n(Nat_mul(m))(Nat_one);
};

export const Nat_predOrZero = (n) => {
    return (f) => (x) => {
        const f1 = (g) => (h) => h(g(f));
        const x1 = (_) => x;

        return n(f1)(x1)(Any_id);
    };
};

export const Nat_subOrZero = (m) => (n) => {
    return n(Nat_predOrZero)(m);
};

// Boolean logic

export const Bool_true = (x) => (_) => x;
export const Bool_false = (_) => (y) => y;

export const Bool_and = (p) => (q) => {
    return p(q)(p);
};

export const Bool_or = (p) => (q) => {
    return p(p)(q);
};

export const Bool_ifThenElse = (p) => (a) => (b) => {
    return p(a)(b);
};

export const Bool_not = (p) => {
    return p(Bool_false)(Bool_true);
};

// Nat comparison

export const Nat_isZero = (n) => {
    return n((_) => Bool_false)(Bool_true);
};

export const Nat_isGreater = (m) => (n) => {
    return Bool_not(Nat_isZero(Nat_subOrZero(m)(n)));
};

export const Nat_isLess = (m) => (n) => {
    return Bool_not(Nat_isZero(Nat_subOrZero(n)(m)));
};

export const Nat_isGreaterOrEqual = (m) => (n) => {
    return Nat_isZero(Nat_subOrZero(n)(m));
};

export const Nat_isLessOrEqual = (m) => (n) => {
    return Nat_isZero(Nat_subOrZero(m)(n));
};

export const Nat_areEqual = (m) => (n) => {
    const subMFromNIsZero = Nat_isZero(Nat_subOrZero(m)(n));
    const subNFromMIsZero = Nat_isZero(Nat_subOrZero(n)(m));

    return Bool_and(subMFromNIsZero)(subNFromMIsZero);
};

// Tuples

export const Pair_mk = (x) => (y) => {
    return (f) => f(x)(y);
};

export const Pair_fst = (p) => p(Bool_true);
export const Pair_snd = (p) => p(Bool_false);

// Factorial

export const Nat_factorial = (n) => {
    const init = Pair_mk(Nat_zero)(Nat_one);
    const next = (p) => {
        const curr = Nat_suc(Pair_fst(p));
        const currFact = Nat_mul(curr)(Pair_snd(p));
        return Pair_mk(curr)(currFact);
    };

    return Pair_snd(n(next)(init));
};

// Fibonacci

export const Nat_fibonacci = (n) => {
    const init = Pair_mk(Nat_zero)(Pair_mk(Nat_one)(Nat_one));
    const next = (p) => {
        const second = Pair_fst(Pair_snd(p));
        const third = Pair_snd(Pair_snd(p));
        const fourth = Nat_add(second)(third);
        return Pair_mk(second)(Pair_mk(third)(fourth));
    };

    return Pair_fst(n(next)(init));
};

export const Nat_mod = (m) => (n) => {
    const modAcc = self => m => n => {
        const isLess = Nat_isLess(m)(n);
        const ifLess = _ => m;
        const ifElse = _ => self(self)(Nat_subOrZero(m)(n))(n);

        return Bool_ifThenElse(isLess)(ifLess)(ifElse)(Any_id);
    };

    return modAcc(modAcc)(m)(n);
};

// Optional

export const Optional_some = (n) => Pair_mk(Nat_one)(n);
export const Optional_none = Pair_mk(Nat_zero)(Any_id);

export const Optional_match = (ifSome) => (ifNone) => (optional) => {
    const condition = Nat_isZero(Pair_fst(optional));
    const someLam = (_) => ifSome(Pair_snd(optional));
    const noneLam = (x) => ifNone(x);

    return Bool_ifThenElse(condition)(noneLam)(someLam)(Any_id);
};

export const Optional_map = (selector) => {
    const ifSome = (x) => Optional_some(selector(x));
    const ifNone = (_) => Optional_none;

    return Optional_match(ifSome)(ifNone);
};

export const Optional_flatMap = (selector) => {
    const ifSome = selector;
    const ifNone = (_) => Optional_none;

    return Optional_match(ifSome)(ifNone);
};

export const Optional_isSome = (optional) =>
    Bool_not(Nat_isZero(Pair_fst(optional)));

export const Optional_isNone = (optional) => Nat_isZero(Pair_fst(optional));

// Linked lists

export const List_end = Optional_none;
export const List_cons = (x) => (xs) => Optional_some(Pair_mk(x)(xs));

export const List_match = (ifCons) => (ifEnd) => {
    const ifSome = (p) => ifCons(Pair_fst(p))(Pair_snd(p));
    const ifNone = ifEnd;

    return Optional_match(ifSome)(ifNone);
};

export const List_mapi = (selector) => {
    const mapiAcc = (self) => (i) => {
        const ifCons = (x) => (xs) => {
            const xMapped = selector(x)(i);
            const xsMapped = self(self)(Nat_suc(i))(xs);

            return List_cons(xMapped)(xsMapped);
        };

        const ifEnd = (_) => List_end;
        return List_match(ifCons)(ifEnd);
    };

    return mapiAcc(mapiAcc)(Nat_zero);
};

export const List_map = (selector) => {
    return List_mapi((x) => (_) => selector(x));
};

export const List_concat = (a) => (b) => {
    const concatAcc = (self) => (a) => (b) => {
        const ifCons = (x) => (xs) => List_cons(x)(self(self)(xs)(b));
        const ifEnd = (_) => b;

        return List_match(ifCons)(ifEnd)(a);
    };

    return concatAcc(concatAcc)(a)(b);
};

export const List_count = (list) => {
    const countAcc = (self) => (acc) => (list) => {
        const ifCons = (_) => (xs) => self(self)(Nat_suc(acc))(xs);
        const ifEnd = (_) => acc;

        return List_match(ifCons)(ifEnd)(list);
    };

    return countAcc(countAcc)(Nat_zero)(list);
};

export const List_filter = (predicate) => {
    const filterAcc = (self) => (predicate) => {
        const ifCons = (x) => (xs) => {
            const next = self(self)(predicate)(xs);
            const ifOk = (_) => List_cons(x)(next);
            const ifNot = (_) => next;

            return Bool_ifThenElse(predicate(x))(ifOk)(ifNot)(Any_id);
        };

        const ifEnd = (_) => List_end;
        return List_match(ifCons)(ifEnd);
    };

    return filterAcc(filterAcc)(predicate);
};

export const List_reverse = (list) => {
    const reverseAcc = (self) => (acc) => {
        const ifCons = (x) => (xs) => self(self)(List_cons(x)(acc))(xs);
        const ifEnd = (_) => acc;

        return List_match(ifCons)(ifEnd);
    };

    return reverseAcc(reverseAcc)(List_end)(list);
};

export const List_init = (size) => (elemctor) => {
    const init = Pair_mk(Nat_zero)(List_end);
    const next = (p) => {
        const iprev = Pair_fst(p);
        const lprev = Pair_snd(p);

        const inext = Nat_suc(iprev);
        const lnext = List_cons(elemctor(iprev))(lprev);

        return Pair_mk(inext)(lnext);
    };

    const reversedList = Pair_snd(size(next)(init));
    return List_reverse(reversedList);
};

export const List_flatMap = (selector) => {
    const flatMapAcc = self => selector => {
        const ifCons = (x) => (xs) => List_concat(selector(x))(self(self)(selector)(xs));
        const ifEnd = (_) => List_end;
    
        return List_match(ifCons)(ifEnd);
    };

    return flatMapAcc(flatMapAcc)(selector);
};

export const List_index = (i) => (list) => {
    const init = list;
    const next = List_match((_) => (xs) => xs)((_) => List_end);

    const currList = i(next)(init);
    const ifCons = (x) => (_) => Optional_some(x);
    const ifNone = (_) => Optional_none;

    return List_match(ifCons)(ifNone)(currList);
};

export const List_fold = (init) => (step) => {
    const foldAcc = self => init => step => {
        const ifCons = (x) => (xs) => {
            const initNext = step(x)(init);
            return self(self)(initNext)(step)(xs);
        };
    
        const ifEnd = (_) => init;
        return List_match(ifCons)(ifEnd);
    };

    return foldAcc(foldAcc)(init)(step);
};

export const List_natRange = (from) => (to) => {
    const baseNum = Nat_subOrZero(to)(from);
    const init = Pair_mk(from)(List_cons(from)(List_end));
    const next = (p) => {
        const currNum = Pair_fst(p);
        const currList = Pair_snd(p);

        const nextNum = Nat_suc(currNum);
        const nextList = List_cons(nextNum)(currList);

        return Pair_mk(nextNum)(nextList);
    };

    const reversedList = Pair_snd(baseNum(next)(init));
    return List_reverse(reversedList);
};

// List 2D

export const Matrix2D_init = (height) => (width) => (elemctor) => {
    const initRow = (i) => {
        const initCell = (j) => elemctor(i)(j);
        return List_init(width)(initCell);
    };

    return List_init(height)(initRow);
};

export const Matrix2D_mapij = (selector) => {
    return List_mapi((row) => (i) =>
        List_mapi((x) => (j) => selector(x)(i)(j))(row)
    );
};

export const Matrix2D_map = (selector) => {
    return List_map(List_map(selector));
};

export const Matrix2D_index = (i) => (j) => (matrix) => {
    const rowOpt = List_index(i)(matrix);
    const getCellFromRow = List_index(j);

    return Optional_flatMap(getCellFromRow)(rowOpt);
};

export const Matrix2D_height = List_count;
export const Matrix2D_width = (matrix) => {
    const rowOpt = List_index(Nat_zero)(matrix);
    const widthOpt = Optional_map(List_count)(rowOpt);
    return Optional_match(Any_id)((_) => Nat_zero)(widthOpt);
};

// Game of life

export const GameOfLife_initBoard = Matrix2D_init;
export const GameOfLife_nextGeneration = (matrix) => {
    const width = Matrix2D_width(matrix);
    const height = Matrix2D_height(matrix);

    const decij = (ij) => {
        const isZero = Nat_isZero(ij);
        const ifZero = (_) => Nat_zero;
        const ifNonZero = Nat_predOrZero;

        return Bool_ifThenElse(isZero)(ifZero)(ifNonZero)(ij);
    };

    const inci = (i) => {
        const iinc = Nat_suc(i);
        const isOut = Nat_isGreaterOrEqual(iinc)(height);
        return Bool_ifThenElse(isOut)(i)(iinc);
    };

    const incj = (j) => {
        const jinc = Nat_suc(j);
        const isOut = Nat_isGreaterOrEqual(jinc)(width);
        return Bool_ifThenElse(isOut)(j)(jinc);
    };

    const neightborsCount = (i) => (j) => {
        const ifrom = decij(i);
        const ito = inci(i);
        const jfrom = decij(j);
        const jto = incj(j);

        const checkCell = (xx) => (ii) => (jj) => {
            const isNotIj = Bool_not(Bool_and(Nat_areEqual(ii)(i))(Nat_areEqual(jj)(j)));
            const isBeforeMax = Bool_and(Nat_isLessOrEqual(ii)(ito))(Nat_isLessOrEqual(jj)(jto));
            const isAfterMin = Bool_and(Nat_isGreaterOrEqual(ii)(ifrom))(Nat_isGreaterOrEqual(jj)(jfrom));
            const returnCellValue = Bool_and(isAfterMin)(Bool_and(isBeforeMax)(isNotIj));

            return Bool_ifThenElse(returnCellValue)(xx)(Nat_zero);
        };

        const neighsCountMatrix = Matrix2D_mapij(checkCell)(matrix);
        const flattedCounts = List_flatMap(Any_id)(neighsCountMatrix);
        return List_fold(Nat_zero)(Nat_add)(flattedCounts);
    };

    const ifPopulated = (i) => (j) => {
        const neights = neightborsCount(i)(j);
        const aliveCondition = Bool_and(Nat_isGreaterOrEqual(neights)(Nat_two))(
            Nat_isLessOrEqual(neights)(Nat_three),
        );

        return Bool_ifThenElse(aliveCondition)(Nat_one)(Nat_zero);
    };

    const ifUnpopulated = (i) => (j) => {
        const neights = neightborsCount(i)(j);
        const aliveCondition = Nat_areEqual(neights)(Nat_three);

        return Bool_ifThenElse(aliveCondition)(Nat_one)(Nat_zero);
    };

    const cellNextGeneration = (x) => {
        return Bool_ifThenElse(Nat_isZero(x))(ifUnpopulated)(ifPopulated);
    };

    return Matrix2D_mapij(cellNextGeneration)(matrix);
};
