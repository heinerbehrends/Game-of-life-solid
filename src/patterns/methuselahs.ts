import { patternFromString } from "./patternFromString";

// Methuselahs
const rPentomino = `.OO
OO.
.O.`;

const acorn = `.O.....
...O...
OO..OOO`;

const rabbits = `O...OOO
OOO..O.
.O.....`;

const blom = `O..........O
.OOOO......O
..OO.......O
..........O.
........O.O.`;

const iwona = `..............OOO...
....................
....................
....................
....................
....................
..O.................
...OO...............
...O..............O.
..................O.
..................O.
...................O
..................OO
.......OO...........
........O...........
....................
....................
....................
....................
OO..................
.O..................`;

const justyna = `.................O....
................O..O..
.................OOO..
.................O..O.
......................
OO................O...
.O................O...
..................O...
......................
......................
......................
......................
......................
......................
......................
...................OOO
...........OOO........`;

const lidka = `..........OOO..
..........O....
..........O...O
...........O..O
............OOO
...............
.O.............
O.O............
.O.............`;

const diehard = `......O.
OO......
.OO...OO`;

export const methuselahs = {
  "r-pentomino": {
    string: rPentomino,
    function: patternFromString(rPentomino),
  },
  rabbits: {
    string: rabbits,
    function: patternFromString(rabbits),
  },
  acorn: {
    string: acorn,
    function: patternFromString(acorn),
  },
  blom: {
    string: blom,
    function: patternFromString(blom),
  },
  justyna: {
    string: justyna,
    function: patternFromString(justyna),
  },
  iwona: {
    string: iwona,
    function: patternFromString(iwona),
  },
  lidka: {
    string: lidka,
    function: patternFromString(lidka),
  },
  diehard: {
    string: diehard,
    function: patternFromString(diehard),
  },
};
