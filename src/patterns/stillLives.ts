import { patternFromString } from "./patternFromString";

// Still Lives
export const block = `OO
OO`;

export const beehive = `.OO.
O..O
.OO.`;

export const tub = `.O.
O.O
.O.`;

export const boat = `OO.
O.O
.O.`;

export const fishhook = `OO..
O...
.OOO
...O`;

export const eater2 = `OO.O...
OO.OOO.
......O
OO.OOO.
.O.O...
.O.O...
..O....`;

export const loaf = `.OO.
O..O
.O.O
..O.`;

export const stillLives = {
  block: { function: patternFromString(block), string: block },
  beehive: { function: patternFromString(beehive), string: beehive },
  tub: { function: patternFromString(tub), string: tub },
  boat: { function: patternFromString(boat), string: boat },
  fishhook: { function: patternFromString(fishhook), string: fishhook },
  eater2: { function: patternFromString(eater2), string: eater2 },
  loaf: { function: patternFromString(loaf), string: loaf },
};
