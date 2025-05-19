import { patternFromString } from "./patternFromString";

export const blinker = `OOO`;

export const star = `.....O.....
....OOO....
..OOO.OOO..
..O.....O..
.OO.....OO.
OO.......OO
.OO.....OO.
..O.....O..
..OOO.OOO..
....OOO....
.....O.....`;

export const octagon = `...OO...
..O..O..
.O....O.
O......O
O......O
.O....O.
..O..O..
...OO...`;

export const koksGalaxy = `OOOOOO.OO
OOOOOO.OO
.......OO
OO.....OO
OO.....OO
OO.....OO
OO.......
OO.OOOOOO
OO.OOOOOO`;

export const pentadecathlon = `..O....O..
OO.OOOO.OO
..O....O..`;

export const figure8 = `OOO...
OOO...
OOO...
...OOO
...OOO
...OOO`;

export const toad = `..O.
O.O.
O..`;
export const beacon = `OO..
OO..
..OO
..OO`;
export const pulsar = `..OOO...OOO..
.............
O....O.O....O
O....O.O....O
O....O.O....O
..OOO...OOO..
.............
..OOO...OOO..
O....O.O....O
O....O.O....O
O....O.O....O
.............
..OOO...OOO..`;

export const oscillators = {
  blinker: {
    string: blinker,
    function: patternFromString(blinker),
  },
  star: {
    string: star,
    function: patternFromString(star),
  },
  octagon: {
    string: octagon,
    function: patternFromString(octagon),
  },
  koksGalaxy: {
    string: koksGalaxy,
    function: patternFromString(koksGalaxy),
  },
  pentadecathlon: {
    string: pentadecathlon,
    function: patternFromString(pentadecathlon),
  },
  figure8: {
    string: figure8,
    function: patternFromString(figure8),
  },
  toad: { string: toad, function: patternFromString(toad) },
  beacon: { string: beacon, function: patternFromString(beacon) },
  pulsar: { string: pulsar, function: patternFromString(pulsar) },
};
