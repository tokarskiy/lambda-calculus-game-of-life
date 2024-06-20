import { GameOfLife_nextGeneration } from "../backend/lambda-calculus.js";
import {
    matrixFromNumber2DArray,
    toNumberArray2D,
} from "./lambda-calculus.frontend.ts";

const boardToString = (board: unknown) => {
    const arr2d = toNumberArray2D(board);
    const chars: string[] = [];

    for (const arr of arr2d) {
        for (const num of arr) {
            chars.push(num === 1 ? "■" : "□");
            chars.push(" ");
        }

        chars.push("\n");
    }

    return chars.join("");
};

const boardFromString = (boardText: string) => {
    const charMatr = boardText
        .split("\n")
        .map((line) =>
            line
                .trim()
                .split("")
                .filter((x) => x !== " ")
        );

    let max: number = 0;
    for (const line of charMatr) {
        max = Math.max(max, line.length);
    }

    const arr2d: number[][] = [];
    for (const line of charMatr) {
        const arr: number[] = [];
        for (const elem of line) {
            if (elem === "*") {
                arr.push(1);
            } else if (elem === ".") {
                arr.push(0);
            } else {
                throw new Error(`Forbidden char in input file: '${elem}'`);
            }
        }

        for (let i = line.length; i < max; i++) {
            arr.push(0);
        }

        arr2d.push(arr);
    }

    return matrixFromNumber2DArray(arr2d);
};

const syncWait = (ms: number) => {
    const end = Date.now() + ms;
    while (Date.now() < end) continue;
};

if (import.meta.main) {
    const boardCode = `
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . * . . . .
        . . . . . . . . . . * . . . . .
        . . . . . . . . . . * * * . . .
        . . . . * * . . . . . . . . . .
        . . . . * * . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;

    let i = 0;
    let gen = boardFromString(boardCode);
    while (true) {
        i++;
        console.log(`Generation #${i}`);
        console.log(boardToString(gen));
        syncWait(1000);

        gen = GameOfLife_nextGeneration(gen);
        console.clear();
    }
}
