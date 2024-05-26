import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ValidationService {

  validate(sudokuData: number[]) {
  
    const invalidCellIndexes = new Set<number>(); // using Set is optimal for speed
    const sudokuGrid: number[][] = [];

    this.createRowGrids(sudokuGrid);
    this.createColGrids(sudokuGrid);
    this.createSubGrids(sudokuGrid);  

    for (const grid of sudokuGrid) {
      this.detectErrors(grid, sudokuData, invalidCellIndexes);
    }
    return [...invalidCellIndexes];
  }

  detectErrors(
    grid: number[],
    sudokuData: (string | number)[],
    invalidCellIndexes: Set<number>
  ) {
    const numbers = [];
    for (const index of grid) {
      const value: number = sudokuData[index] as number;
      if (value > 0) {
        if (numbers.includes(value)) {
          invalidCellIndexes.add(index);
          for (const i of grid) {
            if (sudokuData[i] === value) {
              invalidCellIndexes.add(i);
              break;
            }
          }
        } else {
          numbers.push(value);
        }
      }
    }
  } 

  createColGrids(sudokuGrid: number[][]) {
    for (let j = 0; j < 9; j++) {
      let row: number[] = [];
      for (let i = 0; i < 9; i++) {
        row.push(j + i * 9);
      }
      sudokuGrid.push(row);
    }
  }

  createRowGrids(sudokuGrid: number[][]) {
    let row: number[] = [];
    for (let i = 0; i <= 81; i++) {
      if (i !== 0 && i % 9 === 0) {
        sudokuGrid.push(row);
        row = [];
      }
      if (i === 81) break;
      row.push(i);
    }
  }
  
  createSubGrids(sudokuGrid: number[][]) {
    for (let i = 0; i < 81; i = i + 27) {
      for (let j = i; j < i + 9; j = j + 3) {
        let row: number[] = [];
        for (let k = j; k < j + 3; k++) {
          row.push(k);
          row.push(k + 9);
          row.push(k + 18);
        }
        sudokuGrid.push(row);
      }
    }
  }
}