import { bfs } from './algorithms/bfs.js';
import { dfs } from './algorithms/dfs.js';
import { dijkstra } from './algorithms/dijkstra.js';
import { aStar } from './algorithms/astar.js';
import { animateSearch, animatePath, resetGrid } from './visualizers/grid-visualizer.js';

// Configuration
const GRID_SIZE = 20;
let grid = [];
let startCell = null;
let endCell = null;
let isSettingStart = false;
let isSettingEnd = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createGrid();
  setupEventListeners();
});

function createGrid() {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  
  grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      gridContainer.appendChild(cell);

      cell.addEventListener('click', () => handleCellClick(cell, row, col));
    }
  }

  // Set default start and end
  startCell = document.querySelector('[data-row="0"][data-col="0"]');
  endCell = document.querySelector(`[data-row="${GRID_SIZE-1}"][data-col="${GRID_SIZE-1}"]`);
  startCell.classList.add('start');
  endCell.classList.add('end');
  grid[0][0] = 'start';
  grid[GRID_SIZE-1][GRID_SIZE-1] = 'end';
}

function setupEventListeners() {
  document.getElementById('visualize-btn').addEventListener('click', visualizeAlgorithm);
  document.getElementById('clear-btn').addEventListener('click', clearBoard);
  
  // Algorithm selection
  document.getElementById('algorithm-select').addEventListener('change', (e) => {
    updateStatus(`Algorithm set to: ${e.target.options[e.target.selectedIndex].text}`);
  });
}

function visualizeAlgorithm() {
  const algorithm = document.getElementById('algorithm-select').value;
  resetGrid();

  const start = { row: parseInt(startCell.dataset.row), col: parseInt(startCell.dataset.col) };
  const end = { row: parseInt(endCell.dataset.row), col: parseInt(endCell.dataset.col) };

  let result;
  switch(algorithm) {
    case 'bfs':
      result = bfs(grid, start, end);
      break;
    case 'dfs':
      result = dfs(grid, start, end);
      break;
    case 'dijkstra':
      result = dijkstra(grid, start, end);
      break;
    case 'astar':
      result = aStar(grid, start, end);
      break;
    default:
      result = bfs(grid, start, end);
  }

  animateSearch(result.visitedNodes, () => {
    animatePath(result.path);
  });
}

// ... (other helper functions)