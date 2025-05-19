import type { Matrix } from "./components/GameOfLife";

type Point = [number, number];

function getNeighbors([y, x]: Point): Point[] {
  return [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ];
}

// function isWithinBounds(matrix: Matrix): (point: Point) => boolean {
//   return function isWithinBounds([y, x]: Point): boolean {
//     return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
//   };
// }

// function isLiving(matrix: Matrix): (point: Point) => boolean {
//   return function isLiving([y, x]: Point): boolean {
//     const [cellState] = matrix[y][x];
//     return cellState();
//   };
// }

function countLivingNeighbors(
  matrix: Matrix,
  point: Point,
  mode: "torus" | "edge" = "edge"
): number {
  let count = 0;
  const neighbors = getNeighbors(point);
  for (let i = 0; i < neighbors.length; i++) {
    let [ny, nx] = neighbors[i];
    if (mode === "torus") {
      ny = (ny + matrix.length) % matrix.length;
      nx = (nx + matrix[0].length) % matrix[0].length;
    }
    if (
      ny >= 0 &&
      ny < matrix.length &&
      nx >= 0 &&
      nx < matrix[0].length &&
      matrix[ny][nx][0]()
    ) {
      count++;
    }
  }
  return count;
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

// function foldTorus(matrix: Matrix): (point: Point) => Point {
//   const numberOfCellsInRow: number = matrix[0].length;
//   const numberOfRows: number = matrix.length;
//   return ([y, x]: Point): Point => {
//     if (x === -1) {
//       x = numberOfCellsInRow - 1;
//     }
//     if (x === numberOfCellsInRow) {
//       x = 0;
//     }
//     if (y === -1) {
//       y = numberOfRows - 1;
//     }
//     if (y === numberOfRows) {
//       y = 0;
//     }
//     return [y, x];
//   };
// }

export function setCellAlive(matrix: Matrix, position: Point) {
  const [y, x] = position;
  const [, setCellState] = matrix[y][x];
  console.log("setCellAlive", position);
  setCellState(true);
}

export function setNextGeneration(
  matrix: Matrix,
  mode: "torus" | "edge" = "edge"
) {
  console.log("setNextGeneration called");
  const nextStates: boolean[][] = [];
  const changedCells: [number, number, boolean][] = [];
  for (let y = 0; y < matrix.length; y++) {
    nextStates[y] = [];
    for (let x = 0; x < matrix[0].length; x++) {
      const [cellState] = matrix[y][x];
      const count = countLivingNeighbors(matrix, [y, x], mode);
      const next = getNextState(cellState(), count);
      nextStates[y][x] = next;
      if (cellState() !== next) {
        changedCells.push([y, x, next]);
      }
    }
  }
  // Only update changed cells
  for (const [y, x, next] of changedCells) {
    const [, setCellState] = matrix[y][x];
    setCellState(next);
  }
}
