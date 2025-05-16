import { patternFromString } from "./patternFromString";

export const glider = `OOO
O..
.O.`;

export const LWSS = `.O..O
O....
O...O
OOOO.`;

export const MWSS = `...O..
.O...O
O.....
O....O
OOOOO.`;

export const HWSS = `...OO..
.O....O
O......
O.....O
OOOOOO.`;

export const coeShip = `....OOOOOO
..OO.....O
OO.O.....O
....O...O.
......O...
......OO..
.....OOOO.
.....OO.OO
.......OO.`;

export const copperhead = `.OOOO.
......
.O..O.
O.OO.O
O....O
......
O....O
OO..OO
OOOOOO
.O..O.
..OO..
..OO..`;

export const spaceships = {
  glider: {
    string: glider,
    function: patternFromString(glider),
  },
  LWSS: {
    string: LWSS,
    function: patternFromString(LWSS),
  },
  MWSS: {
    string: MWSS,
    function: patternFromString(MWSS),
  },
  HWSS: {
    string: HWSS,
    function: patternFromString(HWSS),
  },
  coeShip: {
    string: coeShip,
    function: patternFromString(coeShip),
  },
  copperhead: {
    string: copperhead,
    function: patternFromString(copperhead),
  },
};
