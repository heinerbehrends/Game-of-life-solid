import type { Point } from "../components/GameOfLife";

export type Pattern = Point[];

export function patternFromString(
  patternString: string
): (point: Point) => Pattern {
  return (point: Point) => {
    const pattern: Pattern = patternString
      .split(/\n/)
      .map(getXValues)
      .map(getYValues)
      .flat();
    return addXY(point, pattern);
  };
}

function getXValues(row: string): number[] {
  return Array.from(row).reduce(
    (acc: number[], letter: string, idx: number) => {
      if (letter === "O") {
        acc.push(idx);
      }
      return acc;
    },
    []
  );
}

function getYValues(row: number[], yValue: number): Pattern {
  return row.map((xValue) => [yValue, xValue]);
}

function addXY([y, x]: number[], arrayOfXYs: Pattern): Pattern {
  return arrayOfXYs.map(([y2, x2]) => [y + y2, x + x2]);
}
