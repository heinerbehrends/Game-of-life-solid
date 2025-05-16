import { methuselahs } from "./methuselahs";
import { oscillators } from "./oscillators";
import { spaceships } from "./spaceships";
import { stillLives } from "./stillLives";

const { rPentomino, rabbits, acorn, blom, iwona, lidka } = methuselahs;
const { blinker, star, octagon, koksGalaxy, pentadecathlon, figure8 } =
  oscillators;
const { HWSS, LWSS, MWSS, coeShip, copperhead, glider } = spaceships;
const { block, beehive, tub, boat, fishhook, eater2 } = stillLives;

export const patternSwitch = {
  "r-pentomino": rPentomino,
  rabbits,
  acorn,
  blom,
  iwona,
  lidka,
  block,
  beehive,
  tub,
  boat,
  fishhook,
  eater2,
  blinker,
  star,
  octagon,
  koksGalaxy,
  pentadecathlon,
  figure8,
  glider,
  LWSS,
  MWSS,
  HWSS,
  coeShip,
  copperhead,
};
