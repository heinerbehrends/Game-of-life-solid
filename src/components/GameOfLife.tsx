import {
  children,
  createSignal,
  type Accessor,
  type JSX,
  type Setter,
} from "solid-js";
import { getNextGeneration } from "../nextGeneration";
import { patternSwitch } from "../patterns/patterns";
import { For } from "solid-js/web";

export type Matrix = boolean[][];

export type Point = [number, number];

type PatternName = keyof typeof patternSwitch;

export const initialMatrix: Matrix = Array(32)
  .fill(null)
  .map(() => Array(32).fill(false));

const initialPattern = "r-pentomino";

export function GameOfLife() {
  const [isRunning, setIsRunning] = createSignal(false);
  const [matrix, setMatrix] = createSignal<Matrix>(initialMatrix);
  const [pattern, setPattern] = createSignal<PatternName>(initialPattern);

  setInterval(() => {
    if (isRunning()) {
      setMatrix(getNextGeneration(matrix(), "torus"));
    }
  }, 5);
  return (
    <main class="flex">
      <aside>
        <For each={Object.keys(patternSwitch)}>
          {(pattern) => (
            <PatternButton
              pattern={pattern as PatternName}
              setPattern={setPattern}
            >
              {patternSwitch[pattern as PatternName].string
                .split("\n")
                .map((line) => (
                  <div>{line}</div>
                ))}
            </PatternButton>
          )}
        </For>
      </aside>
      <div>
        <For each={matrix()}>
          {(row, y) => (
            <Row
              matrix={matrix()}
              row={row}
              y={y()}
              setMatrix={setMatrix}
              pattern={pattern}
              setPattern={setPattern}
            />
          )}
        </For>
        <button onClick={() => setIsRunning(!isRunning())}>
          {isRunning() ? "Stop" : "Start"}
        </button>
      </div>
    </main>
  );
}

function toggleCell(matrix: Matrix, position: Point): Matrix {
  const [x, y] = position;
  return matrix.map((row, iy) =>
    row.map((cell, ix) => (ix === x && iy === y ? !cell : cell))
  );
}

type CellProps = {
  isAlive: boolean;
  position: Point;
  matrix: Matrix;
  setMatrix: Setter<Matrix>;
  pattern: Accessor<PatternName>;
  setPattern: Setter<PatternName>;
};

function Cell({ isAlive, position, matrix, setMatrix, pattern }: CellProps) {
  return (
    <button
      style={{ "background-color": isAlive ? "black" : "white" }}
      class="w-5 h-5 p-0 m-0"
      aria-label={`Cell at ${position[0]},${position[1]} Click to toggle`}
      onClick={() => {
        console.log("pattern", pattern());
        const patternFn = patternSwitch[pattern()].function;
        const patternPoints = patternFn(position);
        console.log("patternPoints", patternPoints);
        const newMatrix = patternPoints.reduce((acc, point) => {
          return toggleCell(acc, point);
        }, matrix);
        setMatrix(newMatrix);
      }}
    />
  );
}

type RowProps = {
  matrix: Matrix;
  row: boolean[];
  y: number;
  setMatrix: Setter<Matrix>;
  pattern: Accessor<PatternName>;
  setPattern: Setter<PatternName>;
};

function Row({ matrix, row, y, setMatrix, pattern, setPattern }: RowProps) {
  return (
    <div class="flex">
      {row.map((isAlive, ix) => (
        <Cell
          isAlive={isAlive}
          position={[ix, y]}
          matrix={matrix}
          setMatrix={setMatrix}
          pattern={pattern}
          setPattern={setPattern}
        />
      ))}
    </div>
  );
}
type PatternButtonProps = {
  pattern: PatternName;
  setPattern: Setter<PatternName>;
  children: JSX.Element;
};

function PatternButton({ pattern, setPattern, children }: PatternButtonProps) {
  return (
    <button
      class="font-mono leading-none p-4"
      onClick={() => {
        setPattern(pattern);
      }}
    >
      {children}
    </button>
  );
}
