import { setNextGeneration } from "./nextGeneration";
import type { Matrix } from "./components/GameOfLife";

let isRunning = false;
let matrix: Matrix = Array(32)
  .fill(null)
  .map(() => Array(32).fill(false));
let intervalId: number | null = null;

self.onmessage = (e) => {
  if (e.data.type === "START") {
    isRunning = true;
    intervalId = setInterval(() => {
      if (isRunning) {
        console.log("Worker: Calculating next generation");
        matrix = setNextGeneration(matrix, "torus");
        self.postMessage({
          type: "UPDATE",
          matrix,
        });
      }
    }, 100);
  } else if (e.data.type === "STOP") {
    isRunning = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  } else if (e.data.type === "UPDATE_MATRIX") {
    matrix = e.data.matrix;
  }
};
