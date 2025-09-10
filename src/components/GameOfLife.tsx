import {
  createSignal,
  createMemo,
  batch,
  createEffect,
  onCleanup,
  type JSX,
  type Setter,
  type Accessor,
  type Signal,
} from "solid-js";
import { methuselahs } from "../patterns/methuselahs";
import { oscillators } from "../patterns/oscillators";
import { spaceships } from "../patterns/spaceships";
import { stillLives } from "../patterns/stillLives";
import { For } from "solid-js/web";
import { setNextGeneration, setCellAlive } from "../nextGeneration";

const patternSwitch = {
  ...methuselahs,
  ...oscillators,
  ...spaceships,
  ...stillLives,
};

export type Matrix = Signal<boolean>[][];

export type Point = [number, number];

type PatternName = keyof typeof patternSwitch;

type CellSignalTuple = [Signal<boolean>, Signal<boolean>];

const matrix: CellSignalTuple[][] = Array(128)
  .fill(null)
  .map(() =>
    Array(192)
      .fill(null)
      .map(() => [createSignal<boolean>(false), createSignal<boolean>(false)])
  );

const initialPattern = "r-pentomino";

export function GameOfLife() {
  const [isRunning, setIsRunning] = createSignal(false);
  const [pattern, setPattern] = createSignal<PatternName>(initialPattern);

  const applyPattern = createMemo(() => {
    return (x: number, y: number) => {
      const patternFn = patternSwitch[pattern()].function;
      const patternPoints = patternFn([y, x]);
      const aliveMatrix = matrix.map((row) => row.map((cell) => cell[0]));
      batch(() => {
        patternPoints.forEach((point) => {
          setCellAlive(aliveMatrix, point);
        });
      });
    };
  });

  const memoizedApplyPattern = applyPattern();

  let lastPreviewed: [number, number][] = [];

  const handleHover = (x: number, y: number) => {
    // Clear only the last previewed cells
    for (let [py, px] of lastPreviewed) {
      if (matrix[py] && matrix[py][px]) {
        const [_, [getPreview, setPreview]] = matrix[py][px];
        if (getPreview()) setPreview(false);
      }
    }
    lastPreviewed = [];
    if (x === -1) return; // No preview if not hovering

    const patternFn = patternSwitch[pattern()].function;
    const points = patternFn([y, x]);
    for (let [py, px] of points) {
      if (matrix[py] && matrix[py][px]) {
        const [_, [getPreview, setPreview]] = matrix[py][px];
        if (!getPreview()) setPreview(true);
        lastPreviewed.push([py, px]);
      }
    }
  };

  let frameId: number | null = null;

  createEffect(() => {
    if (!isRunning()) {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      return;
    }

    let lastTime = performance.now();
    const frameInterval = 1000 / 25; // 10 FPS
    const aliveMatrix = matrix.map((row) => row.map((cell) => cell[0]));

    function gameLoop(currentTime: number) {
      if (!isRunning()) return;
      const deltaTime = currentTime - lastTime;
      if (deltaTime >= frameInterval) {
        batch(() => {
          setNextGeneration(aliveMatrix, "torus");
        });
        lastTime = currentTime;
      }
      frameId = requestAnimationFrame(gameLoop);
    }

    frameId = requestAnimationFrame(gameLoop);

    onCleanup(() => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    });
  });

  return (
    <main class="flex gap-4">
      <aside class="flex flex-col gap-4 items-center overflow-y-auto h-[640px] no-scrollbar">
        <h2 class="text-xl font-bold">Patterns</h2>
        <PatternButtonGroup
          patternObjects={methuselahs}
          groupName="Methuselahs"
          setPattern={setPattern}
          pattern={pattern}
        />
        <PatternButtonGroup
          patternObjects={oscillators}
          groupName="Oscillators"
          setPattern={setPattern}
          pattern={pattern}
        />
        <PatternButtonGroup
          patternObjects={spaceships}
          groupName="Spaceships"
          pattern={pattern}
          setPattern={setPattern}
        />
        <PatternButtonGroup
          patternObjects={stillLives}
          groupName="Still Lives"
          pattern={pattern}
          setPattern={setPattern}
        />
      </aside>
      <div>
        <For each={matrix}>
          {(row, y) => (
            <div class="flex">
              <For each={row}>
                {(cell, x) => (
                  <Cell
                    aliveSignal={cell[0]}
                    previewSignal={cell[1]}
                    x={x()}
                    y={y()}
                    onCellChange={memoizedApplyPattern}
                    onHover={handleHover}
                  />
                )}
              </For>
            </div>
          )}
        </For>
        <button onClick={() => setIsRunning(!isRunning())}>
          {isRunning() ? "Stop" : "Start"}
        </button>
      </div>
    </main>
  );
}

type CellProps = {
  aliveSignal: Signal<boolean>;
  previewSignal: Signal<boolean>;
  x: number;
  y: number;
  onCellChange: (x: number, y: number) => void;
  onHover: (x: number, y: number) => void;
};

function Cell({
  aliveSignal,
  previewSignal,
  x,
  y,
  onCellChange,
  onHover,
}: CellProps) {
  const [isAlive] = aliveSignal;
  const [isPreview] = previewSignal;
  const state = createMemo(() => {
    if (isPreview()) return "preview";
    return isAlive() ? "alive" : "dead";
  });

  const buttonStyle = createMemo(() => ({
    "background-color":
      state() === "preview"
        ? "lightblue"
        : state() === "alive"
        ? "black"
        : "white",
  }));

  const handleMouseEnter = () => {
    onHover(x, y);
  };
  const handleMouseLeave = () => {
    onHover(-1, -1);
  };
  const handleMouseDown = () => onCellChange(x, y);

  return (
    <button
      style={buttonStyle()}
      class="w-2 h-2 p-0 m-0"
      aria-label={`Click to toggle`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    />
  );
}

type PatternButtonProps = {
  pattern: PatternName;
  isActive: Accessor<boolean>;
  setPattern: Setter<PatternName>;
  children: JSX.Element;
};

function PatternButton({
  pattern,
  setPattern,
  children,
  isActive,
}: PatternButtonProps) {
  return createMemo(() => (
    <button
      class={`font-mono leading-none p-4 border rounded-md w-fit ${
        isActive() ? "border-gray-300" : "border-gray-600 hover:border-gray-400"
      }`}
      onClick={() => {
        setPattern(pattern);
      }}
    >
      {children}
    </button>
  ))();
}

type Pattern = {
  [key: string]: {
    string: string;
    function: (position: Point) => Point[];
  };
};

type PatternButtonGroupProps = {
  patternObjects: Pattern;
  groupName: "Methuselahs" | "Oscillators" | "Spaceships" | "Still Lives";
  setPattern: Setter<PatternName>;
  pattern: Accessor<PatternName>;
};

function PatternButtonGroup({
  patternObjects,
  groupName,
  setPattern,
  pattern,
}: PatternButtonGroupProps) {
  return (
    <>
      <h3 class="text-md font-bold">{groupName}</h3>
      <ul class="flex flex-col gap-2">
        <For each={Object.keys(patternObjects)}>
          {(patternName) => (
            <li class="flex flex-col gap-2 text-center items-center">
              <h4 class="text-md">{patternName}</h4>
              <PatternButton
                pattern={patternName as PatternName}
                setPattern={setPattern}
                isActive={createMemo(() => patternName === pattern())}
              >
                {patternObjects[patternName as keyof Pattern].string
                  .split("\n")
                  .map((line) => (
                    <div>{line}</div>
                  ))}
              </PatternButton>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
