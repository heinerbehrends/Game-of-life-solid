import type { Matrix } from "./components/GameOfLife";

type Point = [number, number];

function getNeighbors([x, y]: Point): Point[] {
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
}

function isWithinBounds(matrix: Matrix): (point: Point) => boolean {
  return ([x, y]: Point): boolean =>
    x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
}

function isLiving(matrix: Matrix): (point: Point) => boolean {
  return ([x, y]: Point) => matrix[x][y];
}

function countLivingNeighbors(
  matrix: Matrix,
  point: Point,
  mode: "torus" | "edge" = "edge"
): number {
  if (mode === "torus") {
    return getNeighbors(point).map(foldTorus(matrix)).filter(isLiving(matrix))
      .length;
  }
  return getNeighbors(point)
    .filter(isWithinBounds(matrix))
    .filter(isLiving(matrix)).length;
}

function getNextState(isAlive: boolean, count: number): boolean {
  if (isAlive && (count === 2 || count === 3)) {
    return true;
  }
  if (!isAlive && count === 3) {
    return true;
  }
  return false;
}

function foldTorus(matrix: Matrix): (point: Point) => Point {
  const numberOfCellsInRow: number = matrix[0].length;
  const numberOfRows: number = matrix.length;
  return ([x, y]: Point): Point => {
    if (x === -1) {
      x = numberOfCellsInRow - 1;
    }
    if (x === numberOfCellsInRow) {
      x = 0;
    }
    if (y === -1) {
      y = numberOfRows - 1;
    }
    if (y === numberOfRows) {
      y = 0;
    }
    return [x, y];
  };
}

export function getNextGeneration(
  matrix: Matrix,
  mode: "torus" | "edge" = "edge"
): Matrix {
  return matrix.map((row, y) =>
    row.map((cell, x) => {
      const count = countLivingNeighbors(matrix, [y, x], mode);
      return getNextState(cell, count);
    })
  );
}
